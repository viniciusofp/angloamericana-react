import React, { Component } from "react";
import { strings } from "../../initialState";
import informacoes from "../../assets/informacoes.png";

class Informacoes extends Component {
  state = {};
  render() {
    const { imovelProp } = strings;
    const { imovel, lang } = this.props;
    const ValorCondominio = (
      <li>
        <strong>{imovelProp[lang].condominio}: </strong>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(imovel.ValorCondominio)}
      </li>
    );
    const ValorLocacao = (
      <li>
        <strong>{imovelProp[lang].valorDeLocacao}: </strong>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(imovel.ValorLocacao)}
      </li>
    );
    const ValorVenda = (
      <li>
        <strong>{imovelProp[lang].valorDeVenda}: </strong>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(imovel.ValorVenda)}
      </li>
    );
    const ValorIptu = (
      <li>
        <strong>IPTU: </strong>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(imovel.ValorIptu)}
      </li>
    );
    return (
      <div className="imovel__infra">
        <h3>
          <img src={informacoes} alt="" />
          Informações
        </h3>
        <div className="row">
          <div className="col-md-4">
            <ul>
              <li>
                <strong>{imovelProp[lang].referencia}: </strong> {imovel.Codigo}
              </li>
              <li>
                <strong>{imovelProp[lang].finalidade}: </strong>{" "}
                {imovelProp[lang][imovel.Status]}
              </li>
              <li>
                <strong>{imovelProp[lang].bairro}: </strong> {imovel.Bairro}
              </li>
              <li>
                <strong>{imovelProp[lang].tipoDoImovel}: </strong>{" "}
                {imovelProp[lang][imovel.Categoria]}
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              <li>
                <strong>{imovelProp[lang].areaPrivativa}: </strong>{" "}
                {imovel.AreaPrivativa}m²
              </li>
              <li>
                <strong>{imovelProp[lang].areaTotal}: </strong>{" "}
                {imovel.AreaTotal}m²
              </li>
              {imovel.ValorVenda > 0 ? ValorVenda : ""}
              {imovel.ValorLocacao > 0 ? ValorLocacao : ""}
              {imovel.ValorCondominio > 0 ? ValorCondominio : ""}
              {imovel.ValorIptu > 0 ? ValorIptu : ""}
            </ul>
          </div>
          <div className="col-md-4">
            <ul>
              <li>
                <strong>{imovelProp[lang].vagas}: </strong> {imovel.Vagas}
              </li>
              <li>
                <strong>{imovelProp[lang].quartos}: </strong>{" "}
                {imovel.Dormitorios}
              </li>
              <li>
                <strong>{imovelProp[lang].suites}: </strong> {imovel.Suites}
              </li>
              <li>
                <strong>{imovelProp[lang].banheiros}: </strong>{" "}
                {imovel.TotalBanheiros}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Informacoes;
