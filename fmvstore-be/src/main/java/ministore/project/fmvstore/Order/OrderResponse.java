package ministore.project.fmvstore.Order;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
public class OrderResponse {
    private String userId;
    private LocalDateTime orderDate;
    private String status;

}
