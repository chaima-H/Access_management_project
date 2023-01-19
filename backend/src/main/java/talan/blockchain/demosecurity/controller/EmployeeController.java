package talan.blockchain.demosecurity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import talan.blockchain.demosecurity.DTO.AssignDTO;
import talan.blockchain.demosecurity.DTO.EmployeeDTO;
import talan.blockchain.demosecurity.DTO.EntityDTO;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.service.interfaces.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/employee")
@CrossOrigin("*")
public class EmployeeController {


    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/save")
    Employee saveEmployee(@RequestBody Employee employee){return employeeService.saveEmployee(employee);}
    @PutMapping("/updateEmployee")
    Employee updateEmployee(@RequestBody EntityDTO<Employee> entityDTO){
        return  employeeService.updateEmployeeByUsername(entityDTO.getEntityName(),entityDTO.getNewEntity());
    }
    /*@DeleteMapping("/deleteEmployee")
    int deleteEmployee(@RequestBody String username){return employeeService.deleteEmployeeByUsername(username);}*/
    @DeleteMapping("/deletemployee")
    int deleteEmployee(@RequestBody EmployeeDTO employeeDTO){return employeeService.deleteEmployeeByUsername(employeeDTO.getUserName());}
    @GetMapping("/employees")
    List<Employee> getEmployees(){return employeeService.getEmploies();}
    @PostMapping("/assignrole")
    Employee assignRole(@RequestBody AssignDTO assignDTO){
        return employeeService.assignRole(assignDTO.getUserName(),assignDTO.getRoleName());
    }
   @GetMapping("/getEmployee/{username}")
    Employee getEmployeeByUsername(@PathVariable String username){
       return employeeService.getEmployeeByUsername(username);
   }

}
