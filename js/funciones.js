let productos = [
    {id:1, nombre:"2014 Fender Stratocaster '57 Relic Wildwood 10", estado:"Excelente",descripcion:"Hay Custom Shop genéricas y otras que realmente valen cada centavo como en el caso de esta fabulosa Wildwood 10 Fender Stratocaster Custom Shop '57 Reissue del año 2014 en un fino Black relic finish. Wow!",imagen:"https://www.springinstrumentos.com/images/productos/417/fotos/max_193419b6375a8ae4d2cd4bf840d3c026.jpg?v=1687218799", precio:4790.00, categoria:"guitarras"},
    {id:2, nombre:"1964 Fender Jazzmaster Sunburst 'Patsy Cline'", estado:"Excelente", descripcion:"El búnker tiene el honor de presentar este increíble ejemplar de la era dorada pre-CBS de Fender, hablamos de esta Fender Jazzmaster del año 1964 en su clásico 3-tone-sunburst en excelentes condiciones y 100% original.Como si esto fuera poco la guitarra perteneció durante casi toda su vida a Alvin Chandler, guitarrista de Patsy Cline, ídola y figura del Country en los 60s en Nashville.",imagen:"https://www.springinstrumentos.com/images/productos/448/fotos/max_86ca5af93150e798f99780e10b89091d.jpg?v=1692592827", precio:17990.00, categoria:"guitarras"},
    {id:3, nombre:"2006 Gibson Les Paul Ri 59 Honey", estado:"EXCELENTE", descripcion:"Gibson Les Paul Custom Shop Reissue 1959 del año 2006 en acabado Iced Tea Sunburst en excelentes condiciones, tanto estética como funcional y 100% original, sin roturas ni modificaciones.Posee una construcción de Caoba tanto en el cuerpo como en el mango con un perfil large-rounded '59. Trastera de Rosewood, 22 trastes, clavijas Gibson Deluxe, Hardware de nickel y un par de Burst-buckers sonando alucinantes.",imagen:"https://www.springinstrumentos.com/images/productos/440/fotos/max_a7e2d867ab35392d3afc78526e76b4e9.jpg?v=1691877845", precio:7490.00, categoria:"guitarras"},
    {id:4, nombre:"1967 Gibson EB-0 Cherry", estado:"Excelente", descripcion:"Este ejemplar de 1967 se encuentra en excelentes condiciones y 100% original con un cherry aun visible, pick-up y potes originales, clavijas funcionando perfectas, Brazilian Rosewood en la trastera, un mango chunky sumamente cómodo y un audio demoledor cargado de graves.", imagen:"https://www.springinstrumentos.com/images/productos/422/fotos/max_554657ff909b4e89af824a3b1cad52c7.jpg?v=1687397081", precio:3490.00, categoria:"bajos"},
    {id:5, nombre:"1976 Fender Jazzbass Black", estado:"Excelente", descripcion:"Charlemos del estilo que tiene un black-body con un maple-neck, más si le sumamos el mojo de un bajo de 47 años. Hoy queremos presentar este fantástico Fender Jazzbass del año 1976 en un black finish en muy buen estado y 100% original.",imagen:"https://www.springinstrumentos.com/images/productos/427/fotos/max_82c1ca7ed3b359b4e3fa249b4b4c90af.jpg?v=1689805769", precio:4390.00, categoria:"bajos"},
    {id:6, nombre:"Rickenbacker 4003 Jetglo 1999", estado:"Bien cuidada", descripcion:"Con una construcción de Maple en el cuerpo y mango, trastera de Rosewood y 20 trastes. Se encuentra en muy buen estado, con algunos mínimos dings del paso del tiempo.",imagen:"https://www.springinstrumentos.com/images/productos/353/fotos/max_cb4774b41ac43b4a9524f036ef25bf47.jpg?v=1667836825", precio:3290.00, categoria:"bajos"},
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
          <p class="card-text">u$s${producto.precio}</p>
          <a href="#" class="btn btn-danger" onclick="agregarProductoCarrito(${producto.id})">Agregar (+)</a>
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
        <td colspan="7" class="text-end"><button class="btn btn-danger" onclick="vaciarCarrito()" title="Vaciar Carrito">Vaciar Carrito [x]</button></td>
        </tr>`;

        productos.forEach(producto => {
            contenidoHTML += `<tr>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="64"></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle">u$s${producto.precio}</td>
            <td class="align-middle"><button class="btn btn-danger rounded-circle" onclick="decrementarCantidadProducto(${producto.id})">-</button> ${producto.cantidad} <button class="btn btn-danger rounded-circle" onclick="incrementarCantidadProducto(${producto.id})">+</button></td>
            <td class="align-middle">u$s${producto.precio * producto.cantidad}</td>
            <td class="align-middle text-end"><img src="media/trash.svg" alt="Eliminar" width="24" onclick="eliminarProductoCarrito(${producto.id})"></td>
            </tr>`;
        });

        contenidoHTML += `<tr>
        <td>&nbsp;</td>
        <td>Total</td>
        <td><b>$${sumaProductosCarrito()}</b></td>
        <td>&nbsp;</td>
        <td colspan="7" class="text-end"><button class="btn btn-danger" onclick="finalizarCompra()" title="Finalizar compra">Finalizar compra</button></td>
        </tr>
        </table>`;
    } else {
        contenidoHTML = `<div class="alert alert-danger my-5 text-center" role="alert">No se encontaron Productos en el Carrito!</div>`;
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacio!',
            footer: '<a href="index.html">Volver a la tienda?</a>'
          })
    }
    
    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const renderBotonCarrito = () => {
    let totalCarrito = document.getElementById("totalCarrito");
    totalCarrito.innerHTML = cantProductosCarrito();
}

const guardarCarritoLS = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const finalizarCompra = () => {
    Swal.fire({
        title: 'El valor es de u$s: ' + sumaProductosCarrito(),
        Text: 'Finalizar compra?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Comprar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Compra realizada!', '', 'success')
          vaciarCarrito()
        } else if (result.isDenied) {
          Swal.fire('Siga comprando', '')
        }
      })
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
    Swal.fire(
        'Agregado al carrito!',
        'Ve a chequearlo!',
        'success'
      )

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


const renderProducto = () => {
    const idProducto = cargarProductoLS();
    const producto = buscarProducto(idProducto);

    document.getElementById("imagenProducto").src = producto.imagen;
    document.getElementById("tituloProducto").innerHTML = producto.nombre;
    document.getElementById("descripcionProducto").innerHTML = producto.descripcion;
    document.getElementById("precioProducto").innerHTML = "u$s" + producto.precio;
    document.getElementById("botonAgregar").innerHTML= `<a href="#" class="btn btn-danger" onclick="agregarProductoCarrito(${producto.id})">Agregar (+)</a>`;
}

const login = async () => {
    const { value: email } = await Swal.fire({
        title: 'Inicie sesión',
        input: 'email',
        inputLabel: 'Ingrese su Email',
        inputPlaceholder: 'Ingrese su Email'
      })
      
      if (email) {
        Swal.fire(`Bienvenido/a: ${email}`)
      }
    
    }
document.querySelector("#btn-login").onclick = login;