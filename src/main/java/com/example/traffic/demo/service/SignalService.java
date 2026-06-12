package com.example.traffic.demo.service;

import com.example.traffic.demo.model.Signal;
import com.example.traffic.demo.repository.SignalRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class SignalService {

    private final SignalRepository signalRepository;

    public SignalService(SignalRepository signalRepository) {
        this.signalRepository = signalRepository;
    }

    public Signal saveSignal(Signal signal) {
        if (signal.getUpdatedAt() == null) {
            signal.setUpdatedAt(Instant.now());
        }
        return signalRepository.save(signal);
    }

    public List<Signal> getSignals(String roadName) {
        if (roadName == null || roadName.isBlank()) {
            return signalRepository.findAll();
        }
        return signalRepository.findByRoadNameIgnoreCase(roadName);
    }
}
