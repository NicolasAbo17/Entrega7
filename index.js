const axios = require("axios");

var proveedores;
axios
  .get(
    "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
  )
  .then((data) => {
    proveedores = data;
  });

var clientes;
axios
  .get(
    "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
  )
  .then((data) => {
    clientes = data;
  });

const fs = require("fs");
const http = require("http");
var url = require("url");

var finArchivo =
  '</main>\
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"  integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"\
      crossorigin="anonymous"></script>\
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"\
      crossorigin="anonymous"></script>\
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"\
      crossorigin="anonymous"></script>\
      </body>\
      </html>';

http
  .createServer(function (req, res) {
    let path = url.parse(req.url).pathname;

    if (path === "/api/proveedores") {
      fs.readFile("proveedores.html", (error, data) => {
        if (error) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end("ERROR DE LECTURA");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.write("<h1>Lista de proveedores</h1>");
          res.write(
            '<table class="table table-striped">\
        <thead>\
          <tr>\
              <th>ID</th><th>NOMBRE</th><th>CONTACTO</th>\
          </tr>\
        </thead>'
          );
          for (let proveedor of proveedores) {
            res.write(
              `<tr><td>${proveedor.idproveedor}</td><td>${proveedor.nombrecompania}</td><td>${proveedor.nombrecontacto}</td></tr>`
            );
          }
          res.end(finArchivo);
        }
      });
    } else if (path === "/api/clientes") {
      darClientes().then((datos) => {});
      fs.readFile("clientes.html", (error, data) => {
        if (error) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end("ERROR DE LECTURA");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.write("<h1>Lista de clientes</h1>");
          res.write(
            '<table class="table table-striped">\
            <thead>\
              <tr>\
                  <th>ID</th><th>Nombre</th><th>Contacto</th>\
              </tr>\
            </thead>'
          );
          for (let cliente of clientes)
            res.write(
              `<tr><td>${dato.idCliente}</td><td>${dato.NombreCompania}</td><td>${dato.NombreContacto}</td></tr>`
            );
          res.end(finArchivo);
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("LA PÁGINA NO EXISTE");
    }
  })
  .listen(8081);
