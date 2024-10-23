package ministore.project.fmvstore.Product;

import lombok.*;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.Category.Category;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductCreationRequest {
    Integer categoryId;
    private String name;
    private double price;
    private String imageUrl;
    private int status;
}
