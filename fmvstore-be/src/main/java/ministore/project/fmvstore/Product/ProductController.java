package ministore.project.fmvstore.Product;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.Cloudinary.CloudinaryService;
import ministore.project.fmvstore.Response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    final CloudinaryService cloudinaryService;
    private ProductService productService;
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')" )
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createProduct(
            @RequestPart("product_detail") ProductCreationRequest request,
            @RequestPart("product_image") MultipartFile file) throws IOException {
        String imageUrl = cloudinaryService.uploadImage(file);
        request.setImageUrl(imageUrl);
        productService.createProduct(request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Product Create Successfully")
                .build());
    }

}