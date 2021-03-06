window.onload = function() {


  var g = new e.Game(window.innerWidth, window.innerHeight);

  g.mediaStorage.add( 'aim',    './assets/aim2.png'             );
  g.mediaStorage.add( 'filter', './assets/filters/filter_1.png' );
  g.mediaStorage.add( 'hero1',   './assets/hero/1.png'          );
  g.mediaStorage.add( 'hero2',   './assets/hero/2.png'          );
  g.mediaStorage.add( 'txt',    './assets/bg_txt/txt0.png'      );


  g.addCursorGameObject(
    new e.Sprite(
      g.mediaStorage.get('aim'),
      100, 100, 180, 0, 4, true, false
    )
  );
  g.cursor.rotationByCursor = true;


  /* Filter */
  g.addObject(
    new e.GameObject(
      g.screen.center.x, 
      g.screen.center.y,
      function(vector, state, controller) {},
      g.state,
      new e.Sprite(
        g.mediaStorage.get('filter', g.world[0].length),
        2000, 2000, 300, 0, 0, true, true
      )
    )
  );
  

  /* Hero */
  g.addObject(
    new e.GameObject(
      g.screen.center.x, 
      g.screen.center.y,
      function(vector, state, controller, innerState) {
        controller.accelerate();
        controller.slip();
        vector.translateVec(controller.velocity);
        // turn right
        if ((g.cursor.angle < (-Math.PI/2) && g.cursor.angle > (-Math.PI))
          || (g.cursor.angle < (Math.PI)  && g.cursor.angle > (Math.PI/2)))
        {
          innerState.currentSprite = 1
        } else {
          innerState.currentSprite = 0
        }
      },
      g.state,
      new e.Sprite(
        g.mediaStorage.get('hero1', g.world[0].length),
        120, 120, 200, 0, 3, true, false
      ),
      new e.Controller(
        new a.Vector(0, 0),
        new a.Vector(0, 0),
        g.state,
        2,
        10,
        1
      )
    )
  );


  g.world[0][0].sprites.push(
    new e.Sprite(
      g.mediaStorage.get('hero2', g.world[0].length),
      120, 120, 200, 0, 3, true, false
    )
  );

  


  g.setCamera(
    new e.Camera(
      g.screen.center.x,
      g.screen.center.y,
      function(vector, state, controller) {
        controller.accelerate();
        controller.slip();
        vector.translateVec(controller.velocity);
      },
      g.state,
      new e.Controller(
        new a.Vector(0, 0),
        new a.Vector(0, 0),
        g.state,
        1,
        10,
        1,
        g.world[0][0].vector
      )
    )
  );

  /* Set background */
  for (var x = 0; x < 20; x ++) {
    for (var y = 0; y < 20; y ++) {
      g.addObject(
        new e.GameObject(
          x*100, 
          y*100,
          function(vector, state) {
            vector.translate(0,0);
          },
          g.state,
          new e.Sprite(
            g.mediaStorage.get('txt', g.world[0].length),
            100, 100, 300, 0, 0, true, false
          )
        )
      )
    }
  }

  g.loop();

  var collider = new c.Collider();
  collider.add( new c.SolidBody( new a.Vector( 1, 2 ), new a.Vector( 3, 4 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 2, 1 ), new a.Vector( 4, 3 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 2, 5 ), new a.Vector( 4, 7 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 3, 8 ), new a.Vector( 5, 10 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 5, 2 ), new a.Vector( 6, 3 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 5, 4 ), new a.Vector( 7, 6 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 6, 7 ), new a.Vector( 8, 8 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 8, 2 ), new a.Vector( 10, 4 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 9, 3 ), new a.Vector( 11, 5 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 9, 7 ), new a.Vector( 11, 9 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 13, 4 ), new a.Vector( 15, 8 ) ) );
  collider.add( new c.SolidBody( new a.Vector( 12, 5 ), new a.Vector( 14, 7 ) ) );
  collider.run();

  for (var i = 0; i < collider.objects.length; i++) {
    console.log(collider.objects[i].min.x, collider.objects[i].min.y,
    collider.objects[i].max.x, collider.objects[i].max.y,
    collider.objects[i].collided);
  }
      
}