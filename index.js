const axios = require("axios");

var proveedores;
axios
  .get(
    "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
  )
  .then((data) => {
    for (let proveedor of data) {
      res.write(
        (proveedores += `<tr> <td>${proveedor.idproveedor}</td> <td>${proveedor.nombrecompania}</td> <td>${proveedor.nombrecontacto}</td> </tr>`)
      );
    }
  });

var clientes;
axios
  .get(
    "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
  )
  .then((data) => {
    for (let cliente of data) {
      res.write(
        (clientes += `<tr> <td>${cliente.idproveedor}</td> <td>${cliente.nombrecompania}</td> <td>${cliente.nombrecontacto}</td> </tr> `)
      );
    }
  });

const http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
  })
  .listen(8081);
