package talan.blockchain.demosecurity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.ApplicationContext;
import talan.blockchain.demosecurity.service.interfaces.AuthorityService;
import talan.blockchain.demosecurity.service.interfaces.EmployeeService;
import talan.blockchain.demosecurity.service.interfaces.RoleService;

@SpringBootApplication
public class DemoSecurityApplication {

    public static void main(String[] args) {

        ApplicationContext context = SpringApplication.run(DemoSecurityApplication.class, args);
        AuthorityService authorityService = context.getBean(AuthorityService.class);
        RoleService roleService = context.getBean(RoleService.class);
        EmployeeService employeeService = context.getBean(EmployeeService.class);

    }

}
