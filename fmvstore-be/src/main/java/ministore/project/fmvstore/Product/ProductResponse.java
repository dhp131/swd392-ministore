package ministore.project.fmvstore.Product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponse {
    private String id;
    private String name;
    private double price;
    private String imageUrl;
    private int status;
}
