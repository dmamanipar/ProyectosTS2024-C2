package pe.edu.upeu.asistencia.repositories;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import pe.edu.upeu.asistencia.models.Periodo;

import java.util.List;
import java.util.Optional;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class PeriodoRepositoryTest {

    @Autowired
    private PeriodoRepository periodoRepository;

    @Autowired
    private TestEntityManager entityManager;

    @BeforeEach
    public void setUp() {
        System.out.println("Primer paso");
        Periodo periodo = new Periodo();
        periodo.setNombre("2024-1");
        periodo.setEstado("Activo");
        periodoRepository.save(periodo);
        entityManager.persist(periodo);
    }

    @Order(1)
    @Test
    public void testFindById() {
        System.out.println("Primera Prueba");
        Long id = periodoRepository.maxID().get();
        Periodo periodo = periodoRepository.findById(id).get();
        Assertions.assertEquals("2024-1", periodo.getNombre());
    }

    @Order(2)
    @Test
    public void testByName() {
        Periodo periodo = periodoRepository.findByNombre("2024-1").get();
        Assertions.assertEquals("2024-1", periodo.getNombre());
    }

    @Order(3)
    @Test
    public void createPeriodo() {
        Periodo periodo = new Periodo();
        periodo.setNombre("2024-2");
        periodo.setEstado("Activo");
        periodoRepository.save(periodo);
        entityManager.persist(periodo);
        Assertions.assertEquals("2024-2", periodo.getNombre());
    }

    @Order(4)
    @Test
    public void listaPeriodo() {
        List<Periodo> periodos = periodoRepository.findAll();
        System.out.println(periodos.size());
        System.out.println("ID:"+periodos.get(0).getId());
        Assertions.assertEquals(periodos.size(),1);
    }

    @Test
    public void testDeletePeriodo() {
        Long id = periodoRepository.maxID().get();
        periodoRepository.deleteById(id);
        Assertions.assertTrue(periodoRepository.findAll().isEmpty(), "La lista no está vacía");

    }

    @Test
    void testDeletePeriodo2() {
        //periodoRepository.deleteById(periodoRepository.maxID().get());
        //Mockito.verify(periodoRepository).deleteById(periodoRepository.maxID().get());
    }

    @Test
    public void testUpdatePeriodo() {

    }
}
