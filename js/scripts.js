function mostrarPagina(numero) {
	switch (numero) {
		case 1:
			window.location.href = 'pagina_1.html';
			break;
		case 2:
			window.location.href = 'pagina_2.html';
			break;
		case 3:
			window.location.href = 'pagina_3.html';
			break;
		case 4:
			window.location.href = 'index.html';
			break;
		default:
			alert("Página não encontrada");
			break;
	}
}

function selecionarOpcao() {
	var obj = document.getElementById("mySelect");
	document.getElementById("nome").innerHTML =
		obj.options[obj.selectedIndex].text
	switch (obj.options[obj.selectedIndex].text) {
		case "Bulbassauro":
			document.getElementById('myImage').src = 'assets/001.png'
			document.getElementById("numero").innerHTML = 'Nº 001';
			document.getElementById("tipo").innerHTML = 'Grama';
			document.getElementById("altura").innerHTML = '0,7 m';
			document.getElementById("peso").innerHTML = '6,9 kg';
			break;
		case "Charmander":
			document.getElementById('myImage').src = 'assets/004.png';
			document.getElementById("numero").innerHTML = 'Nº 004';
			document.getElementById("tipo").innerHTML = 'Fogo';
			document.getElementById("altura").innerHTML = '0,6 m';
			document.getElementById("peso").innerHTML = '8,5 kg';
			break;
		case "Squirtle":
			document.getElementById('myImage').src = 'assets/007.png';
			document.getElementById("numero").innerHTML = 'Nº 007';
			document.getElementById("tipo").innerHTML = 'Água';
			document.getElementById("altura").innerHTML = '0,5 m';
			document.getElementById("peso").innerHTML = '9,0 kg';
			break;
		case "Pikachu":
			document.getElementById('myImage').src = 'assets/025.png';
			document.getElementById("numero").innerHTML = 'Nº 025';
			document.getElementById("tipo").innerHTML = 'Elétrico';
			document.getElementById("altura").innerHTML = '0,4 m';
			document.getElementById("peso").innerHTML = '6 kg';
			break;
		default:
			alert("Página não encontrada");
			break;
	}
}