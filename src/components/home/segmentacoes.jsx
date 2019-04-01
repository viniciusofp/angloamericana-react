import React, { Component } from "react";

class Segmentacoes extends Component {
  state = {};
  render() {
    return (
      <div className="home__segmentacoes">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title">Lorem ipsum dolor sit amet</h2>
            </div>
            <div className="col-lg-8 col-md-7">
              <div className="home__segmentacoes-condominio">
                <button className="btn home__segmentacoes-button">
                  Condomínio Clube
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <div className="home__segmentacoes-coberturas">
                <button className="btn home__segmentacoes-button">
                  Coberturas
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <div className="home__segmentacoes-reforma">
                <button className="btn home__segmentacoes-button">
                  Para reformar
                </button>
              </div>
            </div>
            <div className="col-lg-8 col-md-7">
              <div className="home__segmentacoes-mobiliados">
                <button className="btn home__segmentacoes-button">
                  Mobiliados
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Segmentacoes;
