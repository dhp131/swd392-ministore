package ministore.project.fmvstore.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

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


}