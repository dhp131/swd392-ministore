package ministore.project.fmvstore.Order;

import lombok.Data;
import ministore.project.fmvstore.OrderDetail.OrderDetailDTO;

import java.util.List;

@Data
public class CreateOrderRequest {
    private List<OrderDetailDTO> orderDetailDTOs;
    private String promotionCode;
}
