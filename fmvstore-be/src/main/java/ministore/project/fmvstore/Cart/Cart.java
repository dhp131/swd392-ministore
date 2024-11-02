package ministore.project.fmvstore.Cart;

import jakarta.persistence.*;
import lombok.*;
import ministore.project.fmvstore.User.UserEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default  // Ensures the list is initialized when using the builder
    private List<CartItem> cartItems = new ArrayList<>();

    private double totalAmount;
}
