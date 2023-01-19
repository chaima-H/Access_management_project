package talan.blockchain.demosecurity.service.interfaces;

import talan.blockchain.demosecurity.entities.Authority;
import talan.blockchain.demosecurity.entities.Role;

import java.util.List;

public interface RoleService {
    Role saveRole(Role role);
    List<Role> getRoles();
    Role updateRoleByRolename(String oldRolename,Role newRole);
    int deleteRoleByRolename(String rolename);
    Role assignAuthority(String rolename,String authorityname);

    Role rejectAuthority(String rolename, String authorityname);

}
