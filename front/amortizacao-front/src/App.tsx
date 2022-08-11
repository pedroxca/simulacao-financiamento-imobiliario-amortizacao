// @ts-ignore
import React, { FormEvent, useEffect, useState } from "react";
import "./App.css";
import FormComponent from "./Form";
import ParcelaCard from "./ParcelaCard";
import { Financiamento } from "./Financiamento";
function App() {
  interface ISimulacao {
    taxa: number;
    valor: number;
    meses: number;
  }
  const [taxa, setTaxa] = useState<number>(0);
  const [valorFinanciamento, setValorFinanciamento] = useState<number>(0);
  const [meses, setMeses] = useState<number>(0);
  const [parcelas, setParcelas] = useState<JSX.Element[]>([]);
  let simulacaoObj: ISimulacao = {
    taxa: 0,
    meses: 0,
    valor: 0,
  };
  const [financiamentoState, setFinanciamentoState] = useState<Financiamento>();
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!(0 == (taxa || valorFinanciamento || meses))) {
      if (!(meses >= 60 && meses <= 420)) {
        alert("Meses tem que ir de 60 a 420");
        return;
      }
      if (!(valorFinanciamento >= 80000 && valorFinanciamento <= 400000)) {
        alert("O valor do financiamento tem que ir de 80.000 a 400000");
        return;
      }
      if (taxa <= 0) {
        alert("A taxa nao pode ser menor ou igual a 0");
        return;
      }
      simulacaoObj = {
        taxa,
        valor: valorFinanciamento,
        meses,
      };
      setFinanciamentoState(
        new Financiamento(
          simulacaoObj.meses,
          simulacaoObj.valor,
          simulacaoObj.taxa
        )
      );
      // renderPagamentoParcela();
    }
  };
  const renderPagamentoParcela = () => {
    if (financiamentoState?.valorParcelas.length) {
      setParcelas([]);
      for (let i = 0; i < financiamentoState.valorParcelas.length; i += 10) {
        const element = financiamentoState?.valorParcelas[i];
        setParcelas((curr) => [
          ...curr,

          <ParcelaCard
            valorDaParcela={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(element.valor)}
            numeroDaParcela={element.mes}
          />,
        ]);
      }
    }
  };
  useEffect(() => {
    renderPagamentoParcela();
  }, [financiamentoState]);

  const onChangeTaxa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const taxa = parseFloat(e.target.value);
    setTaxa(taxa);
  };
  const onChangeValorFinanciamento = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const ValorFinanciamento = parseFloat(e.target.value);
    setValorFinanciamento(ValorFinanciamento);
  };
  const onChangeMeses = (e: React.ChangeEvent<HTMLInputElement>) => {
    const Meses = parseInt(e.target.value);
    setMeses(Meses);
  };
  return (
    <div className="main">
      <FormComponent
        handleFormSubmit={handleFormSubmit}
        taxa={taxa}
        onChangeTaxa={onChangeTaxa}
        onChangeValor={onChangeValorFinanciamento}
        onChangeMeses={onChangeMeses}
        meses={meses}
        valorFinanciamento={valorFinanciamento}
        id="form"
      />
      <button
        onClick={() => {
          financiamentoState?.pagaUmaParcela();
          renderPagamentoParcela();
        }}
      >
        Paga uma parcela
      </button>
      <button
        onClick={() => {
          financiamentoState?.amortiza(1);
          renderPagamentoParcela();
        }}
      >
        Amortiza
      </button>
      {parcelas.length > 0 ? (
        <table className="table" id="table">
          <thead>
            <tr>
              <th>Valor da parcela</th>
              <th>Mês</th>
            </tr>
          </thead>
          <tbody>{parcelas}</tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
