package talan.blockchain.demosecurity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import talan.blockchain.demosecurity.entities.Employee;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private String userName;
    private Employee newEmployee;
}
