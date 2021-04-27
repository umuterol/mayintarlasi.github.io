class Field {

    constructor() {
        this.field;
        this.test;
    }


    getField() {
        return this.field;
    }

    createFieldArray(row, column, flag, i, j) {

        let field = this.addFlagToField(row, column, flag, Number(i), Number(j));
        field = this.addNumberToField(field, row, column);

        this.field = field;


        // console.log(...this.field);

    }


    addNumberToField(field, row, column) {

        let i, j, k, m, counter;

        for (i = 0; i < row; i++) {

            for (j = 0; j < column; j++) {
                counter = 0;

                if (field[i][j] == -1)
                    continue;

                for (k = i - 1; k <= i + 1; k++) {

                    if (k >= 0 && k < row) {

                        for (m = j - 1; m <= j + 1; m++) {
                            if (m >= 0 && m < column && field[k][m] === -1)
                                counter++;
                        }//m

                    }

                }//k
                // console.log(counter);
                field[i][j] = counter;
            }//j



        }//i



        return field;

    }


    addFlagToField(row, column, flag, i, j) {

        let field = new Array(row);

        for (let k = 0; k < row; k++) {
            field[k] = new Array(column);

            for (let m = 0; m < column; m++)
                field[k][m] = 0;

        }

        field = this.addRandomFlag(field, row, column, flag, i, j);

        return field;
    }


    addRandomFlag(field, row, column, flag, i, j) {




        let controller = flag;

        //start
        const start = this.start(row, column, i, j);

        console.log(...start);


        while (controller) {

            let k = Math.floor(Math.random() * row);
            let m = Math.floor(Math.random() * column);

            if (field[k][m] !== -1 && start[k][m]) {

                field[k][m] = -1;
                controller--;

            }

        }


        return field;
    }


    start(row, column, i, j) {

        const mark = new Array(row);
        for (let i = 0; i < row; i++) {
            mark[i] = new Array(column);
            for (let j = 0; j < column; j++)
                mark[i][j] = true;
        }

        //Kare bosluk kesinlestirmek
        mark[i][j] = false;
        mark[i][j + 1] = false;
        mark[i][j - 1] = false;
        //column asmayi sorun etmiyor
        if (i - 1 >= 0) {
            mark[i - 1][j] = false;
            mark[i - 1][j + 1] = false;
            mark[i - 1][j - 1] = false;
        }

        if (i + 1 < row) {
            mark[i + 1][j] = false;
            mark[i + 1][j + 1] = false;
            mark[i + 1][j - 1] = false;
        }



        let right = Math.random() * (row / 2) +2;
        let up = Math.random() * (row / 2) +2;
        let down = Math.random() * (row / 2) +2;
        let left = Math.random() * (row / 2) +2;


        let k = i, m = j;
        //right
        while (right > 0) {

            if (m < column)
                mark[k][m] = false;

            else
                break;

            m++;
            right--;

        }

        k = i, m = j;
        //up
        while (up > 0) {

            if (k >= 0)
                mark[k][m] = false;


            k--;
            up--;
        }


        k = i, m = j;
        //down
        while (down > 0) {

            if (k < row)
                mark[k][m] = false;


            k++;
            down--;
        }


        k = i, m = j;
        //left
        while (left > 0) {

            if (m >= 0)
                mark[k][m] = false;


            m--;
            left--;
        }


        return mark;

    }


}