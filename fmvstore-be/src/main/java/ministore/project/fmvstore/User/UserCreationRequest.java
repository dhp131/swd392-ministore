package ministore.project.fmvstore.User;

import lombok.*;
import lombok.experimental.FieldDefaults;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserCreationRequest {
    @Size(min = 4)
    String username;

    @Size(min = 6, max = 20)
    String password;
    String firstName;
    String lastName;
    String email;
    int number;
    String address;
}
