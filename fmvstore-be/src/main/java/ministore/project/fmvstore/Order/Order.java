package ministore.project.fmvstore.Order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ministore.project.fmvstore.User.UserEntity;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date orderTime;
    private String paymentMethod;
    private int status;
    private double total;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity customer;
}
