import React, { Component } from "react";

class Hero extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="hero">
          <div className="hero__wrapper">
            <h1>O imóvel dos seus sonhos está aqui</h1>
            <div className="hero__form input-group ">
              <select
                className="custom-select"
                placeholder="Finalidade"
                aria-label="Username"
                aria-describedby="basic-addon1"
              >
                <option defaultValue>Finalidade</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <select
                className="custom-select"
                placeholder="Tipo do Imovel"
                aria-label="Username"
                aria-describedby="basic-addon1"
              >
                <option defaultValue>Tipo do Imovel</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <select
                className="custom-select"
                placeholder="Bairro"
                aria-label="Username"
                aria-describedby="basic-addon1"
              >
                <option defaultValue>Bairro</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <div className="input-group-append">
                <button className="btn btn-danger">Buscar</button>
              </div>
            </div>
            <p className="hero__buscarCodigo">
              Buscar pelo <strong>código do imóvel</strong>
            </p>
          </div>
        </div>
        <div className="cadastre_row">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-auto col-lg-auto align-self-center">
                <p>
                  Quer anunciar seu imóvel? <br className="d-block d-md-none" />
                  A <strong>Anglo Americana</strong> é a opção certa pra você!
                </p>
              </div>
              <div className="col-auto col-lg-auto align-self-center">
                <button className="btn btn-light">Cadastre o seu imóvel</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Hero;
