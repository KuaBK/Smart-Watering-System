package com.example.smart_watering.service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;


import com.example.smart_watering.dto.request.authentication.*;
import com.example.smart_watering.dto.response.authentication.AuthenticationResponse;
import com.example.smart_watering.dto.response.authentication.IntrospectResponse;
import com.example.smart_watering.entity.InvalidatedToken;
import com.example.smart_watering.entity.account.Account;
import com.example.smart_watering.entity.account.Role;
import com.example.smart_watering.exception.AppException;
import com.example.smart_watering.exception.ErrorCode;
import com.example.smart_watering.repository.AccountRepository;
import com.example.smart_watering.repository.InvalidatedTokenRepository;
import com.example.smart_watering.repository.OutboundIdentityClient;
import com.example.smart_watering.repository.OutboundAccountClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    AccountRepository accountRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;
    OutboundIdentityClient outboundClient;
    OutboundAccountClient outboundClientUser;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String signerKey;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long validDuration;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long refreshableDuration;

    @NonFinal
    @Value("${outbound.clientId}")
    protected String clientId;

    @NonFinal
    @Value("${outbound.clientSecret}")
    protected String clientSecret;

    @NonFinal
    @Value("${outbound.redirectURI}")
    protected String redirectURI;

    @NonFinal
    protected final String GRANT_TYPE = "authorization_code";

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();

        boolean isValid = true;
        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }

        return IntrospectResponse.builder().valid(isValid).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        var user = accountRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .userId(user.getId())
                .token(token.token)
                .expiryTime(token.expiryDate)
                .authenticated(true)
                .build();
    }

    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
        var signJWT = verifyToken(request.getToken(), true);
        var jit = signJWT.getJWTClaimsSet().getJWTID();
        var expirationTime = signJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken =
                InvalidatedToken.builder().id(jit).expiryTime(expirationTime).build();

        invalidatedTokenRepository.save(invalidatedToken);

        var username = signJWT.getJWTClaimsSet().getSubject();
        var user = accountRepository
                .findByEmail(username)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token.token)
                .expiryTime(expirationTime)
                .authenticated(true)
                .build();
    }

    private TokenInfo generateToken(Account account) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        Date issueTime = new Date();
        Date expiryTime = new Date(
                Instant.now().plus(validDuration, ChronoUnit.SECONDS).toEpochMilli());

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(account.getEmail())
                .issuer("Phong.com")
                .issueTime(issueTime)
                .expirationTime(expiryTime)
                .jwtID(UUID.randomUUID().toString())
                .claim("accountId", account.getId())
                .claim("scope", buildScope(account))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(signerKey.getBytes()));
            return new TokenInfo(jwsObject.serialize(), expiryTime);
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new IllegalArgumentException(e);
        }
    }

    public void logOut(LogOutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken(), true);
            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expirationTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jit)
                    .expiryTime(expirationTime)
                    .build();

            invalidatedTokenRepository.save(invalidatedToken);

        } catch (AppException e) {
            log.info("Token already expired");
        }
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws ParseException, JOSEException {
        JWSVerifier verifier = new MACVerifier(signerKey.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT
                        .getJWTClaimsSet()
                        .getIssueTime()
                        .toInstant()
                        .plus(refreshableDuration, ChronoUnit.SECONDS)
                        .toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date()))) throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        return signedJWT;
    }

    private String buildScope(Account account) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (account.getRole() != null) {
            stringJoiner.add("ROLE_" + account.getRole().name());
        }
        return stringJoiner.toString();
    }

    private record TokenInfo(String token, Date expiryDate) {}

    public AuthenticationResponse outbound(String code){
        var response = outboundClient.exchangeToken(ExchangeTokenRequest.builder()
                        .code(code)
                        .clientId(clientId)
                        .clientSecret(clientSecret)
                        .redirectUri(redirectURI)
                        .grantType(GRANT_TYPE)
                .build());

        var userInfo = outboundClientUser.getUserInfo("json", response.getAccessToken());

        accountRepository.findByEmail(userInfo.getEmail()).orElseGet(
                () -> accountRepository.save(Account.builder()
                        .email(userInfo.getEmail())
                        .firstName(userInfo.getGivenName())
                        .lastName(userInfo.getFamilyName())
                        .picture(userInfo.getPicture())
                        .role(Role.FARMER)
                        .password("12345678")
                        .build()));

        log.info("User Info {}", userInfo);


        return  AuthenticationResponse.builder()
                .token(response.getAccessToken())
                .build();
    }
}
