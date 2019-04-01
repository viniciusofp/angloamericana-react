import React, { Component } from "react";
import { Link } from "react-router-dom";
import { strings } from "../initialState";
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
    showMenu: false
  };
  _handleCollapse = () => {
    const showMenu = !this.state.showMenu;
    this.setState({ showMenu });
  };
  render() {
    const { menu } = strings;
    return (
      <div className="nav">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-auto">
              <div
                className="nav__lang"
                onClick={() => this.props.onChangeLang()}
              >
                <img
                  src={this.props.lang === "pt" ? en : pt}
                  alt=""
                  className="mr-2"
                />
                {this.props.lang === "pt" ? "English" : "Português"}
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
              <Link to="/">
                <img src={logo} alt="" className="nav__brand" />
              </Link>
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
                {menu[this.props.lang].map(item => {
                  return (
                    <li key={`menu${item.name}`} className="list-inline-item">
                      <Link to={item.value}>{item.name}</Link>
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
