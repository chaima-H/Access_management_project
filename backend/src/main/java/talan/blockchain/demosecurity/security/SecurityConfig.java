package talan.blockchain.demosecurity.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

    public AuthenticationManagerBuilder authenticationManagerBuilder;

    SecurityConfig(AuthenticationManagerBuilder authenticationManagerBuilder){
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }
    //http configure security

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {

        http.csrf().disable()
                //http.formLogin();
                //definir son propre formulaire d'authentification
                //http.formLogin().loginPage("/myLoginForm.html");
                .authorizeHttpRequests()
                .requestMatchers("/login/**","/employee/save","/employee/employees","/role/roles","/authority/authorities","/employee/getEmployee/**").permitAll()
                .requestMatchers(HttpMethod.DELETE,"/employee/deletemployee/**","/authority/delete","/role/deleteRole").hasAuthority("delete")
                .requestMatchers(HttpMethod.POST,"/employee/updatePassword/**","/authority/updateAuthority/**","/role/updateRole/**","/role/rejectAuthority/**").hasAuthority("update")
                .requestMatchers(HttpMethod.POST,"/authority/save","/role/save").hasAuthority("Create")
                .requestMatchers(HttpMethod.POST,"/employee/assignrole","/role/assignauthority").hasAuthority("Create")
                .anyRequest().authenticated()
                .and()
                //Desactivation de la session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new AuthenticationFilter(authenticationManagerBuilder))
                .addFilterBefore(new AuthorizationFilter(),UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public BCryptPasswordEncoder getBCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
