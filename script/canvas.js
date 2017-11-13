

  var Context = Canvas.getContext('2d');
  BuildCanvas();

  function DeleteCanvas() {

    Context.clearRect(0, 0, 300, 300);
    return Context;
  }

  function BuildCanvas() {

    Context.beginPath();
    Context.lineWidth = 10;
    Context.strokeStyle = '#778899';

    Context.moveTo(0, 295);
    Context.lineTo(300, 295);
    Context.stroke();

    Context.moveTo(60, 0);
    Context.lineTo(60, 295);
    Context.stroke();

    Context.moveTo(60, 5);
    Context.lineTo(240, 5);
    Context.stroke();

    Context.lineWidth = 7;
    Context.moveTo(60, 60);
    Context.lineTo(120, 5);
    Context.stroke();

    Context.moveTo(60, 235);
    Context.lineTo(120, 295);
    Context.stroke();

    //Rope
    Context.lineWidth = 3;
    Context.moveTo(239, 0);
    Context.lineTo(239, 50);
    Context.stroke();
  }

  function MoveCanvas(Errors) {
    switch (Errors) {
      case 1:
      //Head
      Context.lineWidth = 5;
      Context.beginPath();
      Context.arc(240, 85, 30, 0, 2*Math.PI);
      Context.stroke();
      break;

      case 2:
      //body
      Context.moveTo(239, 115);
      Context.lineTo(239, 210);
      Context.stroke();
      break;

      case 3:
      //Left-arm
      Context.moveTo(239, 140);
      Context.lineTo(200, 180);
      Context.stroke();
      break;

      case 4:
      //Right-arm
      Context.moveTo(239, 140);
      Context.lineTo(278, 180);
      Context.stroke();
      break;

      case 5:
      //Left-Leg
      Context.moveTo(239, 210);
      Context.lineTo(200, 250);
      Context.stroke();
      break;

      case 6:
      //Right-Leg
      Context.moveTo(239, 210);
      Context.lineTo(278, 250);
      Context.stroke();
      break;

      case 7:
      //Face
      Context.lineWidth = 3;

      //Left-eye
      Context.moveTo(225, 73);
      Context.lineTo(235, 83);
      Context.stroke();

      Context.moveTo(225, 83);
      Context.lineTo(235, 73);
      Context.stroke();

      //Right-eye
      Context.moveTo(245, 73);
      Context.lineTo(255, 83);
      Context.stroke();

      Context.moveTo(245, 83);
      Context.lineTo(255, 73);
      Context.stroke();

      //Mouse
      Context.moveTo(232, 100);
      Context.lineTo(250, 100);
      Context.stroke();
      break;
      default:
    }
  }
