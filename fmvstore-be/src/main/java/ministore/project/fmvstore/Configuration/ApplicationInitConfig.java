package ministore.project.fmvstore.Configuration;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import ministore.project.fmvstore.Role.RoleEntity;
import ministore.project.fmvstore.Role.RoleEnum;
import ministore.project.fmvstore.Role.RoleRepository;
import ministore.project.fmvstore.User.UserEntity;
import ministore.project.fmvstore.User.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {
    RoleRepository roleRepository;


    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (roleRepository.findByName(RoleEnum.MANAGER.name()).isEmpty()) {
                RoleEntity managerRole = new RoleEntity();
                managerRole.setName(RoleEnum.MANAGER.name());
                roleRepository.save(managerRole);
                var roles = new HashSet<RoleEntity>();
                UserEntity user = new UserEntity();
                user.setUsername("admin");
                user.setPassword(passwordEncoder.encode("admin"));
                roles.add(roleRepository.findByName(RoleEnum.MANAGER.name()).get());
                user.setRoles(roles);
                // Validate user entity before saving
                if (user.getUsername() == null || user.getUsername().isEmpty()) {
                    throw new IllegalArgumentException("Username must not be null or empty");
                }
                if (user.getPassword() == null || user.getPassword().isEmpty()) {
                    throw new IllegalArgumentException("Password must not be null or empty");
                }
                userRepository.save(user);
                log.info("Admin user has been created");
            } else {
                log.info("Admin already exists");
            }
            if (roleRepository.findByName(RoleEnum.EMPLOYEE.name()).isEmpty()) {
                RoleEntity userRole = new RoleEntity();
                userRole.setName(RoleEnum.EMPLOYEE.name());
                roleRepository.save(userRole);
            }
            if (roleRepository.findByName(RoleEnum.CUSTOMER.name()).isEmpty()) {
                RoleEntity userRole = new RoleEntity();
                userRole.setName(RoleEnum.CUSTOMER.name());
                roleRepository.save(userRole);
            }

        };
}
}