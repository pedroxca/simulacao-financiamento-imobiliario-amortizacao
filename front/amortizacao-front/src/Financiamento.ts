interface Mes{
  valor: number
  mes: number
}

export class Financiamento {
  private quantidadeDeParcelas = 0;
  private _quantidadeDeParcelasPagas = 0;
  private valorFinanciamento = 0;
  private taxaFinanciamentoEmDecimal = 0;
  private taxaFinanciamentoEmDecimalMensal = 0;
  private _montante = 0;
  private _juros = 0;
  private _jurosPagos = 0;
  private _valorParcelas = new Array<Mes>;
  private _saldoDevedor = 0;
  private parcelaDeAmortizacao = 0;
  constructor(meses: number, valorFinanciamento: number, taxaFinanciamentoEmPorcentagem: number) {
    this.quantidadeDeParcelas = meses;
    this.valorFinanciamento = valorFinanciamento;
    this._saldoDevedor = valorFinanciamento;
    this.taxaFinanciamentoEmDecimal = taxaFinanciamentoEmPorcentagem / 100;
    this.taxaFinanciamentoEmDecimalMensal = this.taxaFinanciamentoEmDecimal / 12;
    this.parcelaDeAmortizacao = valorFinanciamento / this.quantidadeDeParcelas;
    this.calculaJuros();
    this.calculaMontante();
    this.calculaParcelas();
  }

  private calculaParcelas(): void {
    this._valorParcelas = [];
    let quantidadeDeParcelasPagasProv = this._quantidadeDeParcelasPagas;
    while (this.quantidadeDeParcelas > quantidadeDeParcelasPagasProv) {
      let parcela = this.calculaParcela(this.parcelaDeAmortizacao, quantidadeDeParcelasPagasProv,
        this.taxaFinanciamentoEmDecimalMensal,
        this.valorFinanciamento);
      this._valorParcelas.push({valor: parcela, mes: quantidadeDeParcelasPagasProv});
      quantidadeDeParcelasPagasProv += 1;
    }
  }

  public calculaParcela(valorAmortizacao: number, quantidadeDeParcelasPagas: number,
    taxaDeJurosMensal: number, valorFinanciamento: number): number {
    // parcela = valor_da_amortizacao + (taxa_de_juros_mensal*(valor_financiamento -
    // (quantidade_de_parcelas_pagas * valor_amortização)))
    let parcela = valorAmortizacao + (taxaDeJurosMensal * (
      valorFinanciamento - (quantidadeDeParcelasPagas * valorAmortizacao)));
    return parcela;
  }


  private calculaMontante(): void {
    this._montante = this._saldoDevedor + this._juros;
  }

  private calculaJuros(): void {
    this._juros = this._saldoDevedor * this.taxaFinanciamentoEmDecimalMensal * 100;
  }
  private amortizaUmaParcela() {
    this._saldoDevedor = this._saldoDevedor - this.parcelaDeAmortizacao;
    this._quantidadeDeParcelasPagas++;
  }
  public amortiza(numeroDeParcelas: number) {
    if (!(numeroDeParcelas > (this.quantidadeDeParcelas - this._quantidadeDeParcelasPagas))) {
      for (let i = 0; i < numeroDeParcelas; i++) {
        this.amortizaUmaParcela();
      }
      this.recalcula();
    }
  }


  public pagaUmaParcela() {
    if (this._quantidadeDeParcelasPagas < this.quantidadeDeParcelas) {
      this.amortizaUmaParcela();
      this._jurosPagos = this._jurosPagos + (this._valorParcelas[0].valor - (this.parcelaDeAmortizacao));
      this.recalcula();
    }
  }

  private recalcula() {
    this.calculaJuros();
    this.calculaMontante();
    this.calculaParcelas();
  }

  public get montante(): number {
    return this._montante;
  }

  public get juros(): number {
    return this._juros
  }
  public get jurosPagos(): number {
    return this._jurosPagos
  }

  public get valorParcelas(): Array<Mes> {
    return this._valorParcelas
  }

  public get saldoDevedor(): number {
    return this._saldoDevedor
  }

  public get quantidadeDeParcelasPagas(): number {
    return this._quantidadeDeParcelasPagas
  }




}
