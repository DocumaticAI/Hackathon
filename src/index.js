(async () => {
  const { Sphere, Donut } = require("./body.js");
  const { eq, unitVector, Point, Vector } = require("./math.js");

  const light = {
    "from": [20, 30, 10],
    "power": 15
  };

  const screen = [30, 30];
  const state = ".,-~+^*!:;?=%&@#"; // 0 - 15

  const body = new Donut(5, 9);
  //const body = new Sphere(12);

  const middle = new Point(0, 0, 40);

  /**/
  let i = 0;
  const cycles = 100;
  while(true){
    body.yaw = i / cycles * 2 * Math.PI;
    await render();
    i ++;
    if(i > cycles) i = 0;
    await new Promise(r => setTimeout(r, 10));
  }
  /**/
  body.yaw = 0.01
  render();

  async function render(){
    //const L = new Point(...light.from);

    const L = new Point(...light.from).sub(middle);
    const Lx = L.x * Math.cos(body.yaw) - L.z * Math.sin(body.yaw);
    L.z = L.x * Math.sin(body.yaw) + L.z * Math.cos(body.yaw);
    L.x = Lx;

    const rows = [];
    for(let y = 0; y < screen[1]; y ++){
      const row = [];
      for(let x = 0; x < screen[0]; x += 0.5){

        const P = new Point(x - screen[0] / 2, screen[1] / 2 - y, 0).sub(middle);
        const Px = P.x * Math.cos(body.yaw) - P.z * Math.sin(body.yaw);
        P.z = P.x * Math.sin(body.yaw) + P.z * Math.cos(body.yaw);
        P.x = Px;

        const U = new Vector(0, 0, 1);
        const Ux = U.x * Math.cos(body.yaw) - U.z * Math.sin(body.yaw);
        U.z = U.x * Math.sin(body.yaw) + U.z * Math.cos(body.yaw);
        U.x = Ux;

        const [d, t] = body.intersect(P, U);

        if(!d) row.push(" ");
        else {

          //row.push(state[15]);

          const S1 = P.add(U.mul(t));

          const V = unitVector(S1.sub(L));
          const [d, i] = body.intersect(L, V);
          if(!d) {
            row.push(" ");
            //console.log("weird behaviour", "V", V, "S1", S1);
            //await new Promise(r => setTimeout(r, 1000));
          } else {
            const S2 = L.add(V.mul(i));
            //console.log(S2, i);

            if(eq(S1.x, S2.x) && eq(S1.y, S2.y) && eq(S1.z, S2.z)){
              const theta = body.angle(L, S1);
              const lvl = Math.round(light.power * theta / Math.PI);
              row.push(state[lvl]);
            } else row.push(state[0]);
          }
        }
      }
      rows.push(row.join(""));
    }
    console.log(rows.join("\n"));
  }
})()