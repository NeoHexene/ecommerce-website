package com.website.ecommerce.util;

import com.website.ecommerce.configuration.EcommercePropertyConfiguration;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Autowired
    private EcommercePropertyConfiguration ecommercePropertyConfiguration;

    public String getUserNameFromToken (String token) {
        return getClaimFromToken(token, Claims::getSubject); // getSubject as it stores username
    }

    // since java provides functional programming, we are using higher order function here.
    // higher order functions in java means the function that is either taking or giving out function.
    private <T> T getClaimFromToken (String token, Function<Claims,T> claimResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken (String token) {
        return Jwts.parser().setSigningKey(ecommercePropertyConfiguration.getJwtSecret())
                .parseClaimsJws(token).getBody();
    }

    public boolean validateToken (String token, UserDetails userDetails) {
        String username = getUserNameFromToken(token);
        return (userDetails.getUsername().equals(username) && !isTokenExpired(token));
    }

    private boolean isTokenExpired (String token) {
        final Date expiryDate = getExpiryDateFromToken(token);
        return expiryDate.before(new Date());
    }

    private Date getExpiryDateFromToken (String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String generateJwtToken (UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        String jwtSecret = ecommercePropertyConfiguration.getJwtSecret();
        long jwtExpirationLongParse = Long.parseLong(ecommercePropertyConfiguration.getJwtExpiration());
        return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationLongParse * 1000))
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()),SignatureAlgorithm.HS256).compact();
    }
}
