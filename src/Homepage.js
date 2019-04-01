import React, { Component } from "react";
import { baseUrl, key } from "./config";
import _ from "lodash";
import axios from "axios";
import {
  fetchDestaquesLocacao,
  fetchDestaquesVenda
} from "./components/apiCalls";

import Hero from "./components/home/hero";
import HomeDestaques from "./components/home/destaques";
import Segmentacoes from "./components/home/segmentacoes";
import About from "./components/home/about";
import BuscaBairro from "./components/home/buscaBairro";

import "./style.css";

const paginacaoItems = ["pagina", "paginas", "quantidade", "total"];

class Homepage extends Component {
  state = {
    destaquesVenda: [],
    destaquesLocacao: []
  };
  async componentDidMount() {
    const destaquesVenda = await fetchDestaquesVenda();
    const destaquesLocacao = await fetchDestaquesLocacao();
    this.setState({ destaquesLocacao, destaquesVenda });
  }
  render() {
    return (
      <div className="Homepage">
        <Hero lang={this.props.lang} />
        <HomeDestaques
          lang={this.props.lang}
          imoveis={this.state.destaquesVenda}
          title="Destaques à venda"
          status="Venda"
          valorProp="ValorVenda"
        />
        <HomeDestaques
          lang={this.props.lang}
          imoveis={this.state.destaquesLocacao}
          title="Destaques para locação"
          status="Locação"
          valorProp="ValorLocacao"
        />
        <Segmentacoes lang={this.props.lang} />
        <About lang={this.props.lang} />
        <BuscaBairro lang={this.props.lang} />
      </div>
    );
  }
}

export default Homepage;
