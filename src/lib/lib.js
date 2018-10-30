const {spawnSync} = require('child_process');

var plat = process.platform;

var extention = "";
if(plat == "win32"){
  extention = ".exe"
}else if(plat == "linux"){
  extention = ".out";
}

module.exports = function(program, args){
  var cmd = spawnSync(program+extention, args);
  return {"stdout":cmd.stdout.toString('utf-8'), "stderr":cmd.stderr.toString('utf-8'), "rc":cmd.status};
};
