package ministore.project.fmvstore.Order;

import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.OrderDetail.OrderDetail;
import ministore.project.fmvstore.OrderDetail.OrderDetailDTO;
import ministore.project.fmvstore.Product.Product;
import ministore.project.fmvstore.Product.ProductRepository;
import ministore.project.fmvstore.User.UserEntity;
import ministore.project.fmvstore.User.UserRepository;
import ministore.project.fmvstore.exception.AppException;
import ministore.project.fmvstore.exception.ErrorCode;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrdersRepository ordersRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createOrder(List<OrderDetailDTO> orderDetailDTOs) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Orders order = Orders.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .totalAmount(0)
                .status(StatusEnum.PENDING.name())
                .build();

        List<OrderDetail> orderDetails = orderDetailDTOs.stream().map(dto -> {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            double total = dto.getQuantity() * product.getPrice();
            if(user.getBalance()  < total)
                throw new AppException(ErrorCode.INSUFFICIENT_BALANCE);
            else {
                user.setBalance( (user.getBalance() - total));
                userRepository.save(user);
            }
            return OrderDetail.builder()
                    .order(order)
                    .product(product)
                    .quantity(dto.getQuantity())
                    .price(product.getPrice())
                    .total(total)
                    .build();
        }).collect(Collectors.toList());

        order.setOrderDetails(orderDetails);
        order.setTotalAmount(orderDetails.stream().mapToDouble(OrderDetail::getTotal).sum());

        ordersRepository.save(order);
    }
    public void acceptOrder(String orderId) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setStatus(StatusEnum.SHIPPING.name());
        ordersRepository.save(order);
    }
    public void rejectOrder(String orderId) {
        Orders order = ordersRepository.findById(orderId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setStatus(StatusEnum.REJECTED.name());
        ordersRepository.save(order);
    }
//    public List<OrderResponse> getAllOrders() {
//        return ordersRepository.findAll().stream()
//                .map(order -> OrderResponse.builder()
//
//                        .orderDate(order.getOrderDate())
//                        .totalAmount(order.getTotalAmount())
//                        .status(order.getStatus())
//                        .orderDetails(order.getOrderDetails().stream()
//                                .map(orderDetail -> OrderDetailDTO.builder()
//                                        .productId(orderDetail.getProduct().getId())
//                                        .quantity(orderDetail.getQuantity())
//                                        .build())
//                                .collect(Collectors.toList()))
//                        .build())
//                .collect(Collectors.toList());
//    }

}
