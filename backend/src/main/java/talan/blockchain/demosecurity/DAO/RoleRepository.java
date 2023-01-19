package talan.blockchain.demosecurity.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import talan.blockchain.demosecurity.entities.Role;

public interface RoleRepository extends JpaRepository<Role,Long> {
Role findRoleByRolename(String rolename);
int deleteByRolename(String rolename);
}
