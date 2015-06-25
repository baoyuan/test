var sheet = (function(){
	var style = document.createElement('style')
	style.appendChild(document.createTextNode(''));
})

var getAbsoluteUrl = (function(){
	var a;
	return function(url){
		if(!a)
			a = document.createElement('a');
		a.herf = url;
		return a.href;
	};
})();

function once(fn, context){
	var result;
	return function(){
		if(fn){
			result = fn.apply(context||this, arguments);
			fn = null;
		}
		return result;
	};
}


function poll(fn, callback, errback, timeout, interval){
	var endTime = Number(new Date()) + (timeout || 2000);
	interval = interval || 100;
	(function p(){
		if(fn()){
			callback();
		}else if(Number(new Date()) < endTime){
			setTimeout(p, interval);
		}else{
			errback(new Error('timed out for ' + fn + ': ' + arguments));
		}
	})();
}
poll(function(){
		return document.getElementById('lightbox').offsetWidth > 0;
	},
	function(){
		//callback
	},
	function(){
		//errback
	}
);



function debounce(func, wait, immediate){
	var timeout;
	return function(){
		var context = this, args = arguments;
		var later = function(){
			timeout = null;
			if(!immediate)
				func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if(callNow)
			func.apply(context, args);
	};
}

var myEfficientFn = debounce(function(){
	//todo
	
},250);
window.addEventListener('resize', myEfficientFn);