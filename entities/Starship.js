function Starship(x, y, scale, speed) {
    this.Model = Sprite();
    this.activeSprite = this.Model.resting;
    this.Sprite = new DataPixels(this.activeSprite, scale).image;
    this.X = x;
    this.Y = y;
    this.Scale = scale;
    this.Speed = speed;

    this.FaceDirection = direction.Right;

    this.Previous_X;
    this.Previous_Y;

    this.Velocity_X = 0;
    this.Velocity_Y = 0;

    this.isColliding = function(obj){
        // TODO: omit flame from engines - will require all entities to have a bounding box.
        if(this.X > obj.X + (obj.Model.width * obj.Scale)) return false;
        if(this.X + (this.Model.width * this.Scale) < obj.X) return false;

        if(this.Y > obj.Y + (obj.Model.height * obj.Scale)) return false;
        if(this.Y + (this.Model.height * this.scale) < obj.Y)return false;
        return true;
    }

    this.flip = function(){
        // TODO: make private and handle internally.
        // TODO: try holding space. I dont like that. only one flip per keyDown event.
        this.FaceDirection = !this.FaceDirection;
        
        if(this.FaceDirection){ this.X += 7*this.Scale; }else{ this.X -= 7*this.Scale; }

        this.activeSprite.forEach(function(element){
            element.reverse();
        });
        this.Sprite = new DataPixels(this.activeSprite, this.Scale).image;
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
            "resting":
            [
                [_, _, _, _, _, _, _, _, _, _,  _,  _,  _,  _, _, _, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                [_, _, _, _, _, _, _, _, _, _,  _,  _,  _,  _, _, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                [_, _, _, _, _, _, _, _, _, _,  f2, f3, _,  _, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
                [_, _, _, _, _, _, _, _, _, _,  f2, f3, f1, w, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _],
                [_, _, _, _, _, _, _, _, _, _,  f2, f4, w,  w, w, w, w, w, w, w, w, w, w, w, w, w, w, g, g, b, b, y, y, _, _, _],
                [_, _, _, _, _, _, _, _, _, f2, f3, f5, w,  w, w, m, m, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, y],
                [_, _, _, _, _, _, _, _, _, _,  f2, f3, f1, w, w, m, m, m, m, m, m, w, w, w, w, w, w, w, w, w, w, w, w, w, _, _],
                [_, _, _, _, _, _, _, _, _, _,  f2, f3, _,  _, w, m, m, m, m, w, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _]
            ],
            "thrusting":
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
        };
    }
}