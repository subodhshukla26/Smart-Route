package com.example.traffic.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "signals")
public class Signal {

    @Id
    private String id;
    private String name;
    private String roadName;
    private String status;
    private int waitTimeSeconds;
    private double latitude;
    private double longitude;
    private Instant updatedAt;
}
