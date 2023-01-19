package talan.blockchain.demosecurity.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import talan.blockchain.demosecurity.entities.Authority;

public interface AuthorityRepository extends JpaRepository<Authority,Long> {
Authority findAuthoritiesByAuthorityname(String authorityname);
int deleteByAuthorityname(String authorityname);
}
