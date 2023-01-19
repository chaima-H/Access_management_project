package talan.blockchain.demosecurity.service.implementations;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import talan.blockchain.demosecurity.DAO.EmployeeRepository;
import talan.blockchain.demosecurity.DAO.RoleRepository;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.service.interfaces.EmployeeService;

import java.util.List;
@Service
@Transactional

public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private BCryptPasswordEncoder encoder;

    private EmployeeRepository employeeRepository;
    private RoleRepository roleRepository;



    public EmployeeServiceImpl(EmployeeRepository employeeRepository, RoleRepository roleRepository) {
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
    }


    @Override
    public Employee saveEmployee(Employee employee) {
        Employee employee1;
        if((employee1 = employeeRepository.findByUsername(employee.getUsername()))==null){
            employee.setId(null);
            employee.setPassword(encoder.encode(employee.getPassword()));
            employee1 = employeeRepository.save(employee);
        };
        return employee1;
    }

    @Override
    public List<Employee> getEmploies() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployeeByUsername(String oldUsername, Employee newEmployee) {
        Employee employee = employeeRepository.findByUsername(oldUsername);
        if(employee != null){
                employee.setPassword(newEmployee.getPassword());
                employee.setUsername(newEmployee.getUsername());
                employee.setFirstname(newEmployee.getFirstname());
                employee.setLastname(newEmployee.getLastname());
                return employeeRepository.save(employee);

        }
        return null;
    }

    @Override
    public int deleteEmployeeByUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        if(employee != null){
            if(!employee.getRoles().isEmpty()){
                employee.getRoles().clear();
            }

        }
        return employeeRepository.deleteByUsername(username);
    }

    @Override
    public Employee assignRole(String username, String rolename) {
        Role role1 = roleRepository.findRoleByRolename(rolename);
        Employee employee1 = employeeRepository.findByUsername(username);
        System.out.println(role1);
        System.out.println(employee1);
        if((role1!=null  && employee1.getUsername() != null)){
           employee1.getRoles().add(role1);
          return employeeRepository.save(employee1);

        }
        return null;
    }

    @Override
    public Employee getEmployeeByUsername(String username) {
        return employeeRepository.findByUsername(username);
    }



}
