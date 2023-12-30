const Discord = require("discord.js");
const client = new Discord.Client();
const token = "";

const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const owRoll = ['タンク','ダメージ','サポート'];
const owChara = ['D.VA','アッシュ','アナ','ウィドウメイカー','ウィンストン','オリーサ','ゲンジ','ザリア','シンメトラ','ジャンクラット','ゼニヤッタ','ソルジャー76','ソンブラ','トールビョーン','トレーサー','ドゥームフィスト','ハンゾー','バスティオン','バティスト','ファラ','ブリギッテ','マーシー','マクリー','メイ','モイラ','ラインハルト','リーパー','ルシオ','レッキングボール','ロードホッグ'];
const owTank = ['D.VA','ウィンストン','オリーサ','ザリア','ラインハルト','レッキングボール','ロードホッグ'];
const owSapo = ['アナ','バティスト','ブリギッテ','ゼニヤッタ','モイラ','マーシー','ルシオ'];
const owDame = ['アッシュ','ウィドウメイカー','ゲンジ','シンメトラ','ジャンクラット','ソルジャー76','ソンブラ','トールビョーン','トレーサー','ドゥームフィスト','ハンゾー','バスティオン','ファラ','マクリー','メイ','リーパー'];
let OWteam = 0;
let OWmember =['空席','空席','空席','空席','空席','空席'];
let OWcount = 0;

client.on("ready", () => {
  console.log(`Botを起動しました`);
});

client.on('message', message => {
	if(message.author.bot){
	    return;
	}else{
	  if (message.content === "!ow_roll") {
	      message.reply('「 **' + owRoll[randRange(0,2)] + "** 」とかどうですか？");
	  }
	  if (message.content === "!ow_chara") {
	      message.reply('「 **' + owChara[randRange(0,29)] + "** 」どうですか？");
	  }
	  if (message.content === "!ow_tank") {
	      message.reply('「 **' + owTank[randRange(0,6)] + "** 」どうですか？");
	  }
	  if (message.content === "!ow_sapo") {
	      message.reply('「 **' + owSapo[randRange(0,6)] + "** 」どうですか？");
	  }
	  if (message.content === "!ow_dame") {
	      message.reply('「 **' + owDame[randRange(0,15)] + "** 」どうですか？");
	  }
	  if (message.content === "!ow_on") {
	  	if(OWteam === 0){
	  		OWteam = 1;
		    message.channel.send("\n\n*OWteam[ON]*");
	  	}else{
	  		message.channel.send('\n\n*既にコマンド（ow_on）がアクティブです*');
	  	}
	  }
	  if (message.content === "!ow_off") {
		for(let i = OWmember.length - 1; i > 0; i--){
		    let r = Math.floor(Math.random() * (i + 1));
		    let tmp = OWmember[i];
		    OWmember[i] = OWmember[r];
		    OWmember[r] = tmp;
		};
	  	OWcount = 0;
	  	OWteam = 0;
	  	OWmember =['空席','空席','空席','空席','空席','空席'];
	      message.channel.send("\n\n*OWteam[OFF]*");
	  }
	  if (message.content === "!ow_go") {
		for(let i = OWmember.length - 1; i > 0; i--){
		    let r = Math.floor(Math.random() * (i + 1));
		    let tmp = OWmember[i];
		    OWmember[i] = OWmember[r];
		    OWmember[r] = tmp;
		};
		message.channel.send('**' + OWmember[0] + '** [ タンク ] \n**' + OWmember[1] + '** [ タンク ] \n**' + OWmember[2] + '** [ ダメージ ] \n**' + OWmember[3] + '** [ ダメージ ] \n**' + OWmember[4] + '** [ サポート ] \n**' + OWmember[5] + '** [ サポート ]');
	  	OWcount = 0;
	  	OWteam = 0;
	  	OWmember =['空席','空席','空席','空席','空席','空席'];
	      message.channel.send("\n\n*OWteam[OFF]*");
	  }
	  if (message.content === "!ow_in") {
	  	if(OWteam === 1){
	  		author = message.author.username;
	  		OWmember[OWcount] = author;
	  		OWcount++;
	  		if(OWcount == 6){
				for(let i = OWmember.length - 1; i > 0; i--){
				    let r = Math.floor(Math.random() * (i + 1));
				    let tmp = OWmember[i];
				    OWmember[i] = OWmember[r];
				    OWmember[r] = tmp;
				};
				message.channel.send('**' + OWmember[0] + '** [ タンク ] \n**' + OWmember[1] + '** [ タンク ] \n**' + OWmember[2] + '** [ ダメージ ] \n**' + OWmember[3] + '** [ ダメージ ] \n**' + OWmember[4] + '** [ サポート ] \n**' + OWmember[5] + '** [ サポート ]');
			  	OWcount = 0;
			  	OWteam = 0;
			  	OWmember =['空席','空席','空席','空席','空席','空席'];
			    message.channel.send("\n\n*OWteam[OFF]*");
	  		}else{
	  			message.channel.send('**' + OWmember[0] + '**｜**' + OWmember[1] + '**｜**' + OWmember[2] + '**｜**' + OWmember[3] + '**｜**' + OWmember[4] + '**｜**' + OWmember[5] + '**');
	  		}
	  	}else{
	  		message.channel.send('\n\n*コマンド（ow_on）が非アクティブ状態です*');
	  	}
	  }
  }
});

client.login(token);