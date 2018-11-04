function Starship(x, y, scale, speed) {
    //this.Sprite = new Image();
    this.Sprite = new DataPixels(Sprite().resting, scale).image;
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
        const w = "243, 243, 243";
        const m = "227, 32, 227";
        const g = "32, 227, 32";
        const b = "32, 32, 227";
        const y = "243, 243, 48";
        const f1 = "227, 32, 32";
        const f2 = "243, 48, 48";
        const f3 = "243, 113, 48";
        const f4 = "243, 178, 113";
        const f5 = "243, 243, 178"
    
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