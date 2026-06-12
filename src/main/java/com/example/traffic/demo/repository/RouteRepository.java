package com.example.traffic.demo.repository;

import com.example.traffic.demo.model.Route;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RouteRepository extends MongoRepository<Route, String> {
    List<Route> findBySourceIgnoreCaseAndDestinationIgnoreCaseOrderByEstimatedTimeAsc(String source, String destination);
}
