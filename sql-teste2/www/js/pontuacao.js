(function( $, undefined ) {
	$( document ).bind( "pagecreate", function( e ) {
		$( "#append", e.target ).on( "click", function( e ) {
		$el = $( "<input type='text' placeholder='0.00' id='widget'" + "'></input><br>" );
		$( "#my-controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
		});
	});
})( jQuery );// JavaScript Document
$(document).ready(function() {
	$('#manobras').live("swipeleft", function(){																 
		$.mobile.changePage("#dadosManobras", "slidefade", false, false);
		});
	$('#dadosManobras').live("swiperight", function(){
		$.mobile.changePage("#manobras", "slidefade", false, false);
		});
		
	$('#qualidade').live("swipeleft", function(){																 
		$.mobile.changePage("#dadosQualidade", "slide", false, true);
		});		
	$('#dadosQualidade').live("swiperight", function(){
		$.mobile.changePage("#qualidade", "slide", true, true);
		});
	
	$('#pontuacoes').live("swipeleft", function(){																 
		$.mobile.changePage("#dadosPontuacoes", "slide", false, true);
		});		
	$('#dadosPontuacoes').live("swiperight", function(){
		$.mobile.changePage("#pontuacoes", "slide", true, true);
		});
	 });
$(document).ready(function () {
	/* dispara o evento da div id */
	$("#criatreino").click(function() {
	    var chkArray = [];
	
	/* verifica as checkboxs selecionadas e inicia um array com os values*/
	$("#checkboxlist input:checked").each(function() {
		chkArray.push($(this).val());
	});
	
	/* array separado por virgula */
	var selected;
	selected  = chkArray.join(',');
	if(selected.length > 1){
		alert(selected);	
		alert($('input[name=matriztreino]:checked').val());
		if($('input[name=matriztreino]:checked').val() == "manobras"){
			$.mobile.changePage("#manobras", "turn", true, true);
		}
		if($('input[name=matriztreino]:checked').val() == "pontuacoes"){
			$.mobile.changePage("#pontuacoes", "turn", true, true);
		}
		if($('input[name=matriztreino]:checked').val() == "qualidade"){
			$.mobile.changePage("#pontuacoes", "turn", true, true);
		}	
	}
	else{
		alert("Nenhum atleta selecionado");	
	}
	});
});
function spanManobras(man) {
	var m = man.value;
    document.getElementById("man").innerHTML = m;
}

function spanQualidade(qua) {
	var q = qua.value;
    document.getElementById("qua").innerHTML = q;
}

