class UI {


    constructor() {

        this.field = document.getElementsByTagName("table")[0];
        this.numberFlag = document.getElementById("numberFlag");

    }



    createTable(row, column, select, flag) {

        this.numberFlag.innerHTML = flag;

        //Table clear
        this.clearField();


        for (let i = 0; i < row; i++) {

            let newTr = document.createElement("tr");

            // var newTd = document.createElement("td");
            // var img = document.createElement("img");
            // img.src = "../image/eight.png"
            // newTd.appendChild(img);
            // newTd.classList.add(select);
            // newTr.appendChild(newTd);


            for (let j = 0; j < column; j++) {
                let newTd = document.createElement("td");
                newTd.id = i + "_" + j;
                var img = document.createElement("img");
                img.id = "null";
                newTd.appendChild(img);
                newTd.classList.add(select);
                newTr.appendChild(newTd);

            }




            this.field.appendChild(newTr);


        }

    }


    clearField() {

        while (this.field.firstChild) {
            this.field.firstChild.remove();
        }

    }





    addFlagToUI(target) {


        if (target.firstChild.id === "null" && this.numberFlag.innerHTML != 0) {

            target.firstChild.src = "../image/flag.svg";
            target.firstChild.id = "flag";
            target.classList.add ("flag")

            let numberFlag = (Number)(this.numberFlag.innerHTML);
            this.numberFlag.innerHTML = --numberFlag;

        }

    }


    removeFlagFromUI(target) {
        target.src = "";
        target.id = "null";
        target.parentElement.classList.remove("flag");

        let numberFlag = (Number)(this.numberFlag.innerHTML);
        this.numberFlag.innerHTML = ++numberFlag;
    }




    showAllField(field) {

        field.forEach((row, i) => {

            row.forEach((column, j) => {

                if (column == -1) {

                    const id = `${i}_${j}`;
                    const square = document.getElementById(id);
                    square.firstChild.src = "../image/bomb.svg";
                    square.firstChild.id = "-1";


                }
                else if (column == 0) {
                    const id = `${i}_${j}`;
                    const square = document.getElementById(id);
                    square.firstChild.id = "null";
                }
                else {
                    const id = `${i}_${j}`;
                    const square = document.getElementById(id);
                    square.firstChild.src = `../image/${column}.png`;
                    square.firstChild.id = column;
                }


            })

        })

    }


    showSquare(field, target , i , j) {


        // const [i, j] = this.getIndex(target);
        const value = field[i][j];

        if (value > 0 && value < 9) {

            target.firstChild.src = `../image/${value}.png`;
            target.firstChild.id=value;
            field[i][j] = 10;
        }

        else if (value == 10)
            return

        else if (value == -1) {
            target.firstChild.src = `../image/bomb.svg`;
            target.firstChild.id=value;
            this.gameOver(field);

        }

        // 0 İSE 

        else if (value == 0) {
            this.fillEmpty(field, Number(i), Number(j));
        }

        this.winControl(field);


    }


    winControl(field) {

        let control = true;
        for (let i = 0; i < field.length; i++)
            for (let j = 0; j < field[0].length; j++)
                if (field[i][j] > 0 && field[i][j] < 9) {
                    control = false;
                    break;
                }

        if (control)
            this.win(field);

    }


    win(field) {




        field.forEach((column, i) => {
            column.forEach((value, j) => {

                if (value == 10) {

                    document.getElementById(`${i}_${j}`).firstChild.src = "../image/win.png";

                }

            })
        });




        setTimeout(() => {
            this.showAlert("Tebrikler");
        }, 100);


        setTimeout(() => {
            window.location.reload();
        }, 200);

    }




    fillEmpty(field, i, j) {



        if ((i < 0 || i >= field.length) || (j < 0 || j >= field[0].length)) {
            return;
        }


        if (field[i][j] == 0) {
            document.getElementById(`${i}_${j}`).classList.remove("flag");
            document.getElementById(`${i}_${j}`).classList.add("fill");
            document.getElementById(`${i}_${j}`).firstChild.src="";
            document.getElementById(`${i}_${j}`).firstChild.id=0;
            field[i][j] = 10; //Birdaha bakilmasin
            
        }
        else if (field[i][j] == 10) {
            return;
        }
        else {
            document.getElementById(`${i}_${j}`).firstChild.src = `../image/${field[i][j]}.png`;
            document.getElementById(`${i}_${j}`).firstChild.id=field[i][j];
            document.getElementById(`${i}_${j}`).classList.remove("flag");
            field[i][j] = 10;
            return;
        }


        // Saga - Yukari - Asagi - Sola
        this.fillEmpty(field, i, j + 1);
        this.fillEmpty(field, i - 1, j);
        this.fillEmpty(field, i + 1, j);
        this.fillEmpty(field, i, j - 1);


    }


    showAlert(message) {

        alert(message);

    }



    







    gameOver(field) {

        let control = 0;

        field.forEach((column, i) => {
            column.forEach((value, j) => {
                if (value == -1) {
                    setTimeout(() => {
                        document.getElementById(`${i}_${j}`).firstChild.src = "../image/bomb.svg";
                    }, control += 5);
                }
            })
        });


        setTimeout(() => {
            this.showAlert("Game Over");
        }, control += 50);


        setTimeout(() => {
            window.location.reload();
        }, control++);


    }



}











