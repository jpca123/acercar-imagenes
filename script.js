// *************** Variables globales********************
const imagen = document.querySelector('.producto-img'),
miniatura = document.querySelector('producto-miniatura'),
imagenMiniatura = document.getElementById('imagen-miniatura'),
contenedorImagen = document.querySelector('.producto-img-container')
seleccion = document.getElementById('seleccion'),
input = document.getElementById('unidad'),
file = document.getElementById('file');


// ************************Funciones*********************************
//recibe el archivo del ususario, lo valida y renderiza la imagen
function ponerImagen(e){
	let img = e.target.files[0];
	if(img.type.match(/image/i) == null) return alert('no es un archivo de imagen')
	let url = URL.createObjectURL(img);
	imagen.src = url;
	return igualarImagenes();
}

//detecta el movimiento del mouse y mueve la seleccion sobre la imagen
function mover(e){
	let x = e.clientX - contenedorImagen.getBoundingClientRect().left;
	let y = e.clientY - contenedorImagen.getBoundingClientRect().top;
	let anchoTotal = parseFloat(getComputedStyle(imagen).width.replace('px', ''));
	let proporcion = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--unidad-seleccion'))

	seleccion.style.setProperty('left', `${100 / anchoTotal * x}%`);
	seleccion.style.setProperty('top', `${100 / anchoTotal * y}%`);

	imagenMiniatura.style.setProperty('left', `-${parseFloat(seleccion.style.left.replace('%')) * proporcion}%`)
	imagenMiniatura.style.setProperty('top', `-${parseFloat(seleccion.style.top.replace('%')) * proporcion}%`)
}

function igualarImagenes(){
	imagenMiniatura.src = imagen.src;
}

//cambia el tamaño de la seleccion del ususaro
function cambiarUnidad(e){
	let valor;
	if(e.type == 'keypress'){
		valor = parseInt(e.key);
		input.value = e.key
		if(isNaN(valor)) return false;
	}else valor = e.target.value;

	if(valor > 1001){
		alert('numero demasiado grande debe, ser menor que 1000');
		input.value = '';
	} 
	if(valor < .001){
		alert('numero demasiado pequeño debe, ser mayor a 0,001');
		input.value = '';
	} 
	document.documentElement.style.setProperty('--unidad-seleccion', valor)
}

//**********Eventos DOM*********************
contenedorImagen.addEventListener('mousemove', mover)
input.addEventListener('change', cambiarUnidad)
document.addEventListener('DOMContentLoaded', igualarImagenes)

file.addEventListener('change', ponerImagen)
document.addEventListener('keydown', e=>{
	if(e.key === 'x') document.addEventListener('keypress', cambiarUnidad);
})
document.addEventListener('keyup', e=>{
	document.removeEventListener('keypress', cambiarUnidad);
})

