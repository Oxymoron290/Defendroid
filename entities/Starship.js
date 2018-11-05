function Starship(x, y, scale, speed) {
    this.Model = Sprite();
    this.activeSprite = this.Model.resting;
    this.Sprite = new DataPixels(this.activeSprite.sprite, scale).image;
    this.X = x;
    this.Y = y;
    this.Scale = scale;
    this.Speed = speed;

    this.Previous_X;
    this.Previous_Y;

    this.Velocity_X = 0;
    this.Velocity_Y = 0;

    var accelleration = .2;
    var inertia = -.02;
    var maxSpeed = 10;

    var firing = false;
    var fired = false;
    var reversing = false;
    var reversed = false;
    var hyperspacing = false;
    var hyperspaced = false;
    var thrusting = false;
    var goingUp = false;
    var goingDown = false;

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
        
        this._orientate();
        this.Sprite = new DataPixels(this.activeSprite.sprite, this.Scale).image;
    }

    this.PostUpdate = function(){
        //console.log("Thrusting:" + thrusting + " Model: " + this.Model.facingLeft + " activeSprite: " + this.activeSprite.facingLeft + " X: " + this.X + " Y:" + this.Y);
        //console.log("Left: " + this.Model.headingLeft + " Velocity X: " + this.Velocity_X);
    }

    this.isColliding = function(obj){
        // TODO: omit flame from engines - will require all entities to have a bounding box.
        if(this.X > obj.X + (obj.Model.width * obj.Scale)) return false;
        if(this.X + (this.Model.width * this.Scale) < obj.X) return false;

        if(this.Y > obj.Y + (obj.Model.height * obj.Scale)) return false;
        if(this.Y + (this.Model.height * this.scale) < obj.Y)return false;
        return true;
    }

    this._fire = function (){
        console.log("Boom! ");
    }

    this._reverse = function (){
        console.log("flip");
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
            }
        };
    }
}