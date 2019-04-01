import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

class Hero extends Component {
  state = {
    buscarCodigo: false,
    content: {
      pt: {
        title: "O imóvel dos seus sonhos está aqui",
        finalidade: "Finalidade",
        finalidades: [
          { name: "Comprar", value: "" },
          { name: "Alugar", value: "" }
        ],
        bairros: "Bairros",
        tipo: "Tipo do imóvel",
        tipos: [
          { name: "Casa", value: "" },
          { name: "Apartamento", value: "" },
          { name: "Cobertura", value: "" },
          { name: "Comercial", value: "" }
        ],
        buscar: "Buscar",
        codigo: "Buscar pelo <strong>código do imóvel</strong>",
        querAnunciar:
          'Quer anunciar seu imóvel? <br class="d-block d-md-none" />A <strong>Anglo Americana</strong> é a opção certa pra você!',
        querAnunciarBtn: "Cadastre o seu imóvel"
      },
      en: {
        title: "Find your way home",
        finalidade: "Goal",
        finalidades: [{ name: "Buy", value: "" }, { name: "Rent", value: "" }],
        bairros: "Neighborhood",
        tipo: "Property Type",
        tipos: [
          { name: "House", value: "" },
          { name: "Apartment", value: "" },
          { name: "Penthouse", value: "" },
          { name: "Commercial", value: "" }
        ],
        buscar: "Search",
        codigo: "Search by <strong>property code</strong>",
        querAnunciar:
          'Do you want to rent or sell your property? <br class="d-block d-md-none" /> <strong>Anglo Americana</strong> is the right choice!',
        querAnunciarBtn: "List your property"
      }
    }
  };
  constructor(props) {
    super(props);
    this.Codigo = React.createRef();
  }
  _openBuscarCodigo = () => {
    const buscarCodigo = !this.state.buscarCodigo;
    this.setState({ buscarCodigo });
  };
  _handleBuscarCodigo = e => {
    e.preventDefault();
    console.log(this.Codigo.current.value);
    this.props.history.push(`/imovel/buscacodigo/${this.Codigo.current.value}`);
  };
  render() {
    const { lang } = this.props;
    const { content } = this.state;
    return (
      <React.Fragment>
        <div className="hero">
          <div className="hero__wrapper">
            <h1>{content[lang].title}</h1>
            <div className="hero__form input-group ">
              <select className="custom-select">
                <option defaultValue>{content[lang].finalidade}</option>
                {content[lang].finalidades.map(finalidade => {
                  return (
                    <option
                      key={"herofinalidade" + finalidade.name}
                      value={finalidade.value}
                    >
                      {finalidade.name}
                    </option>
                  );
                })}
              </select>
              <select className="custom-select">
                <option defaultValue>{content[lang].tipo}</option>
                {content[lang].tipos.map(tipo => {
                  return (
                    <option key={"herotipo" + tipo.name} value={tipo.value}>
                      {tipo.name}
                    </option>
                  );
                })}
              </select>
              <select className="custom-select">
                <option defaultValue>{content[lang].bairros}</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <div className="input-group-append">
                <button className="btn btn-danger">
                  {content[lang].buscar}
                </button>
              </div>
            </div>
            <p className="hero__buscarCodigo">
              <span
                onClick={this._openBuscarCodigo}
                dangerouslySetInnerHTML={{ __html: content[lang].codigo }}
              />
            </p>
            <form
              onSubmit={this._handleBuscarCodigo}
              className={
                this.state.buscarCodigo
                  ? "hero__buscarCodigo_form active"
                  : "hero__buscarCodigo_form"
              }
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Código do Imóvel"
                  name="Codigo"
                  ref={this.Codigo}
                />
                <div className="input-group-append">
                  <button className="btn btn-secondary">
                    <FontAwesomeIcon icon={["fas", "arrow-right"]} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="cadastre_row">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-auto align-self-center">
                <p
                  dangerouslySetInnerHTML={{
                    __html: content[lang].querAnunciar
                  }}
                />
              </div>
              <div className="col-auto col-lg-auto align-self-center">
                <button className="btn btn-light">
                  {content[lang].querAnunciarBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Hero);
