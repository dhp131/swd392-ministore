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

}
