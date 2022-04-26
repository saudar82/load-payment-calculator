package com.loanapp.loanpaymentcalculator.api;

import com.loanapp.loanpaymentcalculator.api.model.LoanPaymentRequest;
import com.loanapp.loanpaymentcalculator.api.model.LoanPaymentResponse;
import com.loanapp.loanpaymentcalculator.business.LoanPaymentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.math.BigDecimal;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@AllArgsConstructor
public class LoanController {

    private LoanPaymentService loanPaymentService;

    @PostMapping(path = "/api/payment/calculate", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public LoanPaymentResponse calculatePayment(@RequestBody @Valid LoanPaymentRequest paymentRequest) throws Exception {
        BigDecimal paymentAmount = loanPaymentService.calculateLoanPayment(paymentRequest);
        return LoanPaymentResponse.builder()
                .paymentAmount(paymentAmount)
                .loanAmount(paymentRequest.getLoanAmount())
                .build();
    }


}
