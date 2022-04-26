package com.loanapp.loanpaymentcalculator.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.loanapp.loanpaymentcalculator.api.model.LoanPaymentRequest;
import com.loanapp.loanpaymentcalculator.business.LoanPaymentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class LoanControllerTest {
    private static final BigDecimal LOAN_AMOUNT = new BigDecimal("10000");
    private static final BigDecimal RESIDUAL_VALUE = new BigDecimal("5000");
    private static final BigDecimal INTEREST_RATE = new BigDecimal("6.5");
    private static final int TERM = 36;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LoanPaymentService loanPaymentService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void should_get_payment_amount_when_request_valid() throws Exception {
        LoanPaymentRequest paymentRequest = LoanPaymentRequest.builder()
                .loanAmount(LOAN_AMOUNT)
                .residualValue(RESIDUAL_VALUE)
                .term(TERM)
                .interestRate(INTEREST_RATE)
                .build();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/payment/calculate")
                        .content(objectMapper.writeValueAsString(paymentRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void should_get_error_when_loan_amount_missing() throws Exception {
        LoanPaymentRequest paymentRequest = LoanPaymentRequest.builder()
                .residualValue(RESIDUAL_VALUE)
                .term(TERM)
                .interestRate(INTEREST_RATE)
                .build();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/payment/calculate")
                        .content(objectMapper.writeValueAsString(paymentRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
}