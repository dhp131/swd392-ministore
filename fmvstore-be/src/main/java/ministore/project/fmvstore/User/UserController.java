package ministore.project.fmvstore.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.Response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;


    // Create new user
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createUser(@RequestBody @Valid UserCreationRequest request) {
        userService.createUser(request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("USER CREATE SUCCESSFULLY")
                .build());
    }

}