var trigonometry = {
  degreeToRadian: function(degree) {
    return degree * (Math.PI / 180);
  },
  radianToDegree: function(radian) {
    return radian * (180 / Math.PI);
  },
  getIncrementX: function(angle, distance) {
    var radAngle = trigonometry.degreeToRadian(angle);
    return Math.cos(radAngle) * distance;
  },
  getIncrementY: function(angle, distance) {
    var radAngle = trigonometry.degreeToRadian(angle);
    return -Math.sin(radAngle) * distance;
  },
  getAdjacent: function(angle) {
    if(angle <= 180){
      return 180 - angle;
    } else {
      return 360 - angle + 180;
    }
  },
  getConjugated: function(angle) {
    return 360 - angle;
  }
};
