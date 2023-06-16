var arrV = ["VELOCIDAD","30 s.", "15 s.", "8 s.","4 s.","2 s.", "1 s.", "1/2", "1/4","1/8", "1/15", "1/30","1/60","1/125","1/250","1/500","1/1000","1/2000","1/4000"];         
			
var arrF = ["DIAFRAGMA","1", "1.4", "2","2.8","4", "5.6", "8", "11","16", "22", "32"];         

var arrIso = ["ISO","12800","6400", "3200", "1600", "800","400", "200", "100"]; 

var arrExpo = ["EXPOSICIÓN", "+5","+4","+3","+2","+1", "0", "-1", "-2","-3","-4","-5"]; 

var posExpo = 6;


function cargarValores(){



    var elementoDF = document.getElementById("df");
    var elementoV = document.getElementById("vel");
    var elementoIso = document.getElementById("is");
    var elementoExpo = document.getElementById("expo");
    
    for(var i=1;i<arrF.length;i++){ 
        elementoDF.innerHTML += "<option value='"+ i + "'>F "+arrF[i]+"</option>"
    }
    
    
    for(var i=1;i<arrV.length;i++){ 
        elementoV.innerHTML += "<option value='"+ i + "'>V "+arrV[i]+"</option>"
    }
    
    
    for(var i=1;i<arrIso.length;i++){ 
        elementoIso.innerHTML += "<option value='"+ i + "'>ISO "+arrIso[i]+"</option>"
    }
    
    
    for(var i=1;i<arrExpo.length;i++){ 
        elementoExpo.innerHTML += "<option value='"+ i + "'>" + arrExpo[i] + "</option>"
    }
    
    elementoDF.value = "7";
    elementoV.value ="11"
    //var elementoDF = parseInt(document.getElementById("df").value);
    //var elementoV = parseInt(document.getElementById("vel").value);
    elementoIso.value = arrIso.length-1;
    elementoExpo.value=posExpo;
    
    //var elementoExpo = parseInt(document.getElementById("expo").value);
    
}

function calcular(){
    var elementoDF = parseInt(document.getElementById("df").value);
    var elementoV = parseInt(document.getElementById("vel").value);
    var elementoIso = parseInt(document.getElementById("is").value);
    var elementoExpo = parseInt(document.getElementById("expo").value);
    
    var cambioDf = 0;
    var cambioV = 0;
    var cambioIso = 0;
    var cambioExpo = 0;
    
    var diferencia = elementoExpo - posExpo
    
    
    while(diferencia != 0){
        if(diferencia > 0) {
            //SUBEXPUESTO
            if(elementoV > 1 && document.getElementById("checkV").value == 'V'){
                elementoV--;
                elementoExpo--;
                cambioV++;
                diferencia = elementoExpo - posExpo
            }else if(elementoDF > 1 && document.getElementById("checkF").value == 'V') {
                elementoExpo--;
                elementoDF--;
                cambioDf++;
                diferencia = elementoExpo - posExpo
            }else if(elementoIso > 1 && document.getElementById("checkISO").value == 'V') {
                elementoIso--;
                elementoExpo--;
                cambioIso++;
                diferencia = elementoExpo - posExpo
            }else {
                diferencia = 0;
            }
        }else if(diferencia < 0){
            //SOBREEXPUESTO
            if(elementoV < arrV.length-1 && document.getElementById("checkV").value == 'V'){
                elementoV++;
                elementoExpo++;
                cambioV--;
                diferencia = elementoExpo - posExpo
            }else if(elementoDF < arrF.length-1 && document.getElementById("checkF").value == 'V') {
                elementoExpo++;
                elementoDF++;
                cambioDf--;
                diferencia = elementoExpo - posExpo
            }else if(elementoIso < arrIso.length-1 && document.getElementById("checkISO").value == 'V') {
                elementoIso++;
                elementoExpo++;
                cambioIso--;
                diferencia = elementoExpo - posExpo
            }else {
                diferencia = 0;
            }
        }
    }
    
    document.getElementById("resDf").innerHTML = getValor("F " +  arrF[elementoDF],cambioDf);	
    document.getElementById("resVel").innerHTML = getValor("V " + arrV[elementoV],cambioV);	
    document.getElementById("resIso").innerHTML = getValor("ISO " + arrIso[elementoIso],cambioIso);
    document.getElementById("resExpo").innerHTML = getValor(arrExpo[elementoExpo],cambioExpo);
}

function getValor(valor, modificado){
    if(modificado != 0){
        return "<b>" +  valor + " (" + modificado + ")</b>";
    }else{
        return valor;
    }
}