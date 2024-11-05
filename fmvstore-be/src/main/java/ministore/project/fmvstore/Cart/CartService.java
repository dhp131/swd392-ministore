package ministore.project.fmvstore.Cart;

import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.Product.Product;
import ministore.project.fmvstore.Product.ProductRepository;
import ministore.project.fmvstore.User.UserEntity;
import ministore.project.fmvstore.User.UserRepository;
import ministore.project.fmvstore.exception.AppException;
import ministore.project.fmvstore.exception.ErrorCode;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartResponse getCartResponseForCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            cart = Cart.builder()
                    .user(user)
                    .cartItems(new ArrayList<>())
                    .totalAmount(0)
                    .build();
            cartRepository.save(cart);
        }

        // Convert Cart to CartResponse
        return CartResponse.builder()
                .cartId(cart.getId())
                .totalAmount(cart.getTotalAmount())
                .cartItems(cart.getCartItems().stream().map(cartItem -> CartItemResponse.builder()
                        .productId(cartItem.getProduct().getId())
                        .productName(cartItem.getProduct().getName())
                        .price(cartItem.getPrice())
                        .quantity(cartItem.getQuantity())
                        .total(cartItem.getTotal())
                        .build()).collect(Collectors.toList()))
                .build();
    }
    public Cart getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }
    @Transactional
    public Cart addItemToCart(String userId, String productId, int quantity) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null) {
            cart = Cart.builder()
                    .user(user)
                    .totalAmount(0)
                    .build();
            cartRepository.save(cart);
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        double total = quantity * product.getPrice();
        CartItem cartItem = CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(quantity)
                .price(product.getPrice())
                .total(total)
                .build();

        cartItemRepository.save(cartItem);
        cart.getCartItems().add(cartItem);

        double updatedTotalAmount = cart.getCartItems().stream()
                .mapToDouble(CartItem::getTotal)
                .sum();
        cart.setTotalAmount(updatedTotalAmount);

        cartRepository.save(cart);
        return cart;
    }
    @Transactional
    public void clearCart(String userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            cartItemRepository.deleteAll(cart.getCartItems());
            cart.setCartItems(null);
            cart.setTotalAmount(0);
            cartRepository.save(cart);
        }
    }

}
