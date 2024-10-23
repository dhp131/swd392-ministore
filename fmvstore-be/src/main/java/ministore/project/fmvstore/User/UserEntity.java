package ministore.project.fmvstore.User;

import jakarta.persistence.*;
import lombok.*;
import ministore.project.fmvstore.Role.RoleEntity;

import java.util.Set;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String Id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private int number;
    private String email;
    private String address;

    @ManyToMany
    private Set<RoleEntity> roles;
}
