package com.loanapp.loanpaymentcalculator.business;

import com.loanapp.loanpaymentcalculator.api.model.LoanPaymentRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class LoanPaymentService {

    private static final int DEFAULT_SCALE = 8;

    public BigDecimal calculateLoanPayment(LoanPaymentRequest paymentRequest) {
        BigDecimal rate =  divide(paymentRequest.getInterestRate(), new BigDecimal("12"), 2);
        //TODO: Give meaningful names
        BigDecimal oper2 = divide(paymentRequest.getResidualValue(), ((BigDecimal.ONE.add(rate)).pow(paymentRequest.getTerm())));
        BigDecimal oper1 = paymentRequest.getLoanAmount().subtract(oper2);
        BigDecimal oper5 = divide(BigDecimal.ONE, (BigDecimal.ONE.add(rate)).pow(paymentRequest.getTerm()));
        BigDecimal oper4 = BigDecimal.ONE.subtract(oper5);
        BigDecimal oper3 = divide(rate, oper4) ;

        BigDecimal result = oper1.multiply(oper3);
        return result.setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal divide(BigDecimal a, BigDecimal b, int scale){
        return a.divide(b, scale, RoundingMode.HALF_UP);
    }

    private BigDecimal divide(BigDecimal a, BigDecimal b){
        return divide(a, b ,DEFAULT_SCALE);
    }
}
