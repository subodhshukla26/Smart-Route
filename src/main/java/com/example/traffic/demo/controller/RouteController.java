package com.example.traffic.demo.controller;

import com.example.traffic.demo.model.Route;
import com.example.traffic.demo.service.RouteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @PostMapping
    public Route addRoute(@RequestBody Route route) {
        return routeService.saveRoute(route);
    }

    @GetMapping
    public List<Route> getRoutes() {
        return routeService.getAllRoutes();
    }

    @GetMapping("/best")
    public Route getBestRoute(
            @RequestParam(required = false) String source,
            @RequestParam(required = false) String destination
    ) {
        return routeService.getBestRoute(source, destination).orElse(null);
    }
}
