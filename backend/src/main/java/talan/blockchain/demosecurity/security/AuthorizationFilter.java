package talan.blockchain.demosecurity.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

public class AuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException{

        response.addHeader("Access-Control-Allow-Origin","*");
        response.addHeader("Access-Control-Allow-Headers",
                "Origin, Accept, X-Requested-With, Content-Type, "
                        + "Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
        response.addHeader("Access-Control-Allow-Methods","*");
        response.addHeader("Access-Control-Expose-Headers",
                "Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Authorization");
        //si la méthode Http est options rien à faire voir avec Angular
        if(request.getMethod().equals("OPTIONS")){
            response.setStatus(HttpServletResponse.SC_OK);
        }
        else{
          String jwt = JWTUtils.extractJWT(request);
          if(jwt == null){
              filterChain.doFilter(request,response);
              return;
          }
          try{
              Claims claims = JWTUtils.parseJWT(jwt);
              Collection<GrantedAuthority> authorities = JWTUtils.extractGrantedAuthorities(claims);
              String username = JWTUtils.extractUsernameFromClaims(claims);
              UsernamePasswordAuthenticationToken authenticatedUser = new UsernamePasswordAuthenticationToken(username,null,authorities);
              SecurityContextHolder.getContext().setAuthentication(authenticatedUser);
              filterChain.doFilter(request,response);

          }
          catch(Exception e){
              filterChain.doFilter(request,response);
            }
        }

    }
}
