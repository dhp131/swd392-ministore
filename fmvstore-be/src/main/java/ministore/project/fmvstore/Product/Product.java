package ministore.project.fmvstore.Product;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    private int Id;
    private String name;
    private double price;
    private String imageUrl;
    private int status;
    @ManyToOne
    @JoinColumn
    private Category category;

}