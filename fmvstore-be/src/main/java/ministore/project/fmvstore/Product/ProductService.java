package ministore.project.fmvstore.Product;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.Category.Category;
import ministore.project.fmvstore.Category.CategoryRepository;
import ministore.project.fmvstore.exception.AppException;
import ministore.project.fmvstore.exception.ErrorCode;
import org.springframework.stereotype.Service;

import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class ProductService {
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> ProductResponse.builder()
                        .name(product.getName())
                        .price(product.getPrice())
                        .imageUrl(product.getImageUrl())
                        .status(product.getStatus())
                        .build())
                .collect(java.util.stream.Collectors.toList());
    }
    public void createProduct(ProductCreationRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .category(category)
                .status(request.getStatus())
                .build();
        productRepository.save(product);
    }
    public ProductResponse getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        return ProductResponse.builder()
                .name(product.getName())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .status(product.getStatus())
                .build();
    }
    public void updateProduct(String id, ProductCreationRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        if(request.getName() != null)
            product.setName(request.getName());
        if(request.getPrice() != 0)
            product.setPrice(request.getPrice());
        if(request.getImageUrl() != null)
            product.setImageUrl(request.getImageUrl());
        if (request.getCategoryId() != null)
            product.setCategory(category);
        if(request.getStatus() != 0)
            product.setStatus(request.getStatus());
        productRepository.save(product);
    }
    public void deleteProduct(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        productRepository.delete(product);
    }

}
