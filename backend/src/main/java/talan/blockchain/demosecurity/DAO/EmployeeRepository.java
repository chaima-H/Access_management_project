package talan.blockchain.demosecurity.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import talan.blockchain.demosecurity.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    Employee findByUsername (String username);
    int deleteByUsername(String username);

}
