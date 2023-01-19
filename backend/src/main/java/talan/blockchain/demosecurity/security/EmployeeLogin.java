package talan.blockchain.demosecurity.security;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class EmployeeLogin {
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;

}
