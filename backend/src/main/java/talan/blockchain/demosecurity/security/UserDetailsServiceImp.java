package talan.blockchain.demosecurity.security;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import talan.blockchain.demosecurity.DAO.EmployeeRepository;
import talan.blockchain.demosecurity.entities.Employee;

import java.util.ArrayList;
import java.util.Collection;

@Service
@Transactional
public class UserDetailsServiceImp implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByUsername(username);
        System.out.println("employee "+ employee);
        if(employee == null) throw new UsernameNotFoundException("employee does not exist");
        Collection<GrantedAuthority> authorisations = new ArrayList<>();
        if(employee.getRoles() != null){
            employee.getRoles().forEach(role -> {
            if (role.getAuthorities() != null){
                role.getAuthorities().forEach(authority ->
                      authorisations.add(new SimpleGrantedAuthority(authority.getAuthorityname()))  );
            }
        });
    }
        System.out.println(employee.getUsername()+"and" +employee.getPassword()+"and "+authorisations);
   return  new User(employee.getUsername(),employee.getPassword(),authorisations);
    }
}
