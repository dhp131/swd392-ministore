package ministore.project.fmvstore.OrderDetail;

import jakarta.persistence.*;
import lombok.*;
import ministore.project.fmvstore.Order.Orders;
import ministore.project.fmvstore.Product.Product;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int quantity;
    private double price;
    private double total;
}
