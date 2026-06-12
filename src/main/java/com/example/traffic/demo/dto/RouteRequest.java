package com.example.traffic.demo.dto;
import lombok.Data;

@Data
public class RouteRequest {
    private String source;
    private String destination;
}