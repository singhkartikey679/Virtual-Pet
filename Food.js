class Food {

    constructor() {
        this.image = loadImage("images/Milk.png");
    }

    //For Reading value of Firebase database index 'Food'
    getFoodStock(data) {
        foodStock = data.val();
    }


    updateFoodStock(value) {
        if (foodStock > 0) {
            this.min = minute();
            if (this.min < 10) {
                this.min = "0" + this.min;
            }
            database.ref('/').update({
                Food: value,
                feedTimeHour: hour(),
                feedTimeMin: this.min,
                date: day(),
                month: month(),
                year: year()
            });
        }
    }

    display() {
        var x = 70,
            y = 100;

        imageMode(CENTER);
        if (foodStock != 0) {
            for (var i = 0; i < foodStock; i++) {
                if (i % 10 == 0) {
                    x = 70;
                    y += 100;
                }
                image(this.image, x, y, 70, 70);
                x += 35;
            }
        }
    }
}
