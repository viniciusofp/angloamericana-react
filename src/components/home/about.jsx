import React, { Component } from "react";

import mapaBairros from "../../assets/mapaBairros.svg";
import clientes from "../../assets/clientes.jpg";
import logo from "../../assets/logo.png";
import anglo1 from "../../assets/anglo1.jpeg";
import anglo2 from "../../assets/anglo2.jpeg";
import anglo3 from "../../assets/anglo3.jpeg";
import anglo4 from "../../assets/anglo4.jpeg";

class About extends Component {
  state = {
    currentSlide: 1,
    slides: [{ url: anglo1 }, { url: anglo2 }, { url: anglo3 }, { url: anglo4 }]
  };
  homeSlider = 0;
  componentDidMount() {
    this.homeSlider = setInterval(() => {
      let currentSlide = this.state.currentSlide;
      const numberOfSlides = document.getElementById("homeSlider")
        .childElementCount;
      currentSlide === numberOfSlides ? (currentSlide = 1) : currentSlide++;
      this.setState({ currentSlide });
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.homeSlider);
  }

  render() {
    return (
      <div className="home__about">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 align-self-center text-center">
              <img className="home__about_mapa" src={mapaBairros} alt="" />
            </div>
            <div className="col-lg-8 col-md-6 align-self-center">
              <h2>Os melhores bairros para viver bem em São Paulo</h2>
              <p className="lead">
                Atuamos nos principais bairros nobres e regiões de escritórios
                das zonas sul e oeste, como Vila Nova Conceição, Moema,
                Ibirapuera, Jardim Luzitânia, Paraíso, Itaim, Jardins, Campo
                Belo, Alto da Boa Vista, Cidade Jardim, Vila Olímpia, Berrini,
                Faria Lima, Av. Paulista, entre outros.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 align-self-center">
              <div id="homeSlider" className="home__about_slider">
                {this.state.slides.map((slide, i) => {
                  const index = i + 1;
                  return (
                    <img
                      key={"homeSlide" + i}
                      className={
                        this.state.currentSlide === index
                          ? "home__about_slider-slide home__about_slider-slide-active"
                          : "home__about_slider-slide"
                      }
                      src={slide.url}
                      alt=""
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-lg-4 align-self-center">
              <img className="my-4" src={logo} alt="" />
              <p className="lead">
                Desde 1941 fazendo história no mercado imobiliário
              </p>
              <p>
                Altamente capacitada, nossa equipe de corretores é composta por
                profissionais certificados, multilíngues e conhecedores do
                mercado, aptos para atender as necessidades dos clientes. Link
                para a página da empresa e mais um para o serviço de
                Administração de Bens.
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-6 align-self-center">
              <h2>Lorem ipsum dolor sit amet</h2>
              <p>
                Mauris nec fringilla eros, sed congue dui. Nunc tortor sapien,
                commodo non dolor ac, dapibus ornare nibh. Donec risus ligula,
                ullamcorper at nisl quis, accumsan efficitur tortor. Vestibulum
                lobortis luctus luctus. Ut fringilla sit amet mauris nec
                pretium. Praesent laoreet nisl in sapien rhoncus sagittis. Donec
                non ligula ut dui accumsan pretium sodales ut lectus e saiba
                mais sobre o processo de Relocation.
              </p>
            </div>
            <div className="col-lg-6 align-self-center text-center">
              <img
                src={clientes}
                alt=""
                className="home__about_clientes my-5"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
