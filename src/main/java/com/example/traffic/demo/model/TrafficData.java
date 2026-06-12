package com.example.traffic.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "traffic_data")
public class TrafficData {

    @Id
    private String id;

    private String roadName;
    private String area;
    private String trafficLevel;
    private int vehicleCount;
    private double averageSpeed;
    private double latitude;
    private double longitude;
    private Instant updatedAt;
}
