package ministore.project.fmvstore.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.Response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<Set<UserResponse>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.<Set<UserResponse>>builder()
                .result(userService.getAllUsers())
                .build());

    }

    // Create new user
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createUser(@RequestBody @Valid UserCreationRequest request) {

        userService.createUser(request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("USER CREATE SUCCESSFULLY")
                .build());
    }
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> updateUser(
            @PathVariable String userId,
            @RequestBody UserUpdateRequest request) {
        userService.updateUser(userId, request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("USER UPDATE SUCCESSFULLY")
                .build());
    }

}