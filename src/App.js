import React, { Component } from "react";
import { baseUrl, key } from "./config";
import _ from "lodash";
import axios from "axios";

class App extends Component {
  state = {
    imoveis: [],
    paginacaoInfo: {},
    pesquisa: {
      fields: [
        "Bairro",
        "Codigo",
        "Categoria",
        "FotoDestaquePequena",
        "ValorLocacao",
        "ValorVenda",
        "Status"
      ],
      filter: {
        ExibirNoSite: "Sim",
        Status: ["Aluguel", "Venda e Aluguel"],
        ValorLocacao: [">", 0]
      },
      paginacao: { pagina: 1, quantidade: 10 }
    }
  };
  getImoveis = async () => {
    const pesquisa = JSON.stringify(this.state.pesquisa);
    const getImoveis = axios.get(
      `${baseUrl}/imoveis/listar?key=${key}&showtotal=1&pesquisa=${pesquisa}`
    );
    const imoveisResponse = await getImoveis;
    let imoveis = _.omit(imoveisResponse.data, [
      "pagina",
      "paginas",
      "quantidade",
      "total"
    ]);
    imoveis = _.values(imoveis);
    const paginacaoInfo = _.pick(imoveisResponse.data, [
      "pagina",
      "paginas",
      "quantidade",
      "total"
    ]);
    this.setState({ imoveis, paginacaoInfo });
  };
  componentDidMount() {
    this.getImoveis();
  }
  _handleFinalidadeChange = finalidade => {
    const pesquisa = { ...this.state.pesquisa };
    const filter = { ...this.state.pesquisa.filter };
    filter.Status = [finalidade, "Venda e Aluguel"];
    if (finalidade === "Venda") {
      delete filter.ValorLocacao;
      filter.ValorVenda = [">", 0];
    } else {
      delete filter.ValorVenda;
      filter.ValorLocacao = [">", 0];
    }
    pesquisa.filter = filter;
    this.setState({ pesquisa }, () => {
      this.getImoveis();
    });
  };
  render() {
    const { imoveis, paginacaoInfo } = this.state;
    return (
      <div className="App">
        <h1>Anglo Americana Imóveis</h1>
        <button
          className="btn"
          onClick={() => this._handleFinalidadeChange("Venda")}
        >
          Venda
        </button>
        <button
          className="btn"
          onClick={() => this._handleFinalidadeChange("Aluguel")}
        >
          Locação
        </button>
        <p className="lead">{paginacaoInfo.total} imóveis encontrados</p>
        {imoveis.map(imovel => {
          return (
            <div key={imovel.Codigo}>
              <img src={imovel.FotoDestaquePequena} alt="" />
              <h3>
                {imovel.Categoria} - {imovel.Bairro}
              </h3>
              <p>
                <strong>Venda: </strong>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(imovel.ValorLocacao)}
              </p>
              <p>
                <strong>Locação: </strong>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(imovel.ValorVenda)}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
