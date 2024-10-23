package ministore.project.fmvstore.Product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ministore.project.fmvstore.Category.Category;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String Id;
    private String name;
    private double price;
    private String imageUrl;
    private int status;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}