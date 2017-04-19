// dana jest funkcja f:[0,1]x[0,1] -> B 
// taka, że f(x,y) = true wtw, gdy (x,y) e A . 
// Oblicz pole figury na postawie wylosowanych losowo punktow 
	
let n = 10000000, // ilosc punktow do wygenerowania
	// [a,a]x[b,b] => przedział całkowania -> kwadrat by latwo obliczyc calke oznaczona Riemana
	a = 0,
	b = 1,
	// pkt x0,y0 srodka kola -> promień = 0.5
	x0 = 0.5,
	y0 = 0.5,
	r = 0.5;

let f = (x,y) => {

	// przesuwam wzgledem a,b - dostrajam do mojego przedzialu

	x = a + (b - a) * x;
	y = a + (b - a) * y;

	// Pole kola (x-x0)^2 + (y-y0)^2 = r^2 => korzystam z wzoru skroconego mnozenia

	let x2 = x*x - 2*x*x0 + x0*x0,
		y2 = y*y - 2*y*y0 + y0*y0,
		r2 = r * r;

	// no i jezeli wylosowany punkt nalezy do okregu to 1, 0 gdy nie nalezy
	return ( x2 + y2 ) <= r2 ? 1 : 0
}

// Step 1 => losujem niezaleznie liczby z rozkladu jednostajnego U[0,1] - Math.random() 

function generateRandomPoints(){
	let points = [];
	for( let i = 0 ; i < n ; i++ ){
		points.push({
			x: Math.random(), // Przedział [0-1]
			y: Math.random()
		})
	}
	return points;
}

let data = generateRandomPoints();

// Step 3 => Ustalam przybliżoną wartośc pola => Pole Prostokata / Całka === n /pkt w okregu

let punkty = data.reduce( (prev, curr, id, arr) => { 
		return prev + f( curr.x, curr.y ) 
	}, 0);

let pole =  ( b - a ) * ( b - a ) 

let calka = Math.abs( pole * punkty/n );

console.log("\nIlość pkt która trafiła do koła ", punkty, " / ", n);
console.log("\nPrzybliżone Pole", calka);
console.log("\nDokładne Pole wyliczone z PI : ", Math.PI*0.5*0.5 / 1, '\n')
