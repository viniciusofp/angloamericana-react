import React, { Component } from "react";
import ImovelBox from "../imovelBox";

class HomeDestaques extends Component {
  state = {
    content: { en: { title: "" }, pt: { title: "" } }
  };
  componentDidMount() {
    const content = { ...this.state.content };
    let title = "";
    this.props.valorProp === "ValorVenda"
      ? (title = "Destaques à Venda")
      : (title = "Destaques para locação");
    content.pt.title = title;
    this.props.valorProp === "ValorVenda"
      ? (title = "Featured properties for sale")
      : (title = "Featured properties for rent");
    content.en.title = title;
    this.setState({ content });
  }
  render() {
    const { status, imoveis, title, valorProp, lang } = this.props;
    const { content } = this.state;
    return (
      <div className="home__destaques">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section__title">{content[lang].title}</h2>
            </div>
            {imoveis.map((imovel, i) => {
              return (
                <ImovelBox
                  lang={lang}
                  key={status + i}
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
