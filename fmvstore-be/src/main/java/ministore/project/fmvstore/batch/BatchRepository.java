package ministore.project.fmvstore.batch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {
}
