let productos = [
    {id:1, nombre:"2014 Fender Stratocaster '57 Relic Wildwood 10", estado:"Excelente",descripcion:"Hay Custom Shop genéricas y otras que realmente valen cada centavo como en el caso de esta fabulosa Wildwood 10 Fender Stratocaster Custom Shop '57 Reissue del año 2014 en un fino Black relic finish. Wow!",imagen:"https://www.springinstrumentos.com/images/productos/417/fotos/max_193419b6375a8ae4d2cd4bf840d3c026.jpg?v=1687218799", precio:4790.00, categoria:"guitarras"},
    {id:2, nombre:"1964 Fender Jazzmaster Sunburst 'Patsy Cline'", estado:"Excelente", descripcion:"El búnker tiene el honor de presentar este increíble ejemplar de la era dorada pre-CBS de Fender, hablamos de esta Fender Jazzmaster del año 1964 en su clásico 3-tone-sunburst en excelentes condiciones y 100% original.Como si esto fuera poco la guitarra perteneció durante casi toda su vida a Alvin Chandler, guitarrista de Patsy Cline, ídola y figura del Country en los 60s en Nashville.",imagen:"https://www.springinstrumentos.com/images/productos/448/fotos/max_86ca5af93150e798f99780e10b89091d.jpg?v=1692592827", precio:17990.00, categoria:"guitarras"},
    {id:3, nombre:"Relic W20 LTD 58 Special", estado:"Bien cuidada", descripcion:"Guitarra Electrica | Stratocaster | Relic W20 LTD 58 Special | RWN | SSS | c/Estuche Deluxe | India Ivory",imagen:"https://myscustomshoptienda.com.ar/24809-large_default/923-1011-944-923-1011-944.jpg", precio:2899.00, categoria:"guitarras"},
    {id:4, nombre:"American Original '60S", estado:"Excelente", descripcion:"Bajo Electrico | Jazz Bass | American Original '60S | 4C | RWN | Estuche rígido de estilo vintage | Sunburst", imagen:"https://myscustomshoptienda.com.ar/20411-large_default/019-0130-800-019-0130-800.jpg", precio:3099.00, categoria:"bajos"},
    {id:5, nombre:"Fender Coronado Bass", estado:"Excelente", descripcion:"Bajo Electrico | Coronado Bass | 4C | RWN | 1/2 caja | 2 x HB | Candy Apple Red",imagen:"https://myscustomshoptienda.com.ar/8768-large_default/024-3200-509-024-3200-509.jpg", precio:3000.00, categoria:"bajos"},
    {id:6, nombre:"Player Series Mexico Jazz Bass", estado:"Bien cuidada", descripcion:"Bajo Electrico | Jazz Bass | Player Series | 4C | PFN | Sunburst",imagen:"https://myscustomshoptienda.com.ar/20379-large_default/player-series-mexico-jazz-bass-014-9903-500.jpg", precio:2100.00, categoria:"bajos"},
    {id:7, nombre:"Elixir Strings", estado:"Nuevas", descripcion:"Acoustic 80/20 Bronze with NANOWEB Coating - Light Guitar Strings (.012-.053)",imagen:"https://m.media-amazon.com/images/I/91DAabD2cJL._AC_SL1500_.jpg", precio:50.00, categoria:"cuerdas"},
    {id:8, nombre:"Encordado Guitarra Eléctrica Magma Acero 013/060 Heavy", estado:"Nuevas", descripcion:"Encordado Magma nuevo 0.13",imagen:"https://http2.mlstatic.com/D_NQ_NP_2X_932036-MLU54985896177_052023-F.webp", precio:5.00, categoria:"cuerdas"},
];

const guardarProductosLS = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const cargarProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const renderProductos = () => {
    const productos = cargarProductosLS();
    let contenidoHTML = "";

    productos.forEach(producto => {
        contenidoHTML += `<div class="col-md-3 mb-5 text-center"
        <div class="card">
        <a href="producto.html" onclick="guardarProductoLS(${producto.id})"><img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}"></a>
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <a href="#" class="btn btn-warning" onclick="agregarProductoCarrito(${producto.id})">Agregar (+)</a>
        </div>
        </div>
        </div>`;
    });

    document.getElementById("productos").innerHTML = contenidoHTML;
}

const renderCarrito = () => {
    const productos = cargarCarritoLS();
    let contenidoHTML;

    if (cantProductosCarrito() > 0) {
        contenidoHTML = `<table class="table">
        <tr>
        <td colspan="7" class="text-end"><button class="btn btn-warning" onclick="vaciarCarrito()" title="Vaciar Carrito">Vaciar Carrito [x]</button></td>
        </tr>`;

        productos.forEach(producto => {
            contenidoHTML += `<tr>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="64"></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle">${producto.calorias} kcal</td>
            <td class="align-middle">$${producto.precio}</td>
            <td class="align-middle"><button class="btn btn-warning rounded-circle" onclick="decrementarCantidadProducto(${producto.id})">-</button> ${producto.cantidad} <button class="btn btn-warning rounded-circle" onclick="incrementarCantidadProducto(${producto.id})">+</button></td>
            <td class="align-middle">$${producto.precio * producto.cantidad}</td>
            <td class="align-middle text-end"><img src="images/trash.svg" alt="Eliminar" width="24" onclick="eliminarProductoCarrito(${producto.id})"></td>
            </tr>`;
        });

        contenidoHTML += `<tr>
        <td>&nbsp;</td>
        <td>Total</td>
        <td><b>$${sumaProductosCarrito()}</b></td>
        <td>&nbsp;</td>
        </tr>
        </table>`;
    } else {
        contenidoHTML = `<div class="alert alert-warning my-5 text-center" role="alert">No se encontaron Productos en el Carrito!</div>`;
    }
    
    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const guardarCarritoLS = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const guardarProductoLS = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const cargarProductoLS = () => {
    return JSON.parse(localStorage.getItem("producto")) || [];
}

const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
}

const agregarProductoCarrito = (id) => {
    const carrito = cargarCarritoLS();

    if (estaEnElCarrito(id)) {
        const producto = carrito.find(item => item.id === id);
        producto.cantidad += 1;
    } else {
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        carrito.push(producto);
    }

    guardarCarritoLS(carrito);
    renderBotonCarrito();
}

const eliminarProductoCarrito = (id) => {
    const carrito = cargarCarritoLS();
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    guardarCarritoLS(nuevoCarrito);
    renderCarrito();
    renderBotonCarrito();
}

const incrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);
    producto.cantidad += 1;
    guardarCarritoLS(carrito);
    renderCarrito();
    renderBotonCarrito();
}

const decrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);

    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
        guardarCarritoLS(carrito);
        renderCarrito();
        renderBotonCarrito();
    } else {
        eliminarProductoCarrito(id);
    }
}

const buscarProducto = (id) => {
    const productos = cargarProductosLS();
    let producto = productos.find(item => item.id === id);

    return producto;
}

const estaEnElCarrito = (id) => {
    const productos = cargarCarritoLS();

    return productos.some(item => item.id === id);
}

const cantProductosCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0);
}

const sumaProductosCarrito = () => {
    const carrito = cargarCarritoLS();

    return carrito.reduce((acumulador, item) => acumulador += item.precio * item.cantidad, 0);
}

const renderBotonCarrito = () => {
    let totalCarrito = document.getElementById("totalCarrito");
    totalCarrito.innerHTML = cantProductosCarrito();
}

const renderProducto = () => {
    const idProducto = cargarProductoLS();
    const producto = buscarProducto(idProducto);

    document.getElementById("imagenProducto").src = producto.imagen;
    document.getElementById("tituloProducto").innerHTML = producto.nombre;
    document.getElementById("caloriasProducto").innerHTML = producto.calorias + " kcal";
    document.getElementById("descripcionProducto").innerHTML = producto.descripcion;
    document.getElementById("precioProducto").innerHTML = "$" + producto.precio;
    document.getElementById("botonAgregar").innerHTML= `<a href="#" class="btn btn-warning" onclick="agregarProductoCarrito(${producto.id})">Agregar (+)</a>`;
}