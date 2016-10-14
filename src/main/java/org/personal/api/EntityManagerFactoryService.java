package org.personal.api;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 * Created by Mikkel on 04/10/16.
 */
public class EntityManagerFactoryService {
    private static EntityManagerFactory emf;

    public static EntityManagerFactory getEmf(){
        if(emf == null){
            emf = Persistence.createEntityManagerFactory("org.personal.api_api_war_0.0.1-SNAPSHOTPU");
        }
        return emf;
    }
}
