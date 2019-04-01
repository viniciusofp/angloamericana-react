import React, { Component } from "react";
import axios from "axios";
import { baseUrl, key } from "../config";
import _ from "lodash";
import { Link } from "react-router-dom";
// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab, fas);
class ImovelBox extends Component {
  state = {
    photos: [],
    photo: "",
    currentPhoto: 0,
    photosLength: 0,
    content: {
      pt: {
        quartos: "Quartos",
        vagas: "Vagas",
        status: "",
        tipo: ""
      },
      en: {
        quartos: "Bedrooms",
        vagas: "Parking Spaces",
        status: "",
        tipo: ""
      }
    }
  };
  _handlePhotoChange = async (codigo, direction) => {
    if (this.state.photos.length === 0) {
      await this._fetchPhotos(codigo);
    }
    let currentPhoto = 0;
    if (direction === "next") {
      this.state.currentPhoto === this.state.photosLength - 1
        ? (currentPhoto = 0)
        : (currentPhoto = this.state.currentPhoto + 1);
    } else {
      this.state.currentPhoto === 0
        ? (currentPhoto = this.state.photosLength - 1)
        : (currentPhoto = this.state.currentPhoto - 1);
    }
    const photo = this.state.photos[currentPhoto].Foto;
    this.setState({
      currentPhoto,
      photo
    });
  };
  _fetchPhotos = async codigo => {
    if (this.state.photos.length === 0) {
      const getPhotos = await axios.get(
        `${baseUrl}/imoveis/detalhes?key=${key}&imovel=${codigo}&pesquisa={"fields":["FotoDestaque",{"Foto":["Foto"]}]}`
      );
      const response = await getPhotos.data;
      const destaque = response.FotoDestaque;
      const photos = _.values(response.Foto);
      const sortedPhotos = _.sortBy(photos, function(photo) {
        return photo.Foto === destaque ? 0 : 1;
      });
      this.setState({ photos: sortedPhotos, photosLength: photos.length });
    } else {
      return;
    }
  };
  componentDidMount() {
    const content = { ...this.state.content };
    let status = "";
    let tipo = "";
    this.props.valorProp === "ValorVenda"
      ? (status = "Venda")
      : (status = "Locação");
    content.pt.status = status;
    this.props.valorProp === "ValorVenda"
      ? (status = "Sale")
      : (status = "Rent");
    content.en.status = status;

    if (this.props.imovel.Categoria === "Apartamento") {
      content.pt.tipo = "Apartamento";
      content.en.tipo = "Apartment";
    } else if (this.props.imovel.Categoria === "Casa") {
      content.pt.tipo = "Casa";
      content.en.tipo = "House";
    } else if (this.props.imovel.Categoria === "Cobertura") {
      content.pt.tipo = "Cobertura";
      content.en.tipo = "Penthouse";
    }
    this.setState({ content, photo: this.props.imovel.FotoDestaque });
  }
  render() {
    const { imovel, i, status, valorProp, lang } = this.props;
    const { content } = this.state;
    function slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "_") // Replace spaces with -
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\-\-+/g, "_") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    }
    return (
      <div
        key={`imoveldestaque${status}${imovel.Codigo}`}
        className={
          i === 2
            ? "col-12 col-md-6 col-lg-4 d-block d-md-none d-lg-block"
            : "col-12 col-md-6 col-lg-4"
        }
      >
        <div className="imovel_box">
          <div className="imovel_box__imagem">
            <Link
              to={`/imovel/${slugify(imovel.Categoria)}_${slugify(
                imovel.Bairro
              )}/${imovel.Codigo}`}
            >
              <img src={this.state.photo} alt="" />
            </Link>
            <div
              className="imovel_box__imagem-previous"
              onMouseEnter={() => this._fetchPhotos(imovel.Codigo)}
              onClick={() => this._handlePhotoChange(imovel.Codigo, "previous")}
            >
              <FontAwesomeIcon icon={["fas", "chevron-left"]} />
            </div>
            <div
              className="imovel_box__imagem-next"
              onMouseEnter={() => this._fetchPhotos(imovel.Codigo)}
              onClick={() => this._handlePhotoChange(imovel.Codigo, "next")}
            >
              <FontAwesomeIcon icon={["fas", "chevron-right"]} />
            </div>
          </div>

          <Link
            to={`/imovel/${slugify(imovel.Categoria)}_${slugify(
              imovel.Bairro
            )}/${imovel.Codigo}`}
          >
            <div className="imovel_box__meta">
              <h3>{imovel.Bairro}</h3>
              <p>{content[lang].tipo}</p>
              <div className="imovel_box__valor">
                <small>{content[lang].status}</small>
                <br />
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(imovel[valorProp])}
              </div>
              <p className="imovel_box__caracteristicas">
                <FontAwesomeIcon icon={["fas", "bed"]} className="mr-1" />
                {imovel.Dormitorios} {content[lang].quartos}
                <FontAwesomeIcon icon={["fas", "car"]} className="mr-1 ml-3" />
                {imovel.Vagas} {content[lang].vagas}
                <FontAwesomeIcon
                  icon={["fas", "expand"]}
                  className="mr-1 ml-3"
                />
                {imovel.AreaPrivativa}m²
              </p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default ImovelBox;
