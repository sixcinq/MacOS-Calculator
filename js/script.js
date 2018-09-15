//Ensure the DOM is ready.  
//Shorthand way to type this is $(function() {
	$( document ).ready(function() {
		//Make Calculator draggable like a real calculator
		$( "#calculator" ).draggable();
		var num1 = num2 = oper = total = '';
		var updatedLast = eventFlag = '';
	
		// Click Event for the val class
		$(".val").click(function(e){
			// Prevent the link from acting like a link
			e.preventDefault();
	
			//Change the clear button to Cx
			$(".clear").html("C");
			if (eventFlag == "equal") {
				num1 = num2 = oper = eventFlag = '';
			}
			//get the link's href value
			var inputVal = $(this).val(); 
			// Append the value from the href tag to the screen
			if ($.isNumeric(inputVal) || inputVal == '.') {
				if (num1 === '' || oper === ''){
					if (inputVal == '0') {
						num1 += inputVal 
					} else {
						num1 += inputVal.replace(/^0+/, '');
					}
					updatedLast = "num1";
					$(".screen").html(num1);
					$(".outcome").val(num1);
				} else {
					if (inputVal == '0') {
						num2 += inputVal 
					} else {
						num2 += inputVal.replace(/^0+/, '');
					}
					updatedLast = "num2";
					$(".screen").html(num2);
					$(".outcome").val(num2);
				}
	
			} else {
				if (num1 != '' && num2 != '') {
					total = doMath(num1, num2, oper);
					$(".screen").html(total);
					$(".outcome").val(total);
					num1 = num2 = total;
					updatedLast = "num1";
				}
				oper = inputVal;
			}
		});
	
		$(".plusminus").click(function(e){
			var currentValue = $(".outcome").val();
	
			// Prevent the link from acting like a link
			e.preventDefault();
			//Check first character of the string to see if it is a minus
			if(currentValue[0] === "-") {
				//If value is minus then slice it off to make it a positive value
				currentValue = currentValue.slice(1)
				$(".outcome").val(currentValue);
			 } else {
				//If value is a posive then add a minus in front of the number
				$(".outcome").val(currentValue.replace (/^/,'-'));
			 }
	
			 if (updatedLast == "num1"){
				num1 = $(".outcome").val();
			} else {
				num2 = $(".outcome").val();
			}
			 $(".screen").html($(".outcome").val());
		});
	
		// Click Event for the equal link button
		$(".equal").click(function(){
			total = doMath(num1, num2, oper);
			num1 = total;
			eventFlag = "equal";
			$(".screen").html(total);
			$(".outcome").val(total);
		});
	
		// Click Event for the % link button
		$(".percent").click(function(){
			// Solve the equation and put the result in hidden field
			$(".outcome").val(eval($(".outcome").val() / 10));
			// Take hidden field's value & display that value on screen
			$(".screen").html(eval($(".outcome").val() / 10));
		});
		
		// Clear the screen field
		$(".clear").click(function(){
			$(".outcome").val("");
			$(".screen").html("0");
			$(".clear").html("AC");
			num1 = num2 = oper = '';
		});
		$(".ctrls").mouseover(function (){
			$(".close a").text("X");
			$(".min a").text("-");
			$(".max a").text("+");
		}).fadeIn(300);
		$(".ctrls").mouseout(function (){
			$(".close a").text("");
			$(".min a").text("");
			$(".max a").text("");
		}).fadeIn(300);
		// Minimize the Calculator 
		$(".min").click(function(){
			$("#calculator").stop().animate({
				width: "0px", height: "0px", marginLeft: "700px", marginTop: "1000px"
			}, 500);
			setTimeout(function(){$(".calculator").css("display", "none")}, 600);
		});
	
		//Close Calculator. To reload the Calc click the browser's refresh button
		$(".close").click(function(){
			$("#calculator").css("display", "none");
		});
	
	});
	
	function doMath(num1, num2, oper){
		var total = eval(num1 + oper + num2);
		num1 = total;
		num2 = oper = '';
		return total;
	}