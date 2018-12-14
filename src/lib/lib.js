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
  var stdout = "";
  if(cmd.stdout != null)stdout = cmd.stdout.toString('utf-8');
  var stderr = "";
  if(cmd.stderr != null)stderr = cmd.stderr.toString('utf-8');
  var rc = "";
  if(cmd.status != null)rc = cmd.status;
  if(rc != 0){
    console.log(program+extention +" : "+ args);
    console.log({"stdout":stdout, "stderr":stderr, "rc":rc});
  }
  return {"stdout":stdout, "stderr":stderr, "rc":rc};
};
