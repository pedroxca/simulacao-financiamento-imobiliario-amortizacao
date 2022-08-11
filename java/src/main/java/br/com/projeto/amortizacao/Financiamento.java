package br.com.projeto.amortizacao;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public class Financiamento {
  private int quantidadeDeParcelas;
  private int quantidadeDeParcelasPagas;
  private BigDecimal valorFinanciamento = BigDecimal.valueOf(0);
  private BigDecimal taxaFinanciamentoEmDecimal = BigDecimal.valueOf(0);
  private BigDecimal taxaFinanciamentoEmDecimalMensal = BigDecimal.valueOf(0);
  private BigDecimal montante = BigDecimal.valueOf(0);
  private BigDecimal juros = BigDecimal.valueOf(0);
  private BigDecimal jurosPagos = BigDecimal.valueOf(0);
  private List<BigDecimal> valorParcelas = new ArrayList<>();
  private BigDecimal saldoDevedor = BigDecimal.valueOf(0L);

  private BigDecimal parcelaDeAmortizacao = BigDecimal.valueOf(0L);

  public Financiamento(int meses, BigDecimal valorFinanciamento, BigDecimal taxaFinanciamentoEmPorcentagem) {
    this.quantidadeDeParcelas = meses;
    this.valorFinanciamento = valorFinanciamento;
    this.saldoDevedor = valorFinanciamento;
    this.taxaFinanciamentoEmDecimal = taxaFinanciamentoEmPorcentagem.divide(BigDecimal.valueOf(100L),
        RoundingMode.HALF_UP).setScale(4);
    this.taxaFinanciamentoEmDecimalMensal = taxaFinanciamentoEmDecimal
        .divide(BigDecimal.valueOf(12L), RoundingMode.HALF_UP).setScale(4);
    this.parcelaDeAmortizacao = valorFinanciamento
        .divide(BigDecimal.valueOf(Integer.toUnsignedLong(quantidadeDeParcelas)), RoundingMode.HALF_UP);
    calculaJuros();
    calculaMontante();
    calculaParcelas();
  }

  private void calculaParcelas() {
    this.valorParcelas.removeAll(this.valorParcelas);
    long quantidadeDeParcelasPagasProv = quantidadeDeParcelasPagas;
    while (this.quantidadeDeParcelas > quantidadeDeParcelasPagasProv) {
      BigDecimal parcela = calculaParcela(this.parcelaDeAmortizacao, quantidadeDeParcelasPagasProv,
          this.taxaFinanciamentoEmDecimalMensal,
          this.valorFinanciamento);
      this.valorParcelas.add(parcela.setScale(2, RoundingMode.HALF_UP));
      quantidadeDeParcelasPagasProv += 1;
    }
  }

  public BigDecimal calculaParcela(BigDecimal valorAmortizacao, long quantidadeDeParcelasPagas,
      BigDecimal taxaDeJurosMensal, BigDecimal valorFinanciamento) {
    // parcela = valor_da_amortizacao + (taxa_de_juros_mensal*(valor_financiamento -
    // (quantidade_de_parcelas_pagas * valor_amortização)))
    BigDecimal parcela = valorAmortizacao.add(taxaDeJurosMensal.multiply(
        valorFinanciamento.subtract(BigDecimal.valueOf(quantidadeDeParcelasPagas).multiply(valorAmortizacao))));
    return parcela;
  }

  public void amortiza(long numeroDeParcelas) {
    if (!(numeroDeParcelas > (quantidadeDeParcelas - quantidadeDeParcelasPagas))) {
      for (int i = 0; i < numeroDeParcelas; i++) {
        amortiza();
      }
      recalcula();
    }
  }

  private void amortiza() {
    this.saldoDevedor = this.saldoDevedor.subtract(this.parcelaDeAmortizacao);
    quantidadeDeParcelasPagas++;
  }

  public void pagaUmaParcela() {
    if (quantidadeDeParcelasPagas < quantidadeDeParcelas) {
      amortiza();
      jurosPagos = jurosPagos.add(valorParcelas.get(0).subtract(parcelaDeAmortizacao));
      recalcula();
    }
  }

  private void recalcula() {
    calculaJuros();
    calculaMontante();
    calculaParcelas();
  }

  private void calculaMontante() {
    this.montante = this.saldoDevedor.add(this.juros);
  }

  private void calculaJuros() {
    this.juros = this.saldoDevedor.multiply(this.taxaFinanciamentoEmDecimalMensal.multiply(BigDecimal.valueOf(100L)));
  }

  public BigDecimal getMontante() {
    return montante.setScale(2, RoundingMode.HALF_UP);
  }

  public BigDecimal getJuros() {
    return juros.setScale(2, RoundingMode.HALF_UP);
  }

  public List<BigDecimal> getValorParcelas() {
    System.out.println("Parcelas atuais: " + this.valorParcelas.size());
    return valorParcelas;
  }

  public BigDecimal getSaldoDevedor() {
    return saldoDevedor;
  }

  public int getQuantidadeDeParcelasPagas() {
    return quantidadeDeParcelasPagas;
  }

  public BigDecimal getJurosPagos() {
    return jurosPagos;
  }
}
