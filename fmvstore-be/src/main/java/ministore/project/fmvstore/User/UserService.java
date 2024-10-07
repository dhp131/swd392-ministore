package ministore.project.fmvstore.User;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class UserService {

    private final UserRepository userRepository;

    public void createUser(UserCreationRequest request) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(request.getUsername());
        userEntity.setFirstName(request.getFirstName());
        userEntity.setLastName(request.getLastName());
        userEntity.setEmail(request.getEmail());
        userEntity.setPassword(request.getPassword());
        userEntity.setNumber(request.getNumber());
        userRepository.save(userEntity);
    }

}
