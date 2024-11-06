package ministore.project.fmvstore.Category;

import lombok.RequiredArgsConstructor;
import ministore.project.fmvstore.Product.ProductResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> CategoryResponse.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .description(category.getDescription())
                        .products(category.getProducts().stream()
                                .map(product -> ProductResponse.builder()
                                        .id(product.getId())
                                        .name(product.getName())
                                        .price(product.getPrice())
                                        .imageUrl(product.getImageUrl())
                                        .status(product.getStatus())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

    }
    public void addCategory(CategoryRequest request) {
        Category category = Category.builder()
                .name(request.getName())
                .build();
        categoryRepository.save(category);
    }
    public CategoryResponse getCategoryById(Integer id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        return CategoryResponse.builder()
                .name(category.getName())
                .description(category.getDescription())
                .products(category.getProducts().stream()
                        .map(product -> ProductResponse.builder()
                                .name(product.getName())
                                .price(product.getPrice())
                                .imageUrl(product.getImageUrl())
                                .status(product.getStatus())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
    public void updateCategory(Integer id, CategoryRequest request) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        category.setName(request.getName());
        categoryRepository.save(category);
    }
    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        categoryRepository.delete(category);
    }
}
