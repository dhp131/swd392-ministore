package ministore.project.fmvstore.Product;

import ministore.project.fmvstore.User.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
