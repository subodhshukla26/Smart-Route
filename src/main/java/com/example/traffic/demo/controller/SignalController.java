package com.example.traffic.demo.controller;

import com.example.traffic.demo.model.Signal;
import com.example.traffic.demo.service.SignalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/signals")
public class SignalController {

    private final SignalService signalService;

    public SignalController(SignalService signalService) {
        this.signalService = signalService;
    }

    @PostMapping
    public Signal addSignal(@RequestBody Signal signal) {
        return signalService.saveSignal(signal);
    }

    @GetMapping
    public List<Signal> getSignals(@RequestParam(required = false) String roadName) {
        return signalService.getSignals(roadName);
    }
}
