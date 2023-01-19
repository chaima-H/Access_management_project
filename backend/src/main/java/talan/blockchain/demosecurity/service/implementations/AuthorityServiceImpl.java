package talan.blockchain.demosecurity.service.implementations;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import talan.blockchain.demosecurity.DAO.AuthorityRepository;
import talan.blockchain.demosecurity.DAO.RoleRepository;
import talan.blockchain.demosecurity.entities.Authority;
import talan.blockchain.demosecurity.entities.Role;
import talan.blockchain.demosecurity.service.interfaces.AuthorityService;

import java.util.List;
@Service
@Transactional

public class AuthorityServiceImpl implements AuthorityService {

    private AuthorityRepository authorityRepository;
    private RoleRepository roleRepository;
    public AuthorityServiceImpl(AuthorityRepository authorityRepository, RoleRepository roleRepository) {
        this.authorityRepository = authorityRepository ;
        this.roleRepository = roleRepository;
    }

    @Override
    public Authority saveAuthority(Authority authority) {
        Authority authority1;

        if( (authority1 = authorityRepository.findAuthoritiesByAuthorityname(authority.getAuthorityname())) == null){
            authority.setId(null);
            authority1 = authorityRepository.save(authority);

        }
        return authority1;
    }

    @Override
    public List<Authority> getAuthorities() {
        return authorityRepository.findAll();

    }

    @Override
    public Authority updateAuthorityByAuthorityname(String oldAuthorityname, Authority newAuthority) {
        Authority authority = authorityRepository.findAuthoritiesByAuthorityname(oldAuthorityname);
        if(authority != null){
            if(newAuthority.getAuthorityname() != null){
                authority.setAuthorityname(newAuthority.getAuthorityname());
                return authorityRepository.save(authority);
            }
        }
        return null;
    }

    @Override
    public int deleteAuthorityByAuthorityname(String authorityname) {
        Authority authority = authorityRepository.findAuthoritiesByAuthorityname(authorityname);
        List <Role> roles = roleRepository.findAll();
        if(authority.getAuthorityname() != null){
            roles.stream().forEach(role -> role.getAuthorities().remove(authority));
        }
        return authorityRepository.deleteByAuthorityname(authorityname);

    }
}
