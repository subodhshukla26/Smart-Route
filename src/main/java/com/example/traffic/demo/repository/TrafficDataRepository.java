package com.example.traffic.demo.repository;

import com.example.traffic.demo.model.TrafficData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TrafficDataRepository extends MongoRepository<TrafficData, String> {
    List<TrafficData> findByAreaIgnoreCase(String area);
}
