let signs = [{"Sign": "Aries", "Characteristics": ["Corajudo","Confainzudo","Entusiasta","Idealista","Pasional","Creativo","Enojadizo","Temperamental","Optimista","Agresivo","Dinamico","Impaciente","Inteligente","Honesto","Energético","Determinado","Impulsivo",]},{"Sign": "Tauro", "Characteristics": ["Paciente","Conservador","Confiable","Devoto","Posesivo","Práctico","Testarudo","Realista","Leal","Estable","Bajado a tierra","Responsable","Intransigente","Practico",]},{"Sign": "Géminis", "Characteristics": ["Gentil","Indecisivo","Social","Comunicativo","Inconsistente","Pensante","De rápido aprendizaje","Intelectual","Curioso","Analítico","Amistoso","Adaptativo","Superficial","Racional","Nervioso",]},{"Sign": "Cáncer", "Characteristics": ["Tenaz","Sensitivo","Imaginativo","Emocional","Leal","Temperamental","Íntimo","Desconfiado","Intuitivo","Manipulador","Pesimista","Simpático","Inseguro","Persuasivo","Misterioso",]},{"Sign": "Leo", "Characteristics": ["Alegre","Idealista","Pasional","Generoso","Creativo","Testarudo","Humorístico","Temperamental","Inflexible","Dinamico","Arrogante","Inteligente","Vago","Egocéntrico","Energético","Bondadoso",]},{"Sign": "Virgo", "Characteristics": ["Conservador","Práctico","Demasiado Crítico","Realista","Leal","Tímido","Bueno","Estable","Bajado a tierra","Trabajador","Analítico","Inquitante",]},{"Sign": "Libra", "Characteristics": ["Indecisivo","Social","Comunicativo","Cooperativo","Pensante","Cortés","Gusta de Victimizarse","Intelectual","Analítico","Imparcial","Diplomático","Evita la confrontación","Amistoso","Superficial","Racional",]},{"Sign": "Escorpio", "Characteristics": ["Sensitivo","Pasional","Testarudo","Valiente","Emocional","Celoso","Ingenioso","Íntimo","Desconfiado","Intuitivo","Violento","Amigo Verdadero","Reservado","Misterioso",]},{"Sign": "Sagitario", "Characteristics": ["Idealista","Pasional","Generoso","Poco diplomático","Creativo","Temperamental","Prometedor e Incumplidor","Buen sentido del humor","Dinamico","Impaciente","Inteligente","Energético",]},{"Sign": "Capricornio", "Characteristics": ["Espera lo peor","Conservador","Práctico","Realista","Leal","Se autocontrola","Altanero","Estable","Sabelotodo","Bajado a tierra","Disciplinado","Responsable","Implacable","Buen administrador",]},{"Sign": "Acuario", "Characteristics": ["Independiente","Distante","Social","Comunicativo","Pensante","Temperamental","Intelectual","Analítico","Intransigente","Original","Progresista","Humanitario","Amistoso","Superficial","Racional",]},{"Sign": "Piscis", "Characteristics": ["Gentil","Artístico","Sensitivo","Musical","Deseos de escapar de la realidad","Emocional","Íntimo","Triste","Gusta de Victimizarse","Intuitivo","Compasivo","Miedoso","Sabio","Demasiado confianzudo","Misterioso",]},];
let chars = [];
signs.forEach(function(sign){
	sign.Characteristics.forEach(function(char){
		chars.uniqueAddCI(char);
	});
});
chars.shuffle();
chars.forEach(function(char, elN){
	//Create characteristic and selectors row
	let row = document.createElement("tr");
	let charCell = document.createElement("th");
	let scoreCells = [];
	scoreCells.push(document.createElement("td"));
	scoreCells.push(document.createElement("td"));
	scoreCells.push(document.createElement("td"));
	scoreCells.push(document.createElement("td"));
	
	charCell.innerHTML = char;
	
	for(let i = 0 ; i < 4 ; i++){
		let radioButton = document.createElement("input");
		radioButton.setAttribute("type", "radio");
		radioButton.setAttribute("name", elN);
		if(i === 0) radioButton.setAttribute("checked", "checked");
		scoreCells[i].appendChild(radioButton);
	}
	
	row.appendChildren(
	[
		charCell,
		scoreCells[0],
		scoreCells[1],
		scoreCells[2],
		scoreCells[3]
	]);
	
	document.getElementById("selectors").appendChild(row);
});

document.getElementById("calcChance").addEventListener("click", chanceCalculator, false);

function chanceCalculator(){
	
	const selectorScoresMotherBody = document.getElementById("selectors");
	let charsScores = [];
	let signChances = [];
	let finalChances = [];
	signs.forEach(function(sign){
		signChances.push({
			"Sign": sign.Sign,
			"TotalPossibleChances": (sign.Characteristics.length * 3)
		});
	});
	console.log(signChances);
	for(let i = 0 ; i < selectorScoresMotherBody.children.length ; i++){
		let score;	//Number between 0 and 3 (<4)
		for(let j = 0 ; j < 4 ; j++){
			if(selectorScoresMotherBody.children[i].children[j+1].children[0].checked){
				score = j;
			}
		}
		charsScores.push({
			"Char": selectorScoresMotherBody.children[i].children[0].innerHTML,
			"Score": score
		});
	}
	signs.forEach(function(sign){
		let currSignScore = 0;
		sign.Characteristics.forEach(function(char){
			currSignScore += charsScores.filter(e => e.Char === char)[0].Score;
		});
		const signTotalPossibleChances = signChances.filter(e => e.Sign === sign.Sign)[0].TotalPossibleChances;
		finalChances.push({
			"Sign": sign.Sign,
			"Percentage": (currSignScore / signTotalPossibleChances * 100).toFixed(2)
		});
	});
	chancesDisplayerAndSorter(finalChances);
	
	function chancesDisplayerAndSorter(finalChances){
		const mainChancesTable = document.createElement("table");
		finalChances.sort(function(a, b){
			return b.Percentage - a.Percentage;
		});
		finalChances.forEach(function(signChance){
			const signChanceRow = document.createElement("tr");
			const signNameCell = document.createElement("th");
			const signChanceCell = document.createElement("td");
			signNameCell.innerHTML = signChance.Sign;
			signChanceCell.innerHTML = signChance.Percentage + "%";
			signChanceRow.appendChildren([
				signNameCell,
				signChanceCell
			]);
			mainChancesTable.appendChild(signChanceRow);
		});
		document.getElementById("chancesTable").innerHTML = "";
		document.getElementById("chancesTable").appendChild(mainChancesTable);
	}
	
}
	
