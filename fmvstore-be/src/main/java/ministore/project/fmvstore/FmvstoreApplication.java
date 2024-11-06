package ministore.project.fmvstore;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FmvstoreApplication {

	private static final Logger log = LoggerFactory.getLogger(FmvstoreApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(FmvstoreApplication.class, args);
	}

}
