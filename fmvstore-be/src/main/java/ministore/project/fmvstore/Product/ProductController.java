package ministore.project.fmvstore.Product;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.Response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {


    private ProductService productService;
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')" )
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createProduct(@RequestBody ProductCreationRequest productCreationRequest) {
        productService.createProduct(productCreationRequest);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Product Create Successfully")
                .build());
    }

}