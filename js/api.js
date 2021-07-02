//Defino las variables que voy a utilizar 
const cargando_barra = document.getElementById("cargando_barra"); //Barra de cargando datos
const acordeon_data = document.getElementById("accordionFlushExample"); //Acordeon de contenidos
const result_confirmados = document.getElementById("confirmados"); //Muestra en html los valores de los confirmados
const result_fallecidos = document.getElementById("fallecidos"); //Muestra en html los valores de los fallecidos
const result_recuperados = document.getElementById("recuperados"); //Muestra en html los valores de los recuperados
const result_error = document.getElementById("error"); //Muestra en html los valores de los recuperados
//Funcion que consulta la API 
 function dataCovid()
 {
 	return fetch("https://covid19.mathdro.id/api/countries/colombia")
 	.then((response) => {
 	 	//Si la respuesta de la promesa es correcta retorno el json del resultado
 	 	if(response.ok){
 	 		return response.json();	
 	 		console.log(response);
			
	}else{
 		throw new Error("No se logro una conexion, No tenemos informacion para mostrar");
 	 	}
 	 })
 	.catch((error)=> error.message);
 }

 async function informacionCovid(){
 	//Muestro la barra de cargando
 	cargando_barra.style.display = "block";
 	//capturo la informacion del servidor 
 	try
 	{
 		//Renderizo el Html con la info para mostrar y la que debo de ocultar:
 		cargando_barra.style.display = "none"; //Ocultamos la barra de cargando 
 		acordeon_data.style.display = "block"; //Muestro el acordeo de los resultados
		const Data = await dataCovid(); //Optengo toda la data de la Api e covid 19	

 		const CasosConfirmado = Data.confirmed.value;
 		const CasosFallecidos = Data.deaths.value;
 		const CasosRecuperados = Data.recovered.value;
 		//Muestra por consola
 		console.log("CONFIRMADOS =  ", CasosConfirmado);
 		console.log("FALLECIDOS ", CasosFallecidos);
 		console.log("RECUPERADOS ", CasosRecuperados);

 		//Renderizo el html
 		result_confirmados.innerHTML = CasosConfirmado.toLocaleString();
 		result_fallecidos.innerHTML = CasosFallecidos.toLocaleString();
 		result_recuperados.innerHTML = CasosRecuperados.toLocaleString();

 	}catch(error){
 		result_error.style.display = "block"; //Muestro el mensaje de error
 		acordeon_data.style.display = "none"; //Ocultamos el acordeon por que no tiene data 
 		console.log("algo salio mal  ", error);
 	}
 }

//Llama la funcion cada 10 seg

//const interval = setInterval(informacionCovid(), 10000);
informacionCovid();


