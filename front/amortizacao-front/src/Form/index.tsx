import React, { FormEvent } from "react";
// @ts-ignore
import "./styles.css";

export interface FormProps {
  valorFinanciamento: number;
  onChangeValor(e: React.ChangeEvent<HTMLInputElement>): void;
  taxa: number;
  onChangeTaxa(e: React.ChangeEvent<HTMLInputElement>): void;
  meses: number;
  onChangeMeses(e: React.ChangeEvent<HTMLInputElement>): void;
  handleFormSubmit(event: FormEvent): void;
  id?: string
}

const FormComponent: React.FC<FormProps> = ({
  onChangeValor,
  onChangeMeses,
  onChangeTaxa,
  valorFinanciamento,
  taxa,
  meses,
  handleFormSubmit,
  id
}) => {
  return (
    <div className="App" id={id}>
      <form className="form">
        <div className="inputs-e-botoes">
          <div className="caixas">
            <input
              placeholder="Valor do financiamento"
              type="number"
              className="entrada-dados"
              onChange={onChangeValor}
              value={valorFinanciamento}
            />
            <input
              placeholder="Porcentagem da taxa"
              type="number"
              className="entrada-dados"
              onChange={onChangeTaxa}
              value={taxa}
            />
          </div>
          <div className="caixas botoes">
            <input
              placeholder="M"
              type="number"
              className="entrada-dados"
              id="meses"
              min={60}
              max={420}
              onChange={onChangeMeses}
              value={meses}
            />
            <button onClick={handleFormSubmit} className="botao-simula">
              Simula
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
