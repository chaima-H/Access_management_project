package talan.blockchain.demosecurity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import talan.blockchain.demosecurity.DTO.AuthorityDTO;
import talan.blockchain.demosecurity.entities.Authority;
import talan.blockchain.demosecurity.entities.Employee;
import talan.blockchain.demosecurity.service.interfaces.AuthorityService;

import java.util.List;

@RestController
@RequestMapping("/authority")
@CrossOrigin("*")
public class AuthorityController {

    private final AuthorityService authorityService;

    public AuthorityController(AuthorityService authorityService) {
        this.authorityService = authorityService;
    }

    @PostMapping("/save")
    Authority saveAuthority(@RequestBody Authority authority){return authorityService.saveAuthority(authority);}
    @GetMapping("/authorities")
    List<Authority> getEmployees(){return authorityService.getAuthorities();}
    @PutMapping("updateAuthority")
    Authority updateAuthority(@RequestBody AuthorityDTO authorityDTO){return authorityService.updateAuthorityByAuthorityname(authorityDTO.getAuthorityName(),authorityDTO.getNewAuthority());}
    @DeleteMapping("/delete")
    int deleteAuthority(@RequestBody AuthorityDTO authorityDTO){return authorityService.deleteAuthorityByAuthorityname(authorityDTO.getAuthorityName());}



}
