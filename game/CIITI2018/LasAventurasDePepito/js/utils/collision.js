var collision = {
  boxes: function(boxA, boxB) {
    if(boxA === boxB) {
      return false;
    }
    return boxA.x < (boxB.x + boxB.width) &&  //left
      (boxA.x + boxA.width) > boxB.x &&       //right
      boxA.y < (boxB.y + boxB.height) &&      //top
      (boxA.y + boxA.height) > boxB.y;        //bottom
  },
  circles: function(circleA, circleB) {
    if(circleA === circleB) {
      return false;
    }
    return Math.abs(circleA.x - circleB.x) < (circleA.radius + circleB.radius) &&
      Math.abs(circleA.y - circleB.y) < (circleA.radius + circleB.radius);
  },
  boxAndCircle: function(box, circle) {
    var distX = Math.abs(circle.x - box.x) - box.width / 2;
    var distY = Math.abs(circle.y - box.y) - box.height / 2;
    if (distX > (box.width / 2 + circle.radius) || distY > (box.height / 2 + circle.radius)) {
      return false;
    }
    if (distX <= (box.width / 2) || distY <= (box.height / 2)) {
      return true;
    }
    var dx = distX - box.width / 2;
    var dy = distY - box.height / 2;
    return (dx * dx + dy * dy) <= (circle.radius * circle.radius);
  },
  boxesSide: function(boxA, boxB) {
    if(boxA === boxB) {
      return false;
    }
    var collision = null;
    //Check if the 2 rectangle's centers are close enough to be colliding
    var dx = (boxA.x + boxA.width / 2) - (boxB.x + boxB.width / 2);
    var dy = (boxA.y + boxA.height / 2) - (boxB.y + boxB.height / 2);
    var width = (boxA.width + boxB.width) / 2;
    var height = (boxA.height + boxB.height) / 2;
    var crossWidth = width * dy;
    var crossHeight = height * dx;
    if(Math.abs(dx) <= width && Math.abs(dy) <= height) {
      //check the intersection depths to determine which side of boxA was most involved in the collision
      if(crossWidth > crossHeight) {
        collision = crossWidth > -crossHeight ? 'top' : 'right';
      } else {
        collision = crossWidth > -crossHeight ? 'left' : 'bottom';
      }
    }
    return collision;
  }
};
