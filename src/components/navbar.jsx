import React, { Component } from "react";
import en from "../assets/en.png";
import pt from "../assets/pt.png";
import logo from "../assets/logo.png";
// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab, fas);
class Navbar extends Component {
  state = {
    showMenu: false,
    menuPT: [
      { name: "Comprar" },
      { name: "Alugar" },
      { name: "Anuncia seu imóvel" },
      { name: "Administração de bens" },
      { name: "Relocation" },
      { name: "Sobre" },
      { name: "Contato" }
    ]
  };
  _handleCollapse = () => {
    const showMenu = !this.state.showMenu;
    this.setState({ showMenu });
  };
  render() {
    return (
      <div className="nav">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-auto">
              <div className="nav__lang">
                <a href="#">
                  <img src={en} alt="" className="mr-2" />
                  English
                </a>
              </div>
            </div>
            <div className="col-auto">
              <div className="nav__icons">
                <FontAwesomeIcon icon={["fas", "phone"]} />
                <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                <FontAwesomeIcon icon={["fab", "instagram"]} />
                <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                <FontAwesomeIcon icon={["fab", "google-plus-g"]} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="nav__divider" />
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-auto">
              <a href="#">
                <img src={logo} alt="" className="nav__brand" />
              </a>
            </div>
            <div
              className="col-auto nav__collapse align-self-center"
              onClick={this._handleCollapse}
            >
              <FontAwesomeIcon icon={["fas", "bars"]} />
            </div>
            <div className="col-lg-auto align-self-center">
              <ul
                className={
                  this.state.showMenu
                    ? "list-inline nav__menu show"
                    : "list-inline nav__menu"
                }
              >
                {this.state.menuPT.map(item => {
                  return (
                    <li key={`menu${item.name}`} className="list-inline-item">
                      <a href="#">{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
