const { solveQuartic, eq, unitVector, Point, Vector } = require("./math.js");

class Sphere {
  constructor(middle, radius){
    this.middle = new Point(...middle);
    this.radius = radius;
  }

  intersect(P, U){

    // formula from
    // https://math.stackexchange.com/questions/1939423/calculate-if-vector-intersects-sphere

    const Q = P.sub(this.middle);
    const a = U.dot(U);
    const b = 2 * U.dot(Q);
    const c = Q.dot(Q) - this.radius * this.radius;
    const d = b * b - 4 * a * c;

    if(d < 0) return [false, null];

    const t1 = (Math.sqrt(d) - b) / (2 * a);
    const t2 = (- Math.sqrt(d) - b) / (2 * a);
    const t = Math.min(t1, t2);

    return [true, t];
  }

  angle(L, S){
    const V = unitVector(L.sub(S));
    const U = unitVector(this.middle.sub(S));
    const theta = Math.acos(V.dot(U) / (V.a * U.a));
    return theta;
  }
}

class Donut {
  constructor(r, R, middle){
    // TODO: rotation

    this.r = r;
    this.R = R;
    this.middle = new Point(...middle);
  }

  intersect(P, U){

    // formula from
    // my head

    P = P.sub(this.middle);

    const r = this.r;
    const R = this.R;

    const a = U.x ** 4 + U.y ** 4 + U.z ** 4 +
      2 * U.x * U.x * U.y * U.y +
      2 * U.x * U.x * U.z * U.z +
      2 * U.z * U.z * U.y * U.y;

    const b = 4 * (
      P.x * U.x * U.x * U.x +
      P.y * U.y * U.y * U.y +
      P.z * U.z * U.z * U.z +

      P.x * U.x * U.y * U.y + U.x * U.x * P.y * U.y +
      P.x * U.x * U.z * U.z + U.x * U.x * P.z * U.z +
      P.z * U.z * U.y * U.y + U.z * U.z * P.y * U.y
    );

    const c = 6 * (
      P.x * P.x * U.x * U.x +
      P.y * P.y * U.y * U.y +
      P.z * P.z * U.z * U.z
    ) + 2 * (
      (P.x * U.y + U.x * P.y) ** 2 + 2 * P.x * U.x * P.y * U.y +
      (P.x * U.z + U.x * P.z) ** 2 + 2 * P.x * U.x * P.z * U.z +
      (P.z * U.y + U.z * P.y) ** 2 + 2 * P.z * U.z * P.y * U.y
    ) + 2 * (
      r * r * (
        - U.x * U.x - U.y * U.y - U.z * U.z
      ) + R * R * (
        - U.x * U.x - U.y * U.y + U.z * U.z
      )
    );

    const d = 4 * (
      P.x * P.x * P.x * U.x +
      P.y * P.y * P.y * U.y +
      P.z * P.z * P.z * U.z +

      P.x * P.x * P.y * U.y + P.x * U.x * P.y * P.y +
      P.x * P.x * P.z * U.z + P.x * U.x * P.z * P.z +
      P.z * P.z * P.y * U.y + P.z * U.z * P.y * P.y +

      r * r * (
        - P.x * U.x - P.y * U.y - P.z * U.z
      ) + R * R * (
        - P.x * U.x - P.y * U.y + P.z * U.z
      )
    );

    const e = P.x * P.x * P.x * P.x +
      P.y * P.y * P.y * P.y +
      P.z * P.z * P.z * P.z +
      R ** 4 + r ** 4 + 2 * (
        P.x * P.x * P.y * P.y +
        P.x * P.x * P.z * P.z +
        P.z * P.z * P.y * P.y
      ) + 2 * (
        r * r * (
          - P.x * P.x - P.y * P.y - P.z * P.z
        ) + R * R * (
          - P.x * P.x - P.y * P.y + P.z * P.z
        )
      ) - 2 * R * R * r * r;

     const s = solveQuartic(a, b, c, d, e);
     const m = Math.min(...s);
     if((s.length == 0) || (m < 0)) return [false, null];
     else return [true, m];

  }

  angle(L, S){

    // TODO: instead of middle take the bigger circle

    L = L.sub(this.middle);
    S = S.sub(this.middle);

    const V = unitVector(L.sub(S));
    const U = unitVector(new Point(0, 0, 0).sub(S));
    const theta = Math.acos(V.dot(U) / (V.a * U.a));
    return theta;
  }
}

module.exports = { Sphere, Donut };