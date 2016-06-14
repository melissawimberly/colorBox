$( document ).ready(function() {
	function changeColor(){
		var stepAmount   = 10;
		var colors       = {red:255, green: 255, blue: 255};
		var colorPointer = {
			red:{incrementColor:'red', decrementColors:['blue', 'green']}, 
			blue:{incrementColor:'blue', decrementColors:['red', 'green']}, 
			green:{incrementColor:'green', decrementColors:['red', 'blue']}};

		$('button').on('click', function (event) {
			var colorAdding = event.target.id;

			var incColor = colorPointer[colorAdding].incrementColor;
			colors[incColor] += stepAmount;
			colors[incColor] = check(colors[incColor], colorAdding);

			var decColors = colorPointer[colorAdding].decrementColors;
			for(var i=0; i<decColors.length; i++){
				colors[decColors[i]] -= stepAmount;
				colors[decColors[i]] = check(colors[decColors[i]]);
			};

			var rgbString = 'rgb('+ colors.red + ', ' + colors.green + ', ' + colors.blue + ')';
			$('#box').css('background-color', rgbString);

			var colorArray = [colors.red, colors.green, colors.blue];
			isDarkest(colorArray);			
		});
	};
	changeColor();


	function check(colorValue, colorAdding){
		if(colorValue>255){
			return 255;
		}
		if(colorValue< 0){
			return 0;
		}
		return colorValue;
	};

	function isDarkest(colorArray){
		var count = 0;
		var sum   = colorArray.reduce((a,b) => a+b);
		for(var i = 0; i < colorArray.length; i++){
			if(colorArray[i] == 0){
				count++;
			}

			if(count == 2 && sum == 255){
				$('#error').show();
			}else{
				$('#error').hide();
			}
		}
	}
});


