import React, { Component } from "react";
import _ from "lodash";
import { fetchImovel } from "./components/apiCalls";
import ReCAPTCHA from "react-google-recaptcha";
import { strings } from "./initialState";
import FotosImovel from "./components/imovel/fotos";
import Informacoes from "./components/imovel/info";

import detalhesdoimovel from "./assets/detalhesdoimovel.png";
import detalhesdocondominio from "./assets/detalhesdocondominio.png";
import pontosdeinteresse from "./assets/pontosdeinteresse.png";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab, fas);

class Imovel extends Component {
  state = {
    descricao: false,
    campos: [],
    photosLength: 0,
    imovel: {
      Foto: [{ Foto: "", FotoPequena: "" }],
      InfraEstrutura: [],
      Caracteristicas: [],
      Pontos: [],
      Status: []
    },
    currentPhoto: 0
  };

  async componentDidMount() {
    const imovel = await fetchImovel(this.props.match.params.codigo);
    this.setState({ imovel });
    // this.getImovel(this.props.match.params.codigo);
    window.scrollTo(0, 0);
  }
  _handlePhotoSelect = foto => {
    const fotos = this.state.imovel.Foto;
    const currentPhoto = fotos.indexOf(foto);
    this.setState({ currentPhoto });
  };
  _handlePhotoChange = direction => {
    const numberOfPhotos = this.state.imovel.Foto.length - 1;
    let currentPhoto = this.state.currentPhoto;
    if (direction === "next") {
      if (currentPhoto === numberOfPhotos) {
        currentPhoto = 0;
      } else {
        currentPhoto++;
      }
    } else {
      if (currentPhoto === 0) {
        currentPhoto = numberOfPhotos;
      } else {
        currentPhoto--;
      }
    }
    this.setState({ currentPhoto });
  };
  _openDescricao = () => {
    const descricao = !this.state.descricao;
    this.setState({ descricao });
  };
  render() {
    const { imovel, currentPhoto, content, descricao } = this.state;
    const { lang } = this.props;
    const { imovelProp } = strings;
    console.log(imovelProp);
    return (
      <div className="imovel">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-9">
              <FotosImovel
                onPhotoChange={this._handlePhotoChange}
                onPhotoSelect={this._handlePhotoSelect}
                imovel={imovel}
                currentPhoto={currentPhoto}
              />
              <h1>
                {imovel.Categoria} - {imovel.Bairro}
              </h1>
              <p>
                {imovel.ValorVenda > 0 ? (
                  <strong>{imovelProp[lang].valorDeVenda}: </strong>
                ) : (
                  ""
                )}
                {imovel.ValorVenda > 0
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    }).format(imovel.ValorVenda) + " | "
                  : ""}
                {imovel.ValorLocacao > 0 ? (
                  <strong>{imovelProp[lang].valorDeLocacao}: </strong>
                ) : (
                  ""
                )}
                {imovel.ValorLocacao > 0
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    }).format(imovel.ValorLocacao) + " | "
                  : ""}
                Ref.: {imovel.Codigo}
              </p>
              <p className="imovel__caracteristicas">
                <FontAwesomeIcon icon={["fas", "bed"]} className="mr-1" />
                <strong>{imovel.Dormitorios}</strong> {imovelProp[lang].quartos}
                <FontAwesomeIcon icon={["fas", "car"]} className="mr-1 ml-3" />
                <strong>{imovel.Vagas}</strong> {imovelProp[lang].vagas}
                <FontAwesomeIcon icon={["fas", "bath"]} className="mr-1 ml-3" />
                <strong>{imovel.TotalBanheiros}</strong>{" "}
                {imovelProp[lang].banheiros}
                <FontAwesomeIcon
                  icon={["fas", "expand"]}
                  className="mr-1 ml-3"
                />{" "}
                <strong>{imovel.AreaPrivativa}</strong>m²
              </p>
              <div className="imovel__descricao">
                <div
                  className={
                    descricao
                      ? "imovel__descricao_container open"
                      : "imovel__descricao_container"
                  }
                >
                  <p>{imovel.DescricaoWeb}</p>
                </div>
                <span
                  onClick={this._openDescricao}
                  className="imovel__descricao_trigger"
                >
                  Leia mais
                </span>
              </div>

              <Informacoes imovel={imovel} lang={lang} />

              {imovel.Caracteristicas.length > 0 ? (
                <div className="imovel__infra">
                  <h3>
                    <img src={detalhesdoimovel} alt="" />
                    Detalhes do Imóvel
                  </h3>
                  {imovel.Caracteristicas.map(item => {
                    return (
                      <div key={`carac-${item}`} className="imovel__infra_item">
                        {item}
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              {imovel.InfraEstrutura.length > 0 ? (
                <div className="imovel__infra">
                  <h3>
                    <img src={detalhesdocondominio} alt="" />
                    Detalhes do Condomínio
                  </h3>
                  {imovel.InfraEstrutura.map(item => {
                    return (
                      <div key={`condo-${item}`} className="imovel__infra_item">
                        {item}
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              {imovel.Pontos.length > 0 ? (
                <div className="imovel__infra">
                  <h3>
                    <img src={pontosdeinteresse} alt="" />
                    Pontos de Interesse
                  </h3>
                  <small>
                    Pontos de interesse a até um quilômetro de distância do
                    imóvel (valores aproximados)
                  </small>
                  <ul>
                    {imovel.Pontos.map((ponto, i) => {
                      return (
                        <li key={`ponto-${i}`}>
                          {ponto.name} - {ponto.distance}m
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="imovel__contato sticky-top">
                <h4>Gostou desse imóvel?</h4>
                <p>Envie uma mensagem!</p>
                <form>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Telefone"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="4"
                    className="form-control"
                    placeholder={`Olá, estou interessado no imóvel ${
                      imovel.Codigo
                    } e gostaria de receber mais informações.`}
                  />
                  <div className="recaptchaContainer">
                    <ReCAPTCHA
                      sitekey="6LclK5sUAAAAAD3lF5s0fyafiQmRFE_rCxzVPE2d"
                      onChange={console.log("change recaptcha")}
                    />
                  </div>
                  <button className="btn btn-danger form-control">
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Imovel;
