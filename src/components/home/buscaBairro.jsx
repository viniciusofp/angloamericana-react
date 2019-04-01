import React, { Component } from "react";

class BuscaBairro extends Component {
  state = {
    principaisBairros: [
      { name: "Vila Nova Conceição", count: 221 },
      { name: "Moema", count: 201 },
      { name: "Jardim Paulista", count: 194 },
      { name: "Brooklin", count: 98 },
      { name: "Itaim Bibi", count: 79 },
      { name: "Jardins", count: 72 },
      { name: "Campo Belo", count: 62 },
      { name: "Jardim América", count: 59 },
      { name: "Paraíso", count: 50 },
      { name: "Vila Olímpia", count: 50 }
    ],
    opcoes: [
      "Alugar casa em",
      "Alugar apartamento em",
      "Comprar casa em",
      "Comprar apartamento em"
    ]
  };
  render() {
    return (
      <div className="home__buscaBairro">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3>Buscar imóveis por bairro</h3>
            </div>
            {this.state.opcoes.map(opcao => {
              return (
                <div key={opcao} className="col-md-6 col-xl-3">
                  {this.state.principaisBairros.map(bairro => {
                    return (
                      <p key={opcao + bairro.name}>
                        {opcao} {bairro.name}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default BuscaBairro;
