const Discord = require("discord.js");
const client = new Discord.Client();
const token = "";

//gbl
let gbl_botscommentedit = '';

//bots message function
const botscomment = (comment, message) => {
	message.channel.send({
		embed:{
			color:0xFF559E,
			description:comment,
		}
	});
	return;
};
//random function
const botsrandom = (min, max) => {
	let a = () => {
		Math.floor(Math.random() * (max - min + 1) + min);
	};
	return a;
};
//random array function
const botsrandomarray = (ary) => {
	for(let a = ary.length - 1; a > 0; a--){
		let b = Math.floor(Math.random() * (a + 1));
		let c = ary[a];
		ary[a] = ary[b];
		ary[b] = c;
	}
	return ary;
}
//team array function
const botsteamarray = (ary, num) => {
	let a = [];
	let b = 0;
	for(let c = 0; c < num; c++){
		a[c] = '';
	}
	for(let c = 0; c < ary.length; c++){
		a[b] += ary[c] + '\n';
		b++;
		if(b == num){
			b = 0;
		}
	}
	return a;
}
//create array function
const botscreatearray = (ary, num) => {
	for(let a = 0; a < num; a++){
		ary[a] = '';
	}
};
//create keywords function
const botskeywords = (msg ,cmd) =>{
	let a = msg.split(cmd);
	let b = a[1].split(',');
	return b;
};
//check num function
const checkkeynum = (key) =>{
	let regex = /^[0-9]{1}$/;
	return regex.test(key);
}
//icons abc
const iconsabc = (num) =>{
	let a = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	let b = ':regional_indicator_' + a[num] + ':';
	return b;
}
//icons 123
const iconsnum = (num) =>{
	let a = ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣'];
	let b = a[num];
	return b;
}

//起動
client.on("ready", () => {
	console.log(`Botを起動しました`);
});

//アンケート
let gbl_votenum = 0;
client.on('message', async message => {
	if(message.author.bot){
		if(gbl_botscommentedit == 'vote'){
			gbl_botscommentedit = '';
			for(let i=0; i<gbl_votenum; i++){
				await message.react(iconsnum(i));
			}
			gbl_votenum = 0;
		}
	}else{
		if(message.content.startsWith("!vote ")) {
			let select = botskeywords(message.content,'!vote ');
			let output = select[0] + '\n';
			gbl_votenum = select.length - 1;
			for(let i=1; i<select.length; i++){
				output += iconsnum(i-1) + ' ' + select[i] + '\n';
			}
			gbl_botscommentedit = 'vote';
			botscomment(output, message);
		}
	}
});


//チーム
let gbl_member = [];
gbl_member.name = [];
gbl_member.id = [];
let gbl_member_edit_id = [];
let gbl_member_edit_area = '';
//member clear
const memberclear = () =>{
	gbl_member.name = [];
	gbl_member.id = [];
}
//member name registry
const membernamereg = (name) =>{
	gbl_member.name = name;
}
//member id registry
//const memberidreg = (id) =>{
//	gbl_member.id = id;
//}
//member id registry
const memberidreg = (name,msg) =>{
	gbl_member.id[name] = msg.id;
}
//member function
const memberteam = (num, mm, op, msg) =>{
	if(checkkeynum(num)){
		num = parseInt(num);
		let team = [];
		memberclear();
		membernamereg(mm);
		mm = botsrandomarray(mm);
		team = botsteamarray(mm,num);
		botscomment(op, msg);
		for(let h=0; h<team.length; h++){
			op = team[h] + '\n';
			botscomment('team[ ' + h + ' ]\n' + op, msg);
		}
	}else{
		botscomment(err, msg);
	}
}
//member edit function
const memberteamedit = async (mm, op, msg) =>{
	memberclear();
	membernamereg(mm);
	botscomment(op, msg);
	for(let h=0; h<mm.length; h++){
		await msg.channel.send(mm[h]);
	}
}
client.on('message', async message => {
	if(message.author.bot){
		if(gbl_botscommentedit == 'member_edit'){
			gbl_botscommentedit == '';
			let index = gbl_member.name.indexOf(message.content);
			if(index != -1){
				await memberidreg(index, message);
			}
		}
	}else{
		if(message.content === ("!tmvc")) {
			let i = 0;
			let error = "";
			let output = "VCメンバーでチームを分けます\n\n";
			let actmember = [];
			let online = message.guild.members.filter(m => m.voiceChannel && m.user.bot != true).forEach(m => {
				actmember[i] = m.user.username;
				i++;
			});
			let teamnum = Math.ceil(actmember.length / 4);
			if(actmember.length != 0){
				memberteam(teamnum, actmember, output, message, error);
			}else{
				botscomment('人がいないようです。', message);
			}
		}
		if(message.content.startsWith("!tmvc ")) {
			let select = message.content.split('!tmvc ');
			let teamnum = select[1];
			let i = 0;
			let error = "!tmvc[半角スペース][1桁の半角数字]でコマンドを実行してください。";
			let output = "VCメンバーでチームを分けます\n\n";
			let actmember = [];
			let online = message.guild.members.filter(m => m.voiceChannel && m.user.bot != true).forEach(m => {
				actmember[i] = m.user.username;
				i++;
			});
			if(actmember.length != 0){
				memberteam(teamnum, actmember, output, message, error);
			}else{
				botscomment('VCに人がいないようです。', message);
			}
		}
		if(message.content === ("!tmon")) {
			let i = 0;
			let error = "";
			let output = "オンラインメンバーでチームを分けます\n\n";
			let actmember = [];
			//let online = message.guild.members.filter(m => m.presence.status != "offline" && m.user.bot != true).forEach(m => {
			let online = message.guild.members.filter(m => m.presence.status != "offline").forEach(m => {
				actmember[i] = m.user.username;
				i++;
			});
			let teamnum = Math.ceil(actmember.length / 4);
			if(actmember.length != 0){
				memberteam(teamnum, actmember, output, message, error);
			}else{
				botscomment('人がいないようです。', message);
			}
		}
		if(message.content.startsWith("!tmon ")) {
			let select = message.content.split('!tmon ');
			let teamnum = select[1];
			let i = 0;
			let error = "!tmon[半角スペース][1桁の半角数字]でコマンドを実行してください。";
			let output = "オンラインメンバーでチームを分けます\n\n";
			let actmember = [];
			//let online = message.guild.members.filter(m => m.presence.status != "offline" && m.user.bot != true).forEach(m => {
			let online = message.guild.members.filter(m => m.presence.status != "offline").forEach(m => {
				actmember[i] = m.user.username;
				i++;
			});
			if(actmember.length != 0){
				memberteam(teamnum, actmember, output, message, error);
			}else{
				botscomment('人がいないようです。', message);
			}
		}
		if(message.content === ("!tm")) {
			let i = 0;
			let error = "";
			let output = "登録メンバーでチームを分けます\n\n";
			let actmember = gbl_member.name;
			let teamnum = Math.ceil(actmember.length / 4);
			if(actmember.length != 0){
				memberteam(teamnum, actmember, output, message, error);
			}else{
				botscomment('登録メンバーがいません。', message);
			}
		}
		if(message.content.startsWith("!tm ")) {
			let select = message.content.split('!tm ');
			let teamnum = select[1];
			let i = 0;
			let error = "!tm[半角スペース][1桁の半角数字]でコマンドを実行してください。";
			let output = "登録メンバーでチームを分けます\n\n";
			let actmember = gbl_member.name;
			if(actmember.length != 0){
				memberteam(teamnum, actmember, output, message, error);
			}else{
				botscomment('登録メンバーがいません。', message);
			}
		}
		if(message.content === ("!tmvc_e")) {
			let i = 0;
			let actmember = [];
			let output ='VCメンバーを登録しました。\nEditに入ります。\nリアクションを付けるとメンバーから削除します。\nリアクションを外すとメンバーに復帰させます。';
			let online = message.guild.members.filter(m => m.voiceChannel && m.user.bot != true).forEach(m => {
				actmember[i] = m.user.username;
				i++;
			});
			if(actmember.length != 0){
				gbl_botscommentedit = 'member_edit';
				await memberteamedit(actmember,output,message);
			}else{
				botscomment('VCに人がいないようです。', message);
			}
			gbl_botscommentedit == '';
		}
		if(message.content === ("!tmon_e")) {
			let i = 0;
			let actmember = [];
			let output ='オンラインのメンバーを登録しました。\nEditに入ります。\nリアクションを付けるとメンバーから削除します。\nリアクションを外すとメンバーに復帰させます。\n\n.......読み込み中';
			//let online = message.guild.members.filter(m => m.presence.status != "offline" && m.user.bot != true).forEach(m => {
			let online = message.guild.members.filter(m => m.presence.status != "offline").forEach(m => {
				actmember[i] = m.user.username;
				i++;
			});
			if(actmember.length != 0){
				gbl_botscommentedit = 'member_edit';
				await memberteamedit(actmember,output,message);
				botscomment('読み込み完了', message);
			}else{
				botscomment('人がいないようです。', message);
			}
		}
		if(message.content === ("!tm_e")) {
			let actmember = gbl_member.name;
			let output ='Editに入ります。\nリアクションを付けるとメンバーから削除します。\nリアクションを外すとメンバーに復帰させます。\n\n.......読み込み中';
			if(actmember.length != 0){
				gbl_botscommentedit = 'member_edit';
				await memberteamedit(actmember,output,message);
				botscomment('読み込み完了', message);
			}else{
				botscomment('登録メンバーがいません。', message);
			}
			gbl_botscommentedit == '';
		}
		if(message.content.startsWith("!tm_add ")) {
			let addmember = botskeywords(message.content,"!tm_add ");
			let actmember = gbl_member.name;
			let num = actmember.length;
			let output ='登録メンバーを追加しました。\n\n';
			if(addmember.length != 0){
				for(let i=0; i<addmember.length; i++){
					actmember[num + i] = addmember[i];
				}
				membernamereg(actmember);
				for(let i=0; i<gbl_member.name.length; i++){
					output += gbl_member.name[i] + '\n';
				}
				botscomment(output, message);
			}else{
				botscomment('追加したいメンバーがいません。', message);
			}
		}
		if(message.content.startsWith("!tm_rmv ")) {
			let copy = [];
			let rmvmember = botskeywords(message.content,"!tm_rmv ");
			let actmember = gbl_member.name;
			let num = actmember.length;
			let output ='登録メンバーを削除しました。\n\n';
			let index = 0;
			for(let i=0; i<rmvmember.length; i++){
				index = gbl_member.name.findIndex(m => m == rmvmember[i]);
				if(index == -1){
					break;
				}
			}
			if(index != -1){
				for(let i=0; i<rmvmember.length; i++){
					copy.name = gbl_member.name.filter(n => n != rmvmember[i]);
					memberclear();
					gbl_member = copy;
					copy = [];
					console.log(gbl_member);
				}
				for(let i=0; i<gbl_member.name.length; i++){
					output += gbl_member.name[i] + '\n';
				}
				botscomment(output, message);
			}else{
				botscomment('登録されていないメンバーが含まれています。', message);
			}
		}
		if(message.content === "!m") {
			let output = '現在のメンバー\n\n';
			for(let i=0; i<gbl_member.name.length; i++){
				output += gbl_member.name[i] + '\n';
			}
			botscomment(output, message);
		}
		if(message.content === "!mc") {
			memberclear();
			botscomment('登録メンバーを全削除しました。', message);
		}
		if(message.content === "!h") {
			let output = 'コマンド一覧\n\n[!m]：登録メンバー表示\n[!tm]：登録メンバーでチーム分け（チーム数自動）\n[!tm n]：登録メンバーでチーム分け（チーム数n個）\n[!tm_add 名前,名前,...n]：登録メンバーを追加\n[!tm_rmv 名前,名前,...n]：登録メンバーを削除\n[!tm_e]：登録メンバーを編集\n[!tm(key)]：登録メンバーをリセット、(key)メンバーを登録メンバーに追加してチーム分け（チーム数自動）\n[!tm(key) n]：登録メンバーをリセット、（key）メンバーを登録メンバーに追加してチーム分け（チーム数n個）\n[!tm(key)_e]：登録メンバーをリセット、（key）メンバーを登録メンバーに追加してメンバー編集\n\nkey：on オンラインメンバー、vc ボイチャメンバー\n例コマンド !tmon_e';
			botscomment(output, message);
		}
	}
});
client.on('messageReactionAdd', async reaction => {
	if(reaction.bot){
	}else{
		if(reaction.count === 1){
			let copy = [];
			let index = gbl_member.id.findIndex(m => m == reaction.message.id);
			let name = gbl_member.name[index];
			let id = gbl_member.id[index];
			copy.name = gbl_member.name.filter(n => n != name);
			copy.id = gbl_member.id.filter(n => n != id);
			gbl_member = copy;
		}
	}
});
client.on('messageReactionRemove', async reaction => {
	if(reaction.bot){
	}else{
		if(reaction.count === 0){
			let usernum = gbl_member.id.length;
			gbl_member.name[usernum ] = reaction.message.content;
			gbl_member.id[usernum] = reaction.message.id;
		}
	}
});
client.login(token);