package ministore.project.fmvstore.Order;

import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.OrderDetail.OrderDetail;
import ministore.project.fmvstore.OrderDetail.OrderDetailDTO;
import ministore.project.fmvstore.Product.Product;
import ministore.project.fmvstore.Product.ProductRepository;
import ministore.project.fmvstore.Promotion.Promotion;
import ministore.project.fmvstore.Promotion.PromotionRepository;
import ministore.project.fmvstore.User.UserEntity;
import ministore.project.fmvstore.User.UserRepository;
import ministore.project.fmvstore.exception.AppException;
import ministore.project.fmvstore.exception.ErrorCode;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrdersRepository ordersRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PromotionRepository promotionRepository;

    @Transactional
    public void createOrder(List<OrderDetailDTO> orderDetailDTOs, String promotionCode) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Orders order = Orders.builder()
                .user(user)
                .orderDate(LocalDateTime.now())
                .totalAmount(0)
                .status(StatusEnum.PENDING.name())
                .build();

        // Calculate total amount and create order details
        List<OrderDetail> orderDetails = orderDetailDTOs.stream().map(dto -> {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            double total = dto.getQuantity() * product.getPrice();
            if (user.getBalance() < total)
                throw new AppException(ErrorCode.INSUFFICIENT_BALANCE);
            else {
                user.setBalance(user.getBalance() - total);
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

        double totalAmount = orderDetails.stream().mapToDouble(OrderDetail::getTotal).sum();

        // Apply promotion if valid code is provided
        if (promotionCode != null && !promotionCode.isEmpty()) {
            Optional<Promotion> promotionOpt = promotionRepository.findByCode(promotionCode);
            if (promotionOpt.isPresent()) {
                Promotion promotion = promotionOpt.get();
                Date currentDate = new Date();
                if (currentDate.after(promotion.getStartDate()) && currentDate.before(promotion.getEndDate())) {
                    double discount = totalAmount * (promotion.getDiscountPercentage() / 100);
                    totalAmount -= discount;
                } else {
                    throw new AppException(ErrorCode.PROMOTION_EXPIRED);
                }
            } else {
                throw new AppException(ErrorCode.PROMOTION_NOT_FOUND);
            }
        }

        order.setOrderDetails(orderDetails);
        order.setTotalAmount(totalAmount);
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
    public List<OrderResponse> getAllOrders() {
        return ordersRepository.findAll().stream()
                .map(order -> OrderResponse.builder()
                        .orderId(order.getId())
                        .userId(order.getUser().getId())
                        .orderDate(order.getOrderDate())
                        .totalAmount(order.getTotalAmount())
                        .status(order.getStatus())
                        .orderDetails(order.getOrderDetails().stream()
                                .map(orderDetail -> OrderDetailDTO.builder()
                                        .imageUrl(orderDetail.getProduct().getImageUrl())
                                        .name(orderDetail.getProduct().getName())
                                        .price(orderDetail.getProduct().getPrice())
                                        .productId(orderDetail.getProduct().getId())
                                        .quantity(orderDetail.getQuantity())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }
    public List<OrderResponse> getOrdersByUser(String userId) {
        return ordersRepository.findByUserId(userId).stream()
                .map(order -> OrderResponse.builder()
                        .orderId(order.getId())
                        .userId(order.getUser().getId())
                        .orderDate(order.getOrderDate())
                        .totalAmount(order.getTotalAmount())
                        .status(order.getStatus())
                        .orderDetails(order.getOrderDetails().stream()
                                .map(orderDetail -> OrderDetailDTO.builder()
                                        .productId(orderDetail.getProduct().getId())
                                        .quantity(orderDetail.getQuantity())
                                        .imageUrl(orderDetail.getProduct().getImageUrl())
                                        .name(orderDetail.getProduct().getName())
                                        .price(orderDetail.getProduct().getPrice())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }
}


