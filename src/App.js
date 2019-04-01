import React, { Component } from "react";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Imovel from "./Imovel";
import BuscaImoveis from "./buscaImoveis";

class App extends Component {
  state = {
    lang: "pt"
  };

  _changeLang = () => {
    let lang = this.state.lang;
    lang === "pt" ? (lang = "en") : (lang = "pt");
    this.setState({ lang });
  };
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Navbar lang={this.state.lang} onChangeLang={this._changeLang} />
          <Route
            path="/"
            exact
            render={props => <Homepage {...props} lang={this.state.lang} />}
          />
          <Route
            path="/resultados-de-busca/:finalidade/"
            render={props => <BuscaImoveis {...props} lang={this.state.lang} />}
          />
          <Route
            path="/imovel/:tipoebairro/:codigo"
            render={props => <Imovel {...props} lang={this.state.lang} />}
          />
          <Footer lang={this.state.lang} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
