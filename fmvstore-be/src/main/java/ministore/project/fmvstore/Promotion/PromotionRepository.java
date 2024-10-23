package ministore.project.fmvstore.Promotion;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    Promotion findByCode(String code);
}
