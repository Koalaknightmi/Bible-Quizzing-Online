let dict = {}
for(var i in season.season){
  for(var j in season.season[i].verses){
    season.season[i].verses[j] = season.season[i].verses[j].split(/(?<!\w[’'-])\b(?![’'-]\w)/g)
    for(var k in season.season[i].verses[j]){
      season.season[i].verses[j][k] = season.season[i].verses[j][k].toLowerCase()
      if(!season.season[i].verses[j][k].match(/(?:\w|['’-]\w)+/g)){
        continue;
      }
      if(season.season[i].verses[j][k].match(/[0-9]/g)) continue;
      if(!dict[season.season[i].verses[j][k]]){
        dict[season.season[i].verses[j][k]] = []
      }
      dict[season.season[i].verses[j][k]].push(i+":"+(parseInt(j)+1))
    }
  }
}
console.log(JSON.stringify(dict))