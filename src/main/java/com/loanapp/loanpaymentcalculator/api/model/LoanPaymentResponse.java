package com.loanapp.loanpaymentcalculator.api.model;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class LoanPaymentResponse {
    private BigDecimal loanAmount;
    private BigDecimal paymentAmount;
}
