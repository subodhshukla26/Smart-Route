package com.example.traffic.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "routes")
public class Route {

    @Id
    private String id;

    private String source;
    private String destination;
    private double distance;
    private int estimatedTime;
}