import { DEPTH } from './constants.js';

export class MenuCursor {
    constructor({
        rows = 1,
        cols = 1,
        loop = true
    }) {
        this.rows = rows;
        this.cols = cols;
        this.loop = loop;

        this.row = 0;
        this.col = 0;
    }

    move (dx,dy) {
        let r = this.row + dy;
        let c = this.col + dx;

        if (this.loop) {
            r = (r + this.rows) % this.rows;
            c = (c + this.cols) % this.cols;
        } else {
            r = Phaser.Math.Clamp(r,0,this.rows-1);
            c = Phaser.Math.Clamp(c,0,this.cols-1);
        }

        this.row = r;
        this.col = c;
    }

    get index() {
        return this.row * this.cols + this.col;
    }
}

/*export class BattleCard extends Phaser.GameObjects.Container {
    constructor(scene,x,y,battleData,type,objects = {}) {
        super(scene,x,y);

        this.baseX = x;
        this.battleData = battleData;
        this.type = type;
        this.objects = objects;
        this.arrayObjects = Object.values(objects);

        for (const key in objects) {
            this.add(objects[key]);

            objects[key].x = 0;
            objects[key].y = 0;
        }

        if (this.type === "preview") {
            this.setSize(this.objects.text.width,
                         this.objects.text.height);
            this.objects.icon.y = 240-this.y;
            this.objects.icon.x = 480;
            this.objects.icon.scale = 1.3;
        } else {
            this.setSize(168, 168);
        }
    }

    UIUpdate(selected = false) {
        if (this.type === "preview") {
            this.objects.text.setTint(selected ? 0xffff33 : 0xffffff);
            this.objects.icon.setVisible(selected);
        } else {
            this.objects.border.setFillStyle(selected ? 0xffff33 : 0xffffff);
            if (selected) {
                this.objects.icon.clearTint();
            } else {
                this.objects.icon.setTintFill(0xffffff);
            }
        }
    }
}*/

export class UiContainer extends Phaser.GameObjects.Container {
    constructor(scene,hpManager,useKr) {
        super(scene,30,401);

        scene.add.existing(this);
        scene.updateables.push(this);
        this.setDepth(DEPTH.BATTLE.UI.LOW);

        this.hpManager = hpManager;
        this.useKr = useKr;

        this.createUI();
    }

    createUI() {
        const fontOption = {
            fontKey : "dataFont",
            fontSize : 18,
            color : 0xffffff,
            origin : 0
        }
        let offset = 0;
        this.playerText = this.scene.drawText(this.scene.playerData.name+"   LV "+this.scene.playerData.lv,0,0,fontOption);
        this.add(this.playerText);
        this.hp = this.scene.add.sprite(216,9,"assets/images/hp");
        this.add(this.hp);
        offset = this.hpManager.getMaxHp() * 1.25;
        this.maxHp_bar = this.scene.add.rectangle(242,-1,offset,21,0xC00000).setOrigin(0, 0);
        this.add(this.maxHp_bar)
        if(this.useKr) {
            this.kr_bar = this.scene.add.rectangle(242,-1,(this.hpManager.getKr() + this.hpManager.getHp) * 1.25,21,0xFF00FF).setOrigin(0, 0);
            this.kr = this.scene.add.sprite(266+offset,9,"assets/images/kr");
            offset += 39;
            this.add(this.kr_bar);
            this.add(this.kr);
        }
        this.hp_bar = this.scene.add.rectangle(242,-1,this.hpManager.getHp() * 1.25,21,0xFFFF00).setOrigin(0, 0);
        this.add(this.hp_bar);
        this.hpText = this.scene.drawText(`${this.hpManager.getHp()} / ${this.hpManager.getMaxHp()}`,245+offset+14,0,fontOption);
        this.add(this.hpText);
    }

    update0() {}

    update1() {}

    update2() {}

    refresh() {
        this.playerText.setText(this.scene.playerData.name+"   LV "+this.scene.playerData.lv);
        this.maxHp_bar.setSize(this.hpManager.getMaxHp() * 1.25,21);
        if(this.useKr) {
            this.kr_bar.setSize((this.hpManager.getKr() + this.hpManager.getHp) * 1.25,21);
            if (this.hpManager.getKr() > 0) {
                this.kr.setTint(0xFF00FF);
                this.hpText.setTint(0xFF00FF);
            }
        }
        this.hp_bar.setSize(this.hpManager.getHp() * 1.25, 21);
        this.hpText.setText(`${this.hpManager.getHp()} / ${this.hpManager.getMaxHp()}`);
    }
}