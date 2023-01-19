package talan.blockchain.demosecurity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import talan.blockchain.demosecurity.DTO.AssignDTO;
import talan.blockchain.demosecurity.DTO.EmployeeDTO;
import talan.blockchain.demosecurity.DTO.RejectDTO;
import talan.blockchain.demosecurity.DTO.RoleDTO;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.service.interfaces.RoleService;

import java.util.List;

@RestController
@RequestMapping("/role")
@CrossOrigin("*")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/save")
    Role saveRole(@RequestBody Role role){return roleService.saveRole(role);}
    @PutMapping("/updateRole")
    Role updateRole(@RequestBody RoleDTO roleDTO){
        return  roleService.updateRoleByRolename(roleDTO.getRoleName(),roleDTO.getNewRole());
    }
    @DeleteMapping("/deleterole")
    int deleteRole(@RequestBody RoleDTO roleDTO){
        return roleService.deleteRoleByRolename(roleDTO.getRoleName());}
    @GetMapping("/roles")
    List<Role>getRoles(){return roleService.getRoles();}
    @PostMapping("/assignauthority")
    Role assignAuthority(@RequestBody AssignDTO assignDTO)
    {return roleService.assignAuthority(assignDTO.getRoleName(),assignDTO.getAuthorityName());}

    @PutMapping("/rejectAuthority")
    Role rejectAuthority(@RequestBody RejectDTO rejectDTO){
        return roleService.rejectAuthority(rejectDTO.getRoleName(),rejectDTO.getAuthorityName());
    }
}
