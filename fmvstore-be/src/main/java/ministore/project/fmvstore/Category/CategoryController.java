package ministore.project.fmvstore.Category;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import ministore.project.fmvstore.Response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private CategoryService categoryService;
    @GetMapping
    public List<CategoryResponse> getAllCategories() {
        return categoryService.getAllCategories();

    }
    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
    @PostMapping
    public ResponseEntity<ApiResponse<String>> addCategory(@RequestBody @Valid CategoryRequest request){
        categoryService.addCategory(request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Category Created Successfully")
                .build());
    }
    @GetMapping("/{id}")
    public CategoryResponse getCategoryById(@PathVariable Integer id){
        return categoryService.getCategoryById(id);
    }
    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> updateCategory(@PathVariable Integer id, @RequestBody @Valid CategoryRequest request){
        categoryService.updateCategory(id, request);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Category Updated Successfully")
                .build());
    }
    @PreAuthorize("hasRole('MANAGER') or hasRole('EMPLOYEE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteCategory(@PathVariable Integer id){
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.<String>builder()
                .result("Category Deleted Successfully")
                .build());
    }

}
