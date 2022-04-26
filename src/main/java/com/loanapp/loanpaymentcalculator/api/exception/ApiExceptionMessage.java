package com.loanapp.loanpaymentcalculator.api.exception;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Builder
@Data
public class ApiExceptionMessage {
    private HttpStatus status;
    private String message;
    private List<String> errors;
}

