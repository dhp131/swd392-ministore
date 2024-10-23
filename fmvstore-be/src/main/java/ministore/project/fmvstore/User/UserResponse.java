package ministore.project.fmvstore.User;


import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.management.relation.Role;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    String firstName;
    String lastName;
    String email;
    int number;
    Role roles;

}
