function Swarmer(x, y, scale, speed){
    this.Model = Sprite();
    this.activeSprite = this.Model.map;
    this.Sprite = new DataPixels(this.activeSprite, scale).image;
    this.X = x;
    this.Y = y;
    this.Scale = scale;
    this.Speed = speed;

    this.Previous_X;
    this.Previous_Y;

    this.Velocity_X = 0;
    this.Velocity_Y = 0;
    
    function Sprite() {
        return {
            "width":36,
            "height":8,
            "map":
            [
                [_, _, _, _, _],
                [_, _, _, _, _],
                [_, _, _, _, _],
            ]
        };
    }
}