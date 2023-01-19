package talan.blockchain.demosecurity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import talan.blockchain.demosecurity.entities.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EntityDTO <T>{
    private String entityName;
    private T newEntity;
}
