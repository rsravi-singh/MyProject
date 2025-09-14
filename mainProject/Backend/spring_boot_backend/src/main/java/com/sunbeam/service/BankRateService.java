package com.sunbeam.service;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sunbeam.pojo.BankRates;

import lombok.AllArgsConstructor;



@Service
@AllArgsConstructor
public class BankRateService {

	private final ObjectMapper objectMapper;
    private final Path filePath = Paths.get("src/main/resources/data/rates.json");

  

    public BankRates getRates() throws IOException {
        ClassPathResource resource = new ClassPathResource("data/rates.json");
        try (InputStream inputStream = resource.getInputStream()) {
            return objectMapper.readValue(inputStream, BankRates.class);
        }
    }


    public void updateRates(BankRates updatedRates) throws IOException {
        try (BufferedWriter writer = Files.newBufferedWriter(filePath)) {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(writer, updatedRates);
        }
    }
}