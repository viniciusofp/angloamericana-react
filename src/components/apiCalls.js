import _ from "lodash";
import axios from "axios";
import { pontos } from "../pontos";
import { campos } from "../camposImovel";
export const baseUrl = "https://angloame16738-rest.vistahost.com.br";
export const key = "7bd1ce1edbf6054a8ef2202eb9f943c7";

function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  d = Math.round(d * 1000);
  d = Math.round(d / 10) * 10;
  return d;
}
export const fetchImovel = async codigo => {
  try {
    const fieldsString = JSON.stringify(campos);
    const getImovel = await axios.get(
      `${baseUrl}/imoveis/detalhes?key=${key}&imovel=${codigo}&pesquisa={"fields":${fieldsString}}`
    );
    const imovel = getImovel.data;
    // Transforma o objeto Fotos em arranjo
    const fotos = _.values(imovel.Foto);
    // Coloca foto em destaque como a primeira do arranjo
    imovel.Foto = _.sortBy(fotos, function(foto) {
      return foto.Destaque === "Sim" ? 0 : 1;
    });

    // Transforma objeto Caracteristicas em arranjo
    let Caracteristicas = _.map(_.toPairs(imovel.Caracteristicas), d =>
      _.fromPairs([d])
    );
    // Filtra apenas Caracteristicas que constam no imóvel
    Caracteristicas = Caracteristicas.filter(c => {
      return _.valuesIn(c)[0] === "Sim";
    });
    // Transforma objetos em strings
    Caracteristicas = Caracteristicas.map((i, v) => {
      return _.keysIn(i)[0];
    });
    imovel.Caracteristicas = Caracteristicas;

    // Transforma objeto InfraEstrutura em arranjo
    let InfraEstrutura = _.map(_.toPairs(imovel.InfraEstrutura), d =>
      _.fromPairs([d])
    );
    // Filtra apenas InfraEstrutura que constam no imóvel
    InfraEstrutura = InfraEstrutura.filter(c => {
      return _.valuesIn(c)[0] === "Sim";
    });
    // Transforma objetos em strings
    InfraEstrutura = InfraEstrutura.map((i, v) => {
      return _.keysIn(i)[0];
    });
    imovel.InfraEstrutura = InfraEstrutura;

    // Cria string com endereço completo do imóvel
    const Endereco = `${imovel.TipoEndereco} ${imovel.Endereco}, ${
      imovel.Numero
    } - São Paulo, ${imovel.Bairro}`;
    imovel.Endereco = Endereco;
    // Pega coordenadas geográficas a partir de endereço
    const getCoordinates = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        Endereco
      )}&sensor=true&key=AIzaSyAly1CjP-Ek0BU7OoRfWP6-jflYyNe_h30`
    );
    const coordinates = await getCoordinates.data.results[0].geometry.location;
    imovel.Latitude = coordinates.lat;
    imovel.Longitude = coordinates.lng;

    // Filtra pontos de interesse a menos de 1500 metros do imóvel
    let Pontos = pontos.map(ponto => {
      const distancia = distance(
        parseFloat(ponto.LATITUDE),
        parseFloat(ponto.LONGITUDE),
        parseFloat(imovel.Latitude),
        parseFloat(imovel.Longitude)
      );
      if (distancia < 1000) {
        return { name: ponto.LOCAL, distance: distancia };
      }
    });
    Pontos = Pontos.filter(ponto => {
      return ponto !== undefined;
    });
    imovel.Pontos = _.orderBy(Pontos, ["distance", "name"], ["asc", "asc"]);

    console.log("FROM EXTERNAL FUNCTION", imovel);
    return imovel;
  } catch (error) {
    console.log(error.message);
  }
};

const paginacaoItems = ["pagina", "paginas", "quantidade", "total"];
const destaquesFields = [
  "AreaTotal",
  "AreaPrivativa",
  "Bairro",
  "Codigo",
  "Categoria",
  "FotoDestaque",
  "FotoDestaquePequena",
  "Dormitorios",
  "ValorLocacao",
  "ValorVenda",
  "Vagas",
  "Status"
];
const destaquesVendaFilters = {
  ExibirNoSite: "Sim",
  Status: ["Venda", "Venda e Aluguel"],
  ValorVenda: [">", 0],
  DestaqueWeb: "Sim"
};
const destaquesLocacaoFilters = {
  ExibirNoSite: "Sim",
  Status: ["Aluguel", "Venda e Aluguel"],
  ValorLocacao: [">", 0],
  DestaqueWeb: "Sim"
};
const destaquesPaginacao = { pagina: 1, quantidade: 3 };
export const fetchDestaquesVenda = async () => {
  const fields = JSON.stringify(destaquesFields);
  const paginacao = JSON.stringify(destaquesPaginacao);
  const destaquesVendaFilter = JSON.stringify(destaquesVendaFilters);
  const getDestaquesVenda = axios.get(
    `${baseUrl}/imoveis/listar?key=${key}&showtotal=1&pesquisa={"fields":${fields},"paginacao": ${paginacao},"filter":${destaquesVendaFilter},"order":{"DataHoraAtualizacao":"desc"}}`
  );
  const destaquesVendaResponse = await getDestaquesVenda;
  let destaquesVenda = _.omit(destaquesVendaResponse.data, paginacaoItems);
  destaquesVenda = _.values(destaquesVenda);
  return destaquesVenda;
};
export const fetchDestaquesLocacao = async () => {
  const fields = JSON.stringify(destaquesFields);
  const paginacao = JSON.stringify(destaquesPaginacao);
  const destaquesLocacaoFilter = JSON.stringify(destaquesLocacaoFilters);
  const getDestaquesLocacao = axios.get(
    `${baseUrl}/imoveis/listar?key=${key}&showtotal=1&pesquisa={"fields":${fields},"paginacao": ${paginacao},"filter":${destaquesLocacaoFilter}}`
  );
  const destaquesLocacaoResponse = await getDestaquesLocacao;
  let destaquesLocacao = _.omit(destaquesLocacaoResponse.data, paginacaoItems);
  destaquesLocacao = _.values(destaquesLocacao);
  return destaquesLocacao;
};
