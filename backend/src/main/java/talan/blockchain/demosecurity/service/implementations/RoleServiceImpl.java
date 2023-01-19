package talan.blockchain.demosecurity.service.implementations;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import talan.blockchain.demosecurity.DAO.AuthorityRepository;
import talan.blockchain.demosecurity.DAO.EmployeeRepository;
import talan.blockchain.demosecurity.DAO.RoleRepository;
import talan.blockchain.demosecurity.entities.Authority;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.service.interfaces.AuthorityService;
import talan.blockchain.demosecurity.service.interfaces.RoleService;

import java.util.List;
@Service
@Transactional

public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;
    private AuthorityRepository authorityRepository;

    private EmployeeRepository employeeRepository;
    public RoleServiceImpl(RoleRepository roleRepository,AuthorityRepository authorityRepository, EmployeeRepository employeeRepository){
        this.roleRepository = roleRepository;
        this.authorityRepository= authorityRepository;
        this.employeeRepository=employeeRepository;
    }

    @Override
    public Role saveRole(Role role) {
        Role role1;
        if((role1 = roleRepository.findRoleByRolename(role.getRolename())) == null){
            role.setId(null);
            role1 = roleRepository.save(role);
        }
        return role1;
    }

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role updateRoleByRolename(String oldRolename, Role newRole) {
        Role role = roleRepository.findRoleByRolename(oldRolename);
        if(role != null){
            if(newRole.getRolename() != null){
                role.setRolename(newRole.getRolename());
                return roleRepository.save(role);
            }
            }
        return null;
        }


    @Override
    public int deleteRoleByRolename(String rolename) {
        Role role = roleRepository.findRoleByRolename(rolename);
        List <Employee> employees = employeeRepository.findAll();
        if((role.getRolename() != null && !role.getAuthorities().isEmpty())){
            employees.stream().forEach(employee -> employee.getRoles().remove(role));

        }
        return roleRepository.deleteByRolename(rolename);

    }

    @Override
    public Role assignAuthority(String rolename, String authorityname) {
        Authority authority = authorityRepository.findAuthoritiesByAuthorityname(authorityname);
        Role role = roleRepository.findRoleByRolename(rolename);
        if((role.getRolename() != null && authority.getAuthorityname() != null)){
            role.getAuthorities().add(authority);
            return role;
        }
        return null;
    }

    @Override
    public Role rejectAuthority(String rolename, String authorityname) {
        Authority authority = authorityRepository.findAuthoritiesByAuthorityname(authorityname);
        Role role = roleRepository.findRoleByRolename(rolename);
        if(role.getRolename() != null){
            role.getAuthorities().remove(authority);
            return role;
        }
        return null;
    }

}
