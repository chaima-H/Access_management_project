package talan.blockchain.demosecurity.service.interfaces;

import talan.blockchain.demosecurity.entities.Authority;
import talan.blockchain.demosecurity.entities.Role;

import java.util.List;

public interface AuthorityService {
    Authority saveAuthority(Authority authority);
    List<Authority>getAuthorities();
    Authority updateAuthorityByAuthorityname(String oldAuthorityname, Authority newAuthority);
    int deleteAuthorityByAuthorityname(String authorityname);

}
