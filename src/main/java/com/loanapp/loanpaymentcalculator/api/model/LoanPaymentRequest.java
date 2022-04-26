package com.loanapp.loanpaymentcalculator.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class LoanPaymentRequest {
    @Min(value = 1, message = "must be equal or greater than 1")
    private int term;
    @NotNull(message = "must not be empty")
    private BigDecimal loanAmount;
    @NotNull(message = "must not be empty")
    private BigDecimal interestRate;
    @NotNull(message = "must not be empty")
    private BigDecimal residualValue;
}
