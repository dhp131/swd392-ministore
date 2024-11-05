package ministore.project.fmvstore.Order;

import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.Cart.Cart;
import ministore.project.fmvstore.Cart.CartService;
import ministore.project.fmvstore.OrderDetail.OrderDetailDTO;
import ministore.project.fmvstore.Response.ApiResponse;
import ministore.project.fmvstore.User.UserEntity;
import ministore.project.fmvstore.User.UserRepository;
import ministore.project.fmvstore.exception.AppException;
import ministore.project.fmvstore.exception.ErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;
    private final CartService cartService;

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<String>> checkout(@RequestBody(required = false) String promotionCode) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Cart cart = cartService.getCartByUserId(user.getId());

        // Convert CartItem to OrderDetailDTO
        List<OrderDetailDTO> orderDetails = cart.getCartItems().stream()
                .map(cartItem -> OrderDetailDTO.builder()
                        .productId(cartItem.getProduct().getId())
                        .quantity(cartItem.getQuantity())
                        .build())
                .collect(Collectors.toList());

        // Create order and clear cart
        orderService.createOrder(orderDetails, promotionCode);
        cartService.clearCart(user.getId());

        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Order Created and Cart Cleared Successfully")
                .build());
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<String>> createOrder(@RequestBody CreateOrderRequest request) {
        orderService.createOrder(request.getOrderDetailDTOs(), request.getPromotionCode()); // Pass promotion code
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Order Created Successfully")
                .build());
    }

    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
    @PostMapping("/accept")
    public ResponseEntity<ApiResponse<String>> acceptOrder(@RequestParam String orderId) {
        orderService.acceptOrder(orderId);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Order Accepted Successfully")
                .build());
    }

    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE') or hasRole('CUSTOMER')")
    @PostMapping("/reject")
    public ResponseEntity<ApiResponse<String>> rejectOrder(@RequestParam String orderId) {
        orderService.rejectOrder(orderId);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Order Rejected Successfully")
                .build());
    }

    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrders() {
        return ResponseEntity.ok(ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getAllOrders())
                .build());
    }
    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE') or hasRole('CUSTOMER')")
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrdersByUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return ResponseEntity.ok(ApiResponse.<List<OrderResponse>>builder()
                .result(orderService.getOrdersByUser(user.getId()))
                .build());
    }
}