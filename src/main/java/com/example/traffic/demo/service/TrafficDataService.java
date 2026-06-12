package com.example.traffic.demo.service;

import com.example.traffic.demo.model.TrafficData;
import com.example.traffic.demo.repository.TrafficDataRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class TrafficDataService {

    private final TrafficDataRepository trafficDataRepository;

    public TrafficDataService(TrafficDataRepository trafficDataRepository) {
        this.trafficDataRepository = trafficDataRepository;
    }

    public TrafficData saveTrafficData(TrafficData trafficData) {
        if (trafficData.getUpdatedAt() == null) {
            trafficData.setUpdatedAt(Instant.now());
        }
        return trafficDataRepository.save(trafficData);
    }

    public List<TrafficData> getTrafficData(String area) {
        if (area == null || area.isBlank()) {
            return trafficDataRepository.findAll();
        }
        return trafficDataRepository.findByAreaIgnoreCase(area);
    }
}
