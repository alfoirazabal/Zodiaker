//Add to array if string does not exist with case insensitive
Array.prototype.uniqueAddCI = function(elToAdd){
	const elIndex = this.findIndex(e => e.toLowerCase() === elToAdd.toLowerCase());
	//(elIndex === -1)? this.push(elToAdd) : console.log("Element: '" + elToAdd + "' alredy exists");
	if(elIndex === -1) this.push(elToAdd);
}
//First array letter will be Uppercase, and all the rest lowercase
Array.prototype.rightCaser = function(){
	for(let i = 0 ; i < this.length ; i++){
		this[i] = this[i].substr(0, 1).toUpperCase() + this[i].substr(1).toLowerCase();
	}
}
//Shuffle Array Fisher-Yates Algorithm
Array.prototype.shuffle = function(){
	const arrElN = this.length;
	for(let i = 0 ; i < arrElN ; i++){
		const ri1 = Math.floor(Math.random() * arrElN);
		const ri2 = Math.floor(Math.random() * arrElN);
		const rEl1 = this[ri1];
		const rEl2 = this[ri2];
		this[ri1] = rEl2;
		this[ri2] = rEl1;
	}
}
//Append Children
Object.prototype.appendChildren = function(childrenArray){
	const thisEl = this;
	childrenArray.forEach(function(child){
		thisEl.appendChild(child);
	});
}
