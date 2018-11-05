function Starship(x, y, scale, speed) {
    this.Model = Sprite();
    this.activeSprite = this.Model.resting;
    this.Sprite = new DataPixels(this.activeSprite.sprite, scale).image;
    this.X = x;
    this.Y = y;
    this.Scale = scale;
    this.Speed = speed;
    this.Lives = 3;

    this.Previous_X;
    this.Previous_Y;

    this.Velocity_X = 0;
    this.Velocity_Y = 0;

    var accelleration = .2;
    var inertia = -.02;
    var maxSpeed = 10;

    this.Control = function(fn, isOn){
        if(fn == "fire"){
            firing = isOn;
            if(!isOn) fired = false;
        }
        if(fn == "reverse"){
            reversing = isOn;
            if(!isOn) reversed = false;
        }
        if(fn == "hyperspace"){
            hyperspacing = isOn;
            if(!isOn) hyperspaced = false;
        }
        if(fn == "thrust") thrusting = isOn;
        if(fn == "up") goingUp = isOn;
        if(fn == "down") goingDown = isOn;
    }

    this.PreUpdate = function(){
        this.Previous_X = this.X;
        this.Previous_Y = this.Y;
        this.X += this.Velocity_X;
        this.Y += this.Velocity_Y;
    }

    this.Logic = function(){
        if(dieing){
            this._die();
            return;
        }
        if(respawning){
            this._respawn();
            return;
        }
        if(firing && !fired){
            fired = true;
            this._fire();
        }
        if(reversing && !reversed){
            reversed = true;
            this._reverse();
        }
        if(hyperspacing && !hyperspaced){
            hyperspaced = true;
            this._warp();
        }
        this._thrust();
        if(goingUp) this.Velocity_Y = -Math.abs(this.Speed);
        if(goingDown) this.Velocity_Y = Math.abs(this.Speed);
        if(!goingUp && !goingDown) this.Velocity_Y = 0;
        //if(isLeft) player.Velocity_X = -Math.abs(player.Speed);
        //if(isRight) player.Velocity_X = Math.abs(player.Speed);
        //if(!isLeft && !isRight) player.Velocity_X = 0;
    }

    this.PostUpdate = function(){
        this._orientate();
        //console.log("Thrusting:" + thrusting + " Model: " + this.Model.facingLeft + " activeSprite: " + this.activeSprite.facingLeft + " X: " + this.X + " Y:" + this.Y);
        //console.log("Left: " + this.Model.headingLeft + " Velocity X: " + this.Velocity_X);
    }

    this.Render = function(graphics){
        this.Sprite = new DataPixels(this.activeSprite.sprite, this.Scale).image;
        
        graphics.drawImage(this.Sprite, this.X, this.Y);
    }

    this.Kill = function(){
        dieing = true;
        flashing = 70;
    }

    this.isColliding = function(obj){
        // TODO: omit flame from engines - will require all entities to have a bounding box.
        if(this.X > obj.X + (obj.Model.width * obj.Scale)) return false;
        if(this.X + (this.Model.width * this.Scale) < obj.X) return false;

        if(this.Y > obj.Y + (obj.Model.height * obj.Scale)) return false;
        if(this.Y + (this.Model.height * this.scale) < obj.Y)return false;
        return true;
    }

    var firing = false;
    var fired = false;
    var reversing = false;
    var reversed = false;
    var hyperspacing = false;
    var hyperspaced = false;
    var thrusting = false;
    var goingUp = false;
    var goingDown = false;
    
    var respawning = true;
    var dieing = false;
    var flashing = 0; // ms to flash
    var exploading = 0; // ms to animate explosion

    this._die = function(){
        if(!dieing) return;
        if(flashing > 0){
            flashing--;
            var splitter = Math.round(flashing/13);
            console.log("Flashing " + flashing + " splitter: " + splitter + " modulus: " + splitter%2);
            if(splitter%2 == 0){
                this.activeSprite = this.Model.dieing2;
            }else{
                this.activeSprite = this.Model.dieing1;
            }
            return;
        }
        if(exploading > 0){
            // then the ship actually explodes.
            return;
        }

        // then we will reset for the next death.
        this.Lives--;
        dieing = false;
        respawning = true;
    }

    this._respawn = function(){
        if(!respawning) return;

        // respawn vehicle

        this.Velocity_X = 0;
        this.Velocity_Y = 0;
        respawning = false;
    }

    this._fire = function (){
        console.log("Boom! ");
    }

    this._reverse = function (){
        this.Model.facingLeft = !this.Model.facingLeft;
        this.Model.offset = false;
    }

    this._warp = function (){
        console.log("Where did he go?");
    }

    this._thrust1 = function (){
        var goLeft = undefined;
        var amount = 0;

        if(thrusting){
            this.activeSprite = this.Model.thrusting;
            goLeft = this.Model.facingLeft;
            amount = accelleration;
        }else{
            this.activeSprite = this.Model.resting;
            if(this.Previous_X != this.X) goLeft = this.Previous_X < this.X;
            amount = inertia;
        }

        var alert = "";
        if(goLeft != undefined){
            if(goLeft){
                alert = "going Left!";
                this.Velocity_X += -Math.abs(amount);
                if(this.Velocity_X <= -Math.abs(maxSpeed)){
                    this.Velocity_X = -Math.abs(maxSpeed)
                }
                if(thrusting && this.Velocity_X > 0){
                    this.Velocity_X = 0;
                }
            }
            if(!goLeft){
                alert = "going Right!";
                this.Velocity_X += Math.abs(amount);
                if(this.Velocity_X >= Math.abs(maxSpeed)){
                    this.Velocity_X = Math.abs(maxSpeed)
                }
                if(thrusting && this.Velocity_X < 0){
                    this.Velocity_X = 0;
                }
            }
        }else{
            this.Velocity_X = 0;
        }

        console.log("Thrusting:" + thrusting + " " + alert + " Model: " + this.Model.facingLeft + " goLeft: " + goLeft + " amount: " + amount + " Velocity X: " + this.Velocity_X);
    }

    this._thrust = function (){
        if(thrusting){
            this.activeSprite = this.Model.thrusting;
            if(this.Model.facingLeft){
                this.Velocity_X += -Math.abs(accelleration);
                if(this.Velocity_X <= -Math.abs(maxSpeed)){
                    this.Velocity_X = -Math.abs(maxSpeed)
                }
            }else{
                this.Velocity_X += Math.abs(accelleration);
                if(this.Velocity_X >= Math.abs(maxSpeed)){
                    this.Velocity_X = Math.abs(maxSpeed)
                }
            }
        }else{
            if(this.Previous_X > this.X){
                this.Velocity_X -= -Math.abs(inertia);
                if(this.Velocity_X <= -Math.abs(maxSpeed)){
                    this.Velocity_X = -Math.abs(maxSpeed)
                }
                if(this.Velocity_X > 0){
                    this.Velocity_X = 0;
                }
            }
            
            if(this.Previous_X < this.X){
                this.Velocity_X -= Math.abs(inertia);
                if(this.Velocity_X >= Math.abs(maxSpeed)){
                    this.Velocity_X = Math.abs(maxSpeed)
                }
                if(this.Velocity_X < 0){
                    this.Velocity_X = 0;
                }
            }
        this.activeSprite = this.Model.resting;
        }
    }

    this._orientate = function (){
        if(this.Model.facingLeft == this.activeSprite.facingLeft) return;
        this.activeSprite.facingLeft = !this.activeSprite.facingLeft;
        if(!this.Model.offset){
            this.Model.offset = true;
            if(this.activeSprite.facingLeft){ this.X += 7*this.Scale; }else{ this.X -= 7*this.Scale; }
        }
        this.activeSprite.sprite.forEach(function(element){
            element.reverse();
        });
    }
    
    function Sprite() {
        const _ = "0, 0, 0, 0";
        const q = "255, 255, 255";
        const w = "243, 243, 243";
        const m = "227, 32, 227";
        const g = "32, 227, 32";
        const b = "32, 32, 227";
        const y = "243, 243, 48";
        const f1 = "227, 32, 32";
        const f2 = "243, 48, 48";
        const f3 = "243, 113, 48";
        const f4 = "243, 178, 113";
        const f5 = "243, 243, 178";
    
        return {
            "width":36,
            "height":8,
            "facingLeft":false,
            "offset": true,
            "resting":{
                "facingLeft": false,
                "sprite":
                [
                    [_, _, _, _, _, _, _, _, _, _,  _,  _,  _,  _, _, _, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [_, _, _, _, _, _, _, _, _, _,  _,  _,  _,  _, _, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [_, _, _, _, _, _, _, _, _, _,  f2, f3, _,  _, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [_, _, _, _, _, _, _, _, _, _,  f2, f3, f1, w, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [_, _, _, _, _, _, _, _, _, _,  f2, f4, w,  w, w, w, w, w, w, w, w, w, w, w, w, w, w, g, g, b, b, y, y, _, _, _],
                    [_, _, _, _, _, _, _, _, _, f2, f3, f5, w,  w, w, m, m, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, y],
                    [_, _, _, _, _, _, _, _, _, _,  f2, f3, f1, w, w, m, m, m, m, m, m, w, w, w, w, w, w, w, w, w, w, w, w, w, _, _],
                    [_, _, _, _, _, _, _, _, _, _,  f2, f3, _,  _, w, m, m, m, m, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _]
                ]
            },
            "thrusting":{
                "facingLeft": false,
                "sprite":
                [
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, _, _, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, _, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _, f2, f2, f3, f4, f5, f4,  _,  _,  _, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _, f3, f3, f3, f4, f5, f5, f5, f5, f5, f1, w, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [f2, f2, f3, f3, f4, f4, f5, f5, f5,  w,  w,  w,  w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, g, g, b, b, y, y, _, _, _],
                    [ _, f2, f2, f3, f3, f4, f4, f5, f5, f5, f5, f5,  w, w, w, m, m, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, y],
                    [ _,  _,  _, f2, f2, f3, f3, f4, f4, f5, f5, f4, f1, w, w, m, m, m, m, m, m, w, w, w, w, w, w, w, w, w, w, w, w, w, _, _],
                    [ _,  _,  _,  _,  _,  _, f2, f3, f3, f3, f4,  _,  _, _, w, m, m, m, m, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _]
                ]
            },
            "dieing1":{
                "facingLeft": false,
                "sprite":
                [
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, _, _, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, _, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, f1,  w, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  w,  w, w, w, w, w, w, w, w, w, w, w, w, w, w, g, g, b, b, y, y, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  w,  w, w, m, m, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, y],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, f1,  w, w, m, m, m, m, m, m, w, w, w, w, w, w, w, w, w, w, w, w, w, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, w, m, m, m, m, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _]
                ]
            },
            "dieing2":{
                "facingLeft": false,
                "sprite":
                [
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, _, _, q, q, q, q, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, _, q, q, q, q, q, q, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, q, q, q, q, q, q, q, q, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  q,  q, q, q, q, q, q, q, q, q, q, _, _, _, _, _, _, _, _, _, _, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  q,  q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, _, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  q,  q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  q,  q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, q, _, _],
                    [ _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _,  _, q, q, q, q, q, q, q, q, q, q, _, _, _, _, _, _, _, _, _, _, _, _]
                ]
            }
        };
    }
}