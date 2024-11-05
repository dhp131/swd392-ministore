package ministore.project.fmvstore.OrderDetail;

import lombok.Builder;
import lombok.Data;
import ministore.project.fmvstore.Product.Product;

import java.util.List;

@Builder
@Data
public class OrderDetailDTO {

    private String productId;
    private int quantity;
    private String name;
    private double price;
    private String imageUrl;
}

