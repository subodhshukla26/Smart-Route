package com.example.traffic.demo.controller;

import com.example.traffic.demo.model.TrafficData;
import com.example.traffic.demo.service.TrafficDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/traffic")
public class TrafficDataController {

    private final TrafficDataService trafficDataService;

    public TrafficDataController(TrafficDataService trafficDataService) {
        this.trafficDataService = trafficDataService;
    }

    @PostMapping
    public TrafficData addTrafficData(@RequestBody TrafficData trafficData) {
        return trafficDataService.saveTrafficData(trafficData);
    }

    @GetMapping
    public List<TrafficData> getTrafficData(@RequestParam(required = false) String area) {
        return trafficDataService.getTrafficData(area);
    }
}
