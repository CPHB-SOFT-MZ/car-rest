package org.personal.api;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Created by Mikkel on 28/09/16.
 */
public class CarFacade{
    EntityManagerFactory emf;

    /**
     * Constructor with direct injecting EntityManagerFactory
     * @param emf
     */
    public CarFacade(EntityManagerFactory emf){
        this.emf = emf;
    }

    public CarFacade(){}


    public EntityManager getEntityManager(){
        return emf.createEntityManager();
    }

    public void addEntityManagerFactory(EntityManagerFactory emf) {
        this.emf = emf;
    }


    public Car addCar(Car c) {
        EntityManager em = getEntityManager();
        try{
            em.getTransaction().begin();
            em.persist(c);
            em.getTransaction().commit();
            return c;
        } finally {
            em.close();
        }
    }


    public Car deleteCar(int id) {
        EntityManager em = getEntityManager();
        try {
            TypedQuery<Car> query = em.createQuery("SELECT c FROM Car c WHERE c.id = :id", Car.class);
            query.setParameter("id", id);
            Car car = query.getSingleResult();
            em.getTransaction().begin();
            em.remove(car);
            em.getTransaction().commit();
            return car;
        } finally {
            em.close();
        }
    }

    public Car getCar(int id) {
        EntityManager em = getEntityManager();
            TypedQuery<Car> query = em.createQuery("SELECT c FROM Car c WHERE c.id = :id", Car.class);
            query.setParameter("id", id);
            return query.getSingleResult();
    }

    public List<Car> getCars() {
        EntityManager em = getEntityManager();
        try {
            TypedQuery<Car> query = em.createQuery("SELECT c FROM Car c", Car.class);
            return query.getResultList();
        } finally {
            em.close();
        }
    }

    public Car editCar(Car c) {
        return null;
    }
}
