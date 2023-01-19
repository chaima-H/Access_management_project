package talan.blockchain.demosecurity.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    EmployeeLogin employeeLogin = null;
    private AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthenticationFilter(AuthenticationManagerBuilder authenticationManagerBuilder) {
        super();
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
        throws AuthenticationException{
        try{
            employeeLogin = new ObjectMapper().readValue(request.getInputStream(),EmployeeLogin.class);
            return authenticationManagerBuilder.getObject().authenticate(new UsernamePasswordAuthenticationToken(employeeLogin.getUsername(),employeeLogin.getPassword()));
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult)
        throws IOException, ServletException {
        response.addHeader(SecurityConstante.HEADER_STRING, SecurityConstante.TOKEN_PREFIX+JWTUtils.generateJWT((User) authResult.getPrincipal()));
    }

}
