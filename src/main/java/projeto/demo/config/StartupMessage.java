package projeto.demo.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class StartupMessage implements ApplicationListener<ApplicationReadyEvent> {

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        System.out.println("\n Frontend: http://localhost:8080/");
        System.out.println(" API: http://localhost:8080/api/carros");
        System.out.println(" Documentação (Swagger): http://localhost:8080/swagger-ui.html");
    }
}