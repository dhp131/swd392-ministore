package ministore.project.fmvstore.Category;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.Product.Product;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity

public class Category {
    @Id
    Integer id;
    String name;
    String description;
    @OneToMany
    List<Product> products;


}