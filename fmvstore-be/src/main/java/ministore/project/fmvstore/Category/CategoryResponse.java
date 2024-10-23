package ministore.project.fmvstore.Category;

import jakarta.persistence.OneToMany;
import ministore.project.fmvstore.Product.Product;

import java.util.List;

public class CategoryResponse {
    String name;
    String description;
    @OneToMany
    List<Product> products;
}
