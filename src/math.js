class Point {
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  sub(point){
    return new Vector(
      this.x - point.x,
      this.y - point.y,
      this.z - point.z
    );
  }

  add(point){
    return new Point(
      this.x + point.x,
      this.y + point.y,
      this.z + point.z
    );
  }
}

class Vector {
  constructor(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get a(){
    return Math.sqrt(
      this.x * this.x +
      this.y * this.y +
      this.z * this.z
    );
  }

  dot(vector){
    return (
      this.x * vector.x +
      this.y * vector.y +
      this.z * vector.z
    );
  }

  mul(scalar){
    return new Vector(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar
    );
  }

  sub(vector){
    return new Vector(
      this.x - vector.x,
      this.y - vector.y,
      this.z - vector.z
    );
  }
}

function unitVector(vector){
  return new Vector(
    vector.x / vector.a,
    vector.y / vector.a,
    vector.z / vector.a
  );
}

function eq(a, b){
  return Math.round(a * 1000) == Math.round(b * 1000);
}


function solveQuartic(a, b, c, d, e){
  const alpha = - (3 * b * b) / (8 * a * a) + c / a;
  const beta = (b * b * b) / (8 * a * a * a) -
    (b * c) / (2 * a * a) + d / a;
  const gamma = - (3 * b * b * b * b) / (256 * a * a * a * a) +
    (c * b * b) / (16 * a * a * a) - (b * d) / (4 * a * a) + e / a;
  if(beta == 0){
    const x1 = - b / (4 * a) + Math.sqrt(
      ( - alpha + Math.sqrt(alpha ** 2 - 4 * gamma)) / 2
    );
    const x2 = - b / (4 * a) + Math.sqrt(
      ( - alpha - Math.sqrt(alpha ** 2 - 4 * gamma)) / 2
    );
    const x3 = - b / (4 * a) - Math.sqrt(
      ( - alpha + Math.sqrt(alpha ** 2 - 4 * gamma)) / 2
    );
    const x4 = - b / (4 * a) - Math.sqrt(
      ( - alpha - Math.sqrt(alpha ** 2 - 4 * gamma)) / 2
    );
    return [x1, x2, x3, x4].filter(x => !isNaN(x));
  }

  const P = - (alpha ** 2) / 12 - gamma;
  const Q = - (alpha ** 3) / 108 +
    (alpha * gamma) / 3 - (beta ** 2) / 8;
  const R = - Q / 2 + Math.sqrt((Q * Q) / 4 + (P * P * P) / 27);
  const U = Math.cbrt(R);
  const y = - (5 * alpha) / 6 + (U ? (U - P / (3 * U)) : (- Math.cbrt(Q)));
  const W = Math.sqrt(alpha + 2 * y);

  const x1 = - b / (4 * a) + (
    + W + Math.sqrt(-(3 * alpha + 2 * y + (2 * beta) / W))
  ) / 2;
  const x2 = - b / (4 * a) + (
    - W + Math.sqrt(-(3 * alpha + 2 * y - (2 * beta) / W))
  ) / 2;
  const x3 = - b / (4 * a) + (
    + W - Math.sqrt(-(3 * alpha + 2 * y + (2 * beta) / W))
  ) / 2;
  const x4 = - b / (4 * a) + (
    - W - Math.sqrt(-(3 * alpha + 2 * y - (2 * beta) / W))
  ) / 2;

  return [x1, x2, x3, x4].filter(x => !isNaN(x));

}

module.exports = { solveQuartic, eq, unitVector, Point, Vector };