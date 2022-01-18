const light = {
  "from": [10, 10, 0],
  "power": 15
};

const screen = [30, 30];
const state = ".,-~+^*!:;?=%&@#"; // 0 - 15

function render(){
  const L = new Point(...light.from);
  const rows = [];
  for(let y = 0; y < screen[1]; y ++){
    const row = [];
    for(let x = 0; x < screen[0]; x += 0.5){

      const P = new Point(x - screen[0] / 2, screen[1] / 2 - y, 0);
      const U = new Vector(0, 0, 1);
      const [d, t] = body.intersect(P, U);

      if(!d) row.push(" ");
      else {
        //row.push(state[15]);

        const S1 = P.add(U.mul(t));

        const V = unitVector(S1.sub(L));
        const [d, i] = body.intersect(L, V);

        const S2 = L.add(V.mul(i));

        if(eq(S1.x, S2.x) && eq(S1.y, S2.y) && eq(S1.z, S2.z)){
          const theta = body.angle(L, S1);
          const lvl = Math.round(light.power * theta / Math.PI);
          row.push(state[lvl]);
        } else row.push(state[0]);
      }
    }
    rows.push(row.join(""));
  }
  console.log(rows.join("\n"));
}
