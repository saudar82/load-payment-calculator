package com.loanapp.loanpaymentcalculator.business;

import com.loanapp.loanpaymentcalculator.api.model.LoanPaymentRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class LoanPaymentServiceTest {

    private static final BigDecimal LOAN_AMOUNT = new BigDecimal("10000") ;
    private static final BigDecimal RESIDUAL_VALUE= new BigDecimal("5000");
    private static final BigDecimal INTEREST_RATE = new BigDecimal("6.5");
    private static final int TERM = 36;

    @Autowired
    LoanPaymentService loanService;

    @Test
    void Should_calulate_payment_when_inputs_are_valid() {
        LoanPaymentRequest paymentRequest = LoanPaymentRequest.builder()
                .loanAmount(LOAN_AMOUNT)
                .residualValue(RESIDUAL_VALUE)
                .term(TERM)
                .interestRate(INTEREST_RATE)
                .build();
        BigDecimal result =  loanService.calculateLoanPayment(paymentRequest);
        assertEquals(result, new BigDecimal("5400.00"));
    }
}