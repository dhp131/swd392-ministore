package ministore.project.fmvstore.Category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    public void addCategory(CategoryRequest request) {
        Category category = Category.builder()
                .name(request.getName())
                .build();
        categoryRepository.save(category);
    }
}
