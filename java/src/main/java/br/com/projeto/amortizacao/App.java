package br.com.projeto.amortizacao;

import java.math.BigDecimal;

public class App {
    public static void main(String[] args) {
        Financiamento financiamento = new Financiamento(240, BigDecimal.valueOf(180000L), BigDecimal.valueOf(2.75d));
        // System.out.println(financiamento.calculaParcela(BigDecimal.valueOf(750), 0,
        // BigDecimal.valueOf(0.003d), BigDecimal.valueOf(180000L)));
        // System.out.println("Isso são os juros: " + financiamento.getJuros());
        // System.out.println("Isso é o montante: " + financiamento.getMontante());
        System.out.println("Isso é o saldo devedor: " + financiamento.getSaldoDevedor());
        System.out.println(financiamento.getValorParcelas());
        System.out.println(financiamento.getQuantidadeDeParcelasPagas());
        System.out.println("Juros pagos: " + financiamento.getJurosPagos());
        System.out.println("----------------------------------------");
        //--------------------
        for (int i = 0; i < 12; i++) {
            financiamento.pagaUmaParcela();
        }
        System.out.println("Isso é o saldo devedor: " + financiamento.getSaldoDevedor());
        System.out.println("Juros pagos: " + financiamento.getJurosPagos());
        System.out.println(financiamento.getValorParcelas());
        System.out.println(financiamento.getQuantidadeDeParcelasPagas());
        
        System.out.println("----------------------------------------");
        //--------------------
        financiamento.amortiza(5);
        System.out.println("Isso é o saldo devedor: " + financiamento.getSaldoDevedor());
        System.out.println("Juros pagos: " + financiamento.getJurosPagos());
        System.out.println(financiamento.getValorParcelas());
        System.out.println(financiamento.getQuantidadeDeParcelasPagas());
        System.out.println("Juros pagos: " + financiamento.getJurosPagos());
    }
}
