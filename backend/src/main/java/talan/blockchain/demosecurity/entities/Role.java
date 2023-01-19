package talan.blockchain.demosecurity.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

public class Role implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String rolename;
    private boolean isEnable = true;
    @ManyToMany
    private List<Authority> authorities = new ArrayList<>();


    public List<Authority> getAuthorities(){
        return  authorities;
    }
    public void setAuthorities(List<Authority> authorities){
        this.authorities= authorities;
    }

}
