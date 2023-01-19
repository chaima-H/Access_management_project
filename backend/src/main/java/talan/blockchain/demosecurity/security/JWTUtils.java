package talan.blockchain.demosecurity.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Map;

public class JWTUtils {

    public static String generateJWT(User springUser){
        System.out.println("springUser "+ springUser);
        return Jwts.builder()
                .setSubject(springUser.getUsername())
                .setExpiration(new Date(System.currentTimeMillis()+SecurityConstante.EXPIRATION_TIME))
                .claim("authorities", springUser.getAuthorities())
                .signWith(SignatureAlgorithm.HS256, SecurityConstante.SECRET)
                .compact();
    }

    public static  String extractJWT(HttpServletRequest httpServletRequest){
        String jwtToken = httpServletRequest.getHeader(SecurityConstante.HEADER_STRING);
        if(jwtToken == null || !jwtToken.startsWith(SecurityConstante.TOKEN_PREFIX)){
            return  null ;
        }
        return  jwtToken;
    }

    public static Claims parseJWT(String jwtToken){

        return  Jwts.parser()
                .setSigningKey(SecurityConstante.SECRET)
                .parseClaimsJws(jwtToken.replace(SecurityConstante.TOKEN_PREFIX,""))
                .getBody();
    }

    public  static Collection<GrantedAuthority> extractGrantedAuthorities(Claims claims){
        if(claims != null){
            ArrayList<Map<String,String>> authoritiesFromClaims = (ArrayList<Map<String, String>>) claims.get("authorities");
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            authoritiesFromClaims.forEach(r -> {
                authorities.add(new SimpleGrantedAuthority(r.get("authority")));
            });
            return  authorities;
        }
        return  null;
    }

    public static String extractUsernameFromClaims(Claims claims){
        if(claims != null){
            return  claims.getSubject();
        }
        return  null;
    }
}
