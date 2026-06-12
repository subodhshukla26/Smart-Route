package com.example.traffic.demo.repository;

import com.example.traffic.demo.model.Signal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SignalRepository extends MongoRepository<Signal, String> {
    List<Signal> findByRoadNameIgnoreCase(String roadName);
}
