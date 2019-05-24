//Add to array if string does not exist with case insensitive
Array.prototype.uniqueAddCI = function(elToAdd){
	const elIndex = this.findIndex(e => e.toLowerCase() === elToAdd.toLowerCase());
	(elIndex === -1)? this.push(elToAdd) : console.log("Element: '" + elToAdd + "' alredy exists");
}
//First array letter will be Uppercase, and all the rest lowercase
Array.prototype.rightCaser = function(){
	for(let i = 0 ; i < this.length ; i++){
		this[i] = this[i].substr(0, 1).toUpperCase() + this[i].substr(1).toLowerCase();
	}
}