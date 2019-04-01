import React, { Component } from "react";
import DragScrollProvider from "drag-scroll-provider";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab, fas);

class FotosImovel extends Component {
  state = {};
  render() {
    const { imovel, currentPhoto, onPhotoChange, onPhotoSelect } = this.props;
    return (
      <React.Fragment>
        <div className="imovel__fotoDestaque">
          <div
            className="imovel_box__imagem-previous"
            onClick={() => onPhotoChange("previous")}
          >
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />
          </div>
          <div
            className="imovel_box__imagem-next"
            onClick={() => onPhotoChange("next")}
          >
            <FontAwesomeIcon icon={["fas", "chevron-right"]} />
          </div>
          <img src={imovel.Foto[currentPhoto].Foto} alt="" />
        </div>
        <DragScrollProvider>
          {({ onMouseDown, ref }) => (
            <div className="imovel__slider" ref={ref} onMouseDown={onMouseDown}>
              {imovel.Foto.map((foto, i) => {
                return (
                  <div
                    key={`foto${i}`}
                    onClick={() => onPhotoSelect(foto)}
                    className="imovel__slider_slide"
                  >
                    <img
                      className={currentPhoto === i ? "active" : ""}
                      src={foto.FotoPequena}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </DragScrollProvider>
      </React.Fragment>
    );
  }
}

export default FotosImovel;
