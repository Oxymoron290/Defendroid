function Lander(x, y, scale, speed){
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
        const _ = "0, 0, 0, 0";
        const g = "32, 227, 32";
        const y = "243, 243, 48";

        return {
            "width":12,
            "height":8,
            "map":
            [
                [_, _, _, y, y, y, y, y, y, _, _, _],
                [_, g, y, y, y, y, y, y, y, y, g, _],
                [g, g, g, _, _, g, g, _, _, g, g, g],
                [g, g, g, _, _, g, g, _, _, g, g, g],
                [_, g, g, g, g, g, g, g, g, g, g, _],
                [_, _, g, g, y, g, g, y, g, g, _, _],
                [_, g, g, _, _, g, g, _, _, g, g, _],
                [g, g, _, _, _, g, g, _, _, _, g, g]
            ]
        };
    }
}