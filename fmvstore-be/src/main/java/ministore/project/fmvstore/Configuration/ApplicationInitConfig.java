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

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j

public class ApplicationInitConfig {
    RoleRepository roleRepository;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return _ -> {
            if (roleRepository.findByName(RoleEnum.MANAGER.name()).isEmpty()) {
                RoleEntity managerRole = new RoleEntity();
                managerRole.setName(RoleEnum.MANAGER.name());
                roleRepository.save(managerRole);
                log.info("Admin role has been created");

                UserEntity user = new UserEntity();
                user.setUsername("admin");
                user.setPassword(passwordEncoder.encode("admin"));
            }
            else {
                log.info("Admin role already exists");
            }

        };
    }
}
