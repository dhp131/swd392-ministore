package ministore.project.fmvstore.OrderDetail;

import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class OrderDetailDTO {
    private String productId;
    private int quantity;
}

