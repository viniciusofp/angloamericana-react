import React, { Component } from "react";
import ImovelBox from "../imovelBox";

class HomeDestaques extends Component {
  state = {};
  render() {
    const { status, imoveis, title, valorProp } = this.props;
    return (
      <div className="home__destaques">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title">{title}</h2>
            </div>
            {imoveis.map((imovel, i) => {
              return (
                <ImovelBox
                  imovel={imovel}
                  i={i}
                  status={status}
                  valorProp={valorProp}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeDestaques;
