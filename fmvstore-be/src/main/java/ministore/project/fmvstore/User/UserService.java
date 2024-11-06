package ministore.project.fmvstore.User;

import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.Role.RoleEntity;
import ministore.project.fmvstore.Role.RoleEnum;
import ministore.project.fmvstore.Role.RoleRepository;
import ministore.project.fmvstore.exception.AppException;
import ministore.project.fmvstore.exception.ErrorCode;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor


public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;


    public void createUser(UserCreationRequest request) {
        if((userRepository.findByUsername((request.getUsername())).isPresent())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(request.getUsername());
        userEntity.setFirstName(request.getFirstName());
        userEntity.setLastName(request.getLastName());
        userEntity.setEmail(request.getEmail());
        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        userEntity.setNumber(request.getNumber());
        userEntity.setAddress(request.getAddress());
        RoleEntity customerRole = roleRepository.findById(RoleEnum.CUSTOMER.name()).orElseThrow();
        userEntity.setRoles(Set.of(customerRole));
        userRepository.save(userEntity);
    }
    public void updateUser(String userId, UserUpdateRequest request) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(request.getFirstName() != null)
            userEntity.setFirstName(request.getFirstName());
        if(request.getLastName() != null)
            userEntity.setLastName(request.getLastName());
        if(request.getEmail() != null)
            userEntity.setEmail(request.getEmail());
        if(request.getPassword() != null)
            userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        if(request.getNumber() != 0)
            userEntity.setNumber(request.getNumber());
        if(request.getAddress() != null)
            userEntity.setAddress(request.getAddress());
        userRepository.save(userEntity);
    }

    public Set<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userEntity -> {
                    UserResponse userResponse = new UserResponse();
                    userResponse.setId(userEntity.getId());
                    userResponse.setUsername(userEntity.getUsername());
                    userResponse.setFirstName(userEntity.getFirstName());
                    userResponse.setLastName(userEntity.getLastName());
                    userResponse.setEmail(userEntity.getEmail());
                    userResponse.setNumber(userEntity.getNumber());
                    userResponse.setAddress(userEntity.getAddress());
                    userResponse.setRoles(userEntity.getRoles().stream()
                            .map(RoleEntity::getName)
                            .collect(Collectors.toSet()));
                    return userResponse;
                })
                .collect(Collectors.toSet());
    }
    public UserResponse getUserById(String userId) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        UserResponse userResponse = new UserResponse();
        userResponse.setId(userEntity.getId());
        userResponse.setUsername(userEntity.getUsername());
        userResponse.setFirstName(userEntity.getFirstName());
        userResponse.setLastName(userEntity.getLastName());
        userResponse.setEmail(userEntity.getEmail());
        userResponse.setNumber(userEntity.getNumber());
        userResponse.setAddress(userEntity.getAddress());
        userResponse.setBalance(userEntity.getBalance());
        userResponse.setRoles(userEntity.getRoles().stream()
                .map(RoleEntity::getName)
                .collect(Collectors.toSet()));
        return userResponse;
    }
    public void updateUserRole(String userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        RoleEntity employeeRole = roleRepository.findByName(RoleEnum.EMPLOYEE.name())
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));

        user.setRoles(new HashSet<>(Set.of(employeeRole)));
        userRepository.save(user);
    }
}
