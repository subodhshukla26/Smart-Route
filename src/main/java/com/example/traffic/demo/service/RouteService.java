package com.example.traffic.demo.service;

import com.example.traffic.demo.model.Route;
import com.example.traffic.demo.repository.RouteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public Route saveRoute(Route route) {
        return routeRepository.save(route);
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Optional<Route> getBestRoute(String source, String destination) {
        if (source == null || source.isBlank() || destination == null || destination.isBlank()) {
            return routeRepository.findAll()
                    .stream()
                    .min((first, second) -> Integer.compare(first.getEstimatedTime(), second.getEstimatedTime()));
        }

        return routeRepository
                .findBySourceIgnoreCaseAndDestinationIgnoreCaseOrderByEstimatedTimeAsc(source, destination)
                .stream()
                .findFirst();
    }
}
