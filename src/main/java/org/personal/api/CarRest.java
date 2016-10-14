/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.personal.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Mikkel
 */
@Path("/cars")
public class CarRest {
    
    public static CarFacade facade = new CarFacade(EntityManagerFactoryService.getEmf());
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCars(){
        return Response.ok(facade.getCars()).header("Access-Control-Allow-Origin", "*").build();
    }
    
    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCar(@PathParam("id") int id){
        return Response.ok(facade.getCar(id)).header("Access-Control-Allow-Origin", "*").build();
    }
    
    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCar(@PathParam("id") int id){
        return Response.ok(facade.deleteCar(id))
                .header("Access-Control-Allow-Origin", "*")
		.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                .allow("OPTIONS").build();
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addCar(Car car){
        return Response.ok(facade.addCar(car))
                .header("Access-Control-Allow-Origin", "*")
		.header("Access-Control-Allow-Methods", "POST")
                .allow("OPTIONS").build();
    }
}
