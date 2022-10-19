function init($) {
  $("#background").warpDrive({
    width: innerWidth,
    height: innerHeight,
    starCount: 2333,
    starSpeedMax: 30,
  });
}

$(init);
