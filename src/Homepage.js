import React, { Component } from "react";
import { baseUrl, key } from "./config";
import _ from "lodash";
import axios from "axios";

import Navbar from "./components/navbar";
import Hero from "./components/home/hero";
import HomeDestaques from "./components/home/destaques";

import "./style.css";

const paginacaoItems = ["pagina", "paginas", "quantidade", "total"];

class Homepage extends Component {
  state = {
    destaquesVenda: [],
    destaquesLocacao: [],
    fields: [
      "AreaTotal",
      "Bairro",
      "Codigo",
      "Categoria",
      "FotoDestaque",
      "FotoDestaquePequena",
      "Dormitorios",
      "ValorLocacao",
      "ValorVenda",
      "Vagas",
      "Status"
    ],
    destaquesVendaFilter: {
      ExibirNoSite: "Sim",
      Status: ["Venda", "Venda e Aluguel"],
      ValorVenda: [">", 0],
      DestaqueWeb: "Sim"
    },
    destaquesLocacaoFilter: {
      ExibirNoSite: "Sim",
      Status: ["Aluguel", "Venda e Aluguel"],
      ValorLocacao: [">", 0],
      DestaqueWeb: "Sim"
    },
    paginacao: { pagina: 1, quantidade: 3 }
  };

  getDestaquesVenda = async () => {
    const fields = JSON.stringify(this.state.fields);
    const paginacao = JSON.stringify(this.state.paginacao);
    const destaquesVendaFilter = JSON.stringify(
      this.state.destaquesVendaFilter
    );
    const getDestaquesVenda = axios.get(
      `${baseUrl}/imoveis/listar?key=${key}&showtotal=1&pesquisa={"fields":${fields},"paginacao": ${paginacao},"filter":${destaquesVendaFilter},"order":{"DataHoraAtualizacao":"desc"}}`
    );
    const destaquesVendaResponse = await getDestaquesVenda;
    let destaquesVenda = _.omit(destaquesVendaResponse.data, paginacaoItems);
    destaquesVenda = _.values(destaquesVenda);
    this.setState({ destaquesVenda });
  };
  getDestaquesLocacao = async () => {
    const fields = JSON.stringify(this.state.fields);
    const paginacao = JSON.stringify(this.state.paginacao);
    const destaquesLocacaoFilter = JSON.stringify(
      this.state.destaquesLocacaoFilter
    );
    const getDestaquesLocacao = axios.get(
      `${baseUrl}/imoveis/listar?key=${key}&showtotal=1&pesquisa={"fields":${fields},"paginacao": ${paginacao},"filter":${destaquesLocacaoFilter}}`
    );
    const destaquesLocacaoResponse = await getDestaquesLocacao;
    let destaquesLocacao = _.omit(
      destaquesLocacaoResponse.data,
      paginacaoItems
    );
    destaquesLocacao = _.values(destaquesLocacao);
    this.setState({ destaquesLocacao });
  };
  componentDidMount() {
    this.getDestaquesVenda();
    this.getDestaquesLocacao();
  }
  render() {
    return (
      <div className="Homepage">
        <Navbar />
        <Hero />
        <HomeDestaques
          imoveis={this.state.destaquesVenda}
          title="Destaques à venda"
          status="Venda"
          valorProp="ValorVenda"
        />
        <HomeDestaques
          imoveis={this.state.destaquesLocacao}
          title="Destaques para locação"
          status="Locação"
          valorProp="ValorLocacao"
        />
        <div className="home__segmentacoes">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="section__title">Lorem ipsum dolor sit amet</h2>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="home__segmentacoes-condominio" />
              </div>
              <div className="col-lg-4 col-md-5">
                <div className="home__segmentacoes-coberturas" />
              </div>
              <div className="col-lg-4 col-md-5">
                <div className="home__segmentacoes-reforma" />
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="home__segmentacoes-mobiliados" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
