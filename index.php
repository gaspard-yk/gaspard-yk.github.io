<!DOCTYPE html>
<html lang="ru">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Test Telegram WebApps API</title>
	<link href="style.css" rel="stylesheet" type="text/css">
</head>
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<!--Подключаем скрипт от телеграм-->
<?php
$db = new SQLITE3("test.db");
$sql = "SELECT * FROM products";
$result = $db->query($sql);
$myrow = array();
$i = 0;
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
	$myrow[$i] = $row;
	$i++;
}
// echo '<pre>';
// print_r($myrow);
// echo '</pre>';
$db->close();
?>

<body>

	<header>
		<h1>Cart for Telegram </h1>
	</header>


	<script>
		range = (<?php echo json_encode($myrow) ?>);
		window.range = range;
		console.log(range);
		console.log('1');

		function page2(type) {
			// document.getElementById('page1').style.display='none';
			if (type == 'ofd') {
				if (getComputedStyle(document.getElementById('ofd-type')).display == 'none') {
					document.getElementById('ofd-type').style.display = 'block';
					document.getElementById('ofd').innerHTML = 'Подписки ОФД: &#8657';
				} else {
					document.getElementById('ofd-type').style.display = 'none';
					document.getElementById('ofd').innerHTML = 'Подписки ОФД: &#8659';
				}
				// document.getElementById('types').innerText='ofd types';
				// let div = document.createElement('div')
				// document.body.append(div);
			} else {
				if (getComputedStyle(document.getElementById('another-type')).display == 'none') {
					document.getElementById('another-type').style.display = 'block';
					document.getElementById('another').innerHTML = 'Иные подписки: &#8657';
				} else {
					document.getElementById('another-type').style.display = 'none';
					document.getElementById('another').innerHTML = 'Иные подписки: &#8659';
				}

				// let div = document.createElement('div')
				// document.body.append(div);
			}
		}
	</script>

	<ul id="page1">
		<li>
			<button onclick="page2('ofd')" id="ofd">Подписки ОФД: &#8659</button>
			<div id="ofd-type">
				<p>проверка</p>
			</div>
		</li>

		<li>
			<button onclick="page2()" id="another">Иные подписки: &#8659</button>
			<div id="another-type">
				<p>проверка</p>
			</div>
		</li>
	</ul>
	<footer>
		<ul>
			<p>Наши контакты:</p>
			<li id="footer-li">Телефон: +7-XXX-XXX-ХХ-ХХ</li>
			<li id="footer-li">Почта: xxxxxx_xxxxx@xxxx.xx</li>
		</ul>
	</footer>

	<script>
		console.log(window.range)
		for (let i in range) {
			let div = document.createElement('div');

			// let image = document.createElement('img');
			// image.src = `data:image/png;base64,${range[i]['image']}`
			// image.setAttribute('width',300)
			// image.setAttribute('height',300)
			// div.appendChild(image);


			let name = document.createElement('p'); //создаем еще параграф 
			name.innerText = `${range[i]['name']}`;
			div.appendChild(name); //добавляем 

			let count = document.createElement('p'); //count -> rest
			count.innerText = `В наличии ${range[i]['count']} шт.`;
			div.appendChild(count); //добавляем 

			let cost = document.createElement('p'); //создаем еще параграф 
			cost.innerText = `Цена = ${range[i]['cost']}`;
			div.appendChild(cost); //добавляем 

			let plus = document.createElement('input'); //создаем кнопку
			plus.type = 'button';
			plus.setAttribute('class', 'plus')
			plus.setAttribute('value', '+')
			plus.setAttribute('id', `${range[i]['id']}`)
			//plus.id=`${range[i]['code']}`;//можно повесить обработку для каждой кнопки индивидуально здгы.onclick = function minusFunction(){}
			div.appendChild(plus); //добавляем 

			let minus = document.createElement('input'); //создаем кнопку
			minus.type = 'button';
			minus.setAttribute('class', 'minus')
			minus.setAttribute('value', '-')
			minus.setAttribute('id', `${range[i]['id']}`)
			//minus.id=`${range[i]['code']}`;//можно повесить обработку для каждой кнопки индивидуально здгы.onclick = function minusFunction(){}
			//minus.onclick = minusFunction(minus.id);
			div.appendChild(minus);

			let quantity = document.createElement('input');
			quantity.type = 'number';
			quantity.setAttribute('class', 'inputbox')
			quantity.setAttribute('value', '0')
			quantity.setAttribute('id', `c${range[i]['id']}`)
			quantity.setAttribute('name', 'quantity')
			quantity.setAttribute('readonly', true)
			quantity.setAttribute('style', "width: 25px")
			div.appendChild(quantity);
			document.getElementById('ofd-type').appendChild(div)
			// document.body.append(div);

			// range[range[i]['id']] = {
			// 	name: range[i]['name'],
			// 	cost: range[i]['cost'],
			// 	count: range[i]['cont'],
			// }; //count->resr
			// delete range[i];
		}

		let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 
		tg.expand(); //расширяем на все окно
		tg.MainButton.text = "Купить"; //изменяем текст кнопки
		tg.MainButton.textColor = "#F55353"; //изменяем цвет текста кнопки
		tg.MainButton.show()
		Telegram.WebApp.onEvent('mainButtonClicked', function() {
			if (Object.keys(cart).length == 0) {
				return;
			}
			let sumprice = 0;
			let cartstring = "";
			for (let id in cart) {
				sumprice = sumprice + cart[id]['count'] * cart[id]['cost'];
				cartstring = cartstring + "\n name " + cart[id]['name'] + " count " + cart[id]['count'] + " cost " + cart[id]['cost'];
			}
			tg.sendData("sum = " + sumprice + "\n" + cartstring); //при клике на основную кнопку отправляем данные в строковом виде}
		});
	</script>

</body>

</html>