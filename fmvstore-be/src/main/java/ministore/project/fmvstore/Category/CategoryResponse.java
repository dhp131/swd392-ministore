package ministore.project.fmvstore.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ministore.project.fmvstore.Product.ProductResponse;

import java.util.List;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {
    int id;
    String name;
    String description;
    List<ProductResponse> products;
}
