package ministore.project.fmvstore.Cart;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class CartResponse {
    private String cartId;
    private double totalAmount;
    private List<CartItemResponse> cartItems;
}
