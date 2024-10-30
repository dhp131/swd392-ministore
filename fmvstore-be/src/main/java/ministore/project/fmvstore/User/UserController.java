package ministore.project.fmvstore.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.Response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public ResponseEntity<ApiResponse<Set<UserResponse>>> getAllUsers() {
        return ResponseEntity.ok(ApiResponse.<Set<UserResponse>>builder()
                .result(userService.getAllUsers())
                .build());

    }
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable String userId) {
        return ResponseEntity.ok(ApiResponse.<UserResponse>builder()
                .result(userService.getUserById(userId))
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
    //Update User to Employee
    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping("/{userId}/updateRole")
    public ResponseEntity<ApiResponse<String>> updateUserRole(
            @PathVariable String userId) {
        userService.updateUserRole(userId);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("USER ROLE UPDATED SUCCESSFULLY")
                .build());
    }


}