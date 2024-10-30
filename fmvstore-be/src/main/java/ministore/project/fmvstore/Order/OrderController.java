package ministore.project.fmvstore.Order;

import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.Response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

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
    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
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
}
