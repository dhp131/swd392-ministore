// In src/main/java/ministore/project/fmvstore/Order/OrderResponse.java
package ministore.project.fmvstore.Order;

import lombok.Builder;
import lombok.Data;
import ministore.project.fmvstore.OrderDetail.OrderDetailDTO;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private String orderId;
    private String userId;
    private LocalDateTime orderDate;
    private String status;
    private double totalAmount;
    private List<OrderDetailDTO> orderDetails;
}