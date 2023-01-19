package talan.blockchain.demosecurity.service.interfaces;

import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;

import java.util.List;

public interface EmployeeService {
    Employee saveEmployee(Employee employee);
    List<Employee> getEmploies();
    Employee updateEmployeeByUsername(String oldUsername, Employee newEmployee);
    int deleteEmployeeByUsername(String username);

    Employee assignRole(String username,String rolename);

    Employee getEmployeeByUsername(String username);


}
