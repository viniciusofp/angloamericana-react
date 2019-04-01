import React, { Component } from "react";
import { strings } from "../initialState";
import logowhite from "../assets/logowhite.png";
// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab, fas);

class Footer extends Component {
  state = {};
  render() {
    const { lang } = this.props;
    const { menu } = strings;
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <img src={logowhite} alt="" />
            </div>
            <div className="col-md-6 col-xl-3">
              <ul className="list-unstyled footer__menu">
                {menu[lang].map(item => {
                  return (
                    <li key={`menu${item.name}`} className="list-unstyled">
                      <a href="#">{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-md-6 col-xl-3 footer__contact">
              <p>+55 (11) 3887-4555 fale@angloamericana.com.br</p>
              <p>
                Av. República do Líbano, nº 1190 Vila Nova Conceição - São Paulo
                CRECI 6975J
              </p>
            </div>
            <div className="col-md-6 col-xl-3 footer__social">
              <span>
                <FontAwesomeIcon icon={["fas", "phone"]} />
                <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                <FontAwesomeIcon icon={["fab", "instagram"]} />
                <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
                <FontAwesomeIcon icon={["fab", "google-plus-g"]} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
