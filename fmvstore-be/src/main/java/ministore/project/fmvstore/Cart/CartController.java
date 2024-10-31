package ministore.project.fmvstore.Cart;

import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.Response.ApiResponse;
import ministore.project.fmvstore.User.UserEntity;
import ministore.project.fmvstore.User.UserRepository;
import ministore.project.fmvstore.exception.AppException;
import ministore.project.fmvstore.exception.ErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    private final UserRepository userRepository;

    @PostMapping("/add/{productId}")
    public ResponseEntity<ApiResponse<String>> addItemToCart(@RequestBody CartAddRequest request, @PathVariable String productId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        cartService.addItemToCart(user.getId(), productId, request.getQuantity());
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Item added to cart successfully")
                .build());
    }
    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCartForUser() {
        CartResponse cartResponse = cartService.getCartResponseForCurrentUser();
        return ResponseEntity.ok(ApiResponse.<CartResponse>builder()
                .result(cartResponse)
                .build());
    }
    @PostMapping("/clear")
    public ResponseEntity<ApiResponse<String>> clearCart() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        cartService.clearCart(user.getId());
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Cart cleared successfully")
                .build());
    }
}
