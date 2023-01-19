package talan.blockchain.demosecurity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import talan.blockchain.demosecurity.entities.Authority;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorityDTO {
    private String authorityName;
    private Authority newAuthority;
}
