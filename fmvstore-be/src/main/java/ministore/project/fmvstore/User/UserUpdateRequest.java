package ministore.project.fmvstore.User;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Getter
@Setter
public class UserUpdateRequest {
    @Size(min = 6, max = 20)
    String password;
    String firstName;
    String lastName;
    String email;
    int number;
    String address;
}
