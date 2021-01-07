<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>ML Accuracy Calculator</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<style>
body{
	background-image: url("bgside1.png"),url("bgside2.png"),url("bacg.png");
	background-repeat:repeat-y,repeat-y,no-repeat;
	background-position: left,right,center bottom 90%;
	background-size:10%,10%,90%;
	background-color: #000000;
}
.row-select {
	display:grid;
	grid-template-columns: auto auto auto;
	padding:5px;
	width:30%;
	margin:0 auto auto auto;
}
#content {
	background-color:rgb(245, 163, 76,0.8);
	width:60%;
	margin:auto;
	border: 5px solid #f5bc4c;
	border-radius: 15px;
}
.row-mob {
	display:grid;
	grid-template-columns: auto auto;
	padding:5px;
	width:40%;
	margin:auto;
}
.item {
	border: 2px solid;
	padding: 10px;
}
.row-char {
	border: 2px solid;
	padding: 5px;
}
</style>
		<script>
			function dmgType(type) {
				if(type == 'INT:')
					document.getElementById("luk").disabled=false;
				else
					document.getElementById("luk").disabled=true;
				document.getElementById("dmgType").innerHTML=type;
			}
			function worldSelect(world){
				alert(world);
			}
		</script>
		
</head>
	<body>
		<div id="content">
			<div class="row-select">
				<div class="row-char">
					<fieldset>
					<legend>Character Stats</legend>
						<label for="level">Level:</label>
						<input type="number" id="level" min="1" max ="200">
						<br>
						<input type="radio" id="physical" name="type" onclick="dmgType('ACC:')" checked>
						<label for="physical">Physical</label>
						<br>
						<input type="radio" id="magical" name="type" onclick="dmgType('INT:')">
						<label for="magical">Magical</label>
						<br>
						<label for="mainstat" id="dmgType">ACC:</label>
						<input type="number" id="mainstat" min="4" max ="999">
						<br>
						<label for="luk" id="dmgType">LUK:</label>
						<input type="number" id="luk" disabled="true" min="4" max ="999">
					</fieldset>
				</div>
				<div class="item">
					<fieldset>
					<legend>Areas</legend>
					<select size="7" class="areas" onchange="worldSelect(this.value)">
						<option value="all">All Worlds</option>
						<option value="Bosses">Bosses</option>
						<option value="Aqua">Aqua Road</option>
						<option value="China">China</option>
						<option value="LudusLake">LudusLake</option>
						<option value="Masteria">Masteria</option>
						<option value="Minar">Minar</option>
						<option value="MuLung">Mu Lung</option>
						<option value="Neotokyo">Neotokyo</option>
						<option value="Nihal">Ariant/Magatia</option>
						<option value="Orbis/El Nath">Orbis/El Nath</option>
						<option value="PQ">PQ/Job</option>
						<option value="Singapore">Singapore</option>
						<option value="Taiwan">Taiwan</option>
						<option value="Thailand">Thailand</option>
						<option value="ToT">Temple of Time</option>
						<option value="VicIsland">Victoria Island</option>
						<option value="Zipangu">Zipangu</option>
					</select>
					</fieldset>
				</div>
				<div class="row-char">
					<fieldset>
					<legend>Mob</legend>
						<select size="7" name="mobs" id="mobs">
							<option>Please select a world</option>
						</select>
					</fieldset>
				</div>
			</div>		
		</div>
	</body>

</html>