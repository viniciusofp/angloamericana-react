import React, { Component } from "react";
import axios from "axios";
import { baseUrl, key } from "../config";
import _ from "lodash";
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
    photosLength: 0
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
    console.log(this.state.photosLength, this.state.currentPhoto, currentPhoto);
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
      console.log(destaque, photos, sortedPhotos);
      this.setState({ photos: sortedPhotos, photosLength: photos.length });
    } else {
      return;
    }
  };
  componentDidMount() {
    this.setState({ photo: this.props.imovel.FotoDestaque });
  }
  render() {
    const { imovel, i, status, valorProp } = this.props;
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
            <img src={this.state.photo} alt="" />
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

          <div className="imovel_box__meta">
            <h3>{imovel.Bairro}</h3>
            <p>{imovel.Categoria}</p>
            <div className="imovel_box__valor">
              <small>{status}</small>
              <br />
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(imovel[valorProp])}
            </div>
            <p className="imovel_box__caracteristicas">
              <FontAwesomeIcon icon={["fas", "bed"]} className="mr-1" />
              {imovel.Dormitorios} Quartos
              <FontAwesomeIcon icon={["fas", "car"]} className="mr-1 ml-3" />
              {imovel.Vagas} Vagas
              <FontAwesomeIcon icon={["fas", "expand"]} className="mr-1 ml-3" />
              {imovel.AreaTotal}m²
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ImovelBox;
