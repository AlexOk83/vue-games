<template>
    <div>
        <h2>Пятнашки</h2>
        <div class="buttons">
            <div class="button" @click="shuffleMatrix">Перемешать</div>
            <div class="button" @click="() => changeMatrix(3)">3 x 3</div>
            <div class="button" @click="() => changeMatrix(4)">4 x 4</div>
            <div class="button" @click="() => changeMatrix(5)">5 x 5</div>
        </div>
        <div class="body-game">
            <div class="fishka" :class="getFishkaClasses(f, type)" v-for="(f, index) of getMatrix" @click="() => move(index)">{{f}}</div>
        </div>
    </div>
</template>

<script>
    const matrix3 = [1,2,3,4,5,6,7,8,''];
    const matrix4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''];
    const matrix5 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,''];
    const matrixes = [matrix3, matrix4, matrix5];
    const shuffle = (arr) => {
        let j;
        let temp;
        let newArr = [...arr];

        for(let i = newArr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = newArr[j];
            newArr[j] = newArr[i];
            newArr[i] = temp;
        }
        return newArr;
    }
    export default {
        name: "Pjatnashki",
        data() {
            return {
                matrix: [],
                type: 4,
            }
        },
        computed: {
            getMatrix() {
               return this.matrix;
            }
        },
        methods: {
            getFishkaClasses(f, type) {
                let classes = ['fishka'];
                if (!f) {
                    classes.push('zero')
                };
                if (type) {
                    classes.push(`fishka-${type}`);
                }
                return classes.join(' ');
            },
            findZero(indexZero, index) {
                if (this.matrix[indexZero] === '') {
                    this.matrix[indexZero] = this.matrix[index];
                    this.matrix[index] = '';
                }
            },
            shuffleMatrix() {
                this.matrix = shuffle(this.matrix);
            },
            changeMatrix(type) {
                this.type = type;
                this.matrix = matrixes[type-3];
            },
            move(index) {
                const move3 = [
                    [1,3], [0,2,4], [1,5],
                    [0,4,6], [1,3,5,7], [2,4,8],
                    [3,7], [4,6,8], [5,7]
                ];

                const move4 = [
                    [1,4], [0,2,5], [1,3.6], [2,7],
                    [0,5,8], [1,4,6,9], [2,5,7,10], [3,6,11],
                    [4,9,12], [5,8,10,13], [6,9,11,14], [7,10,15],
                    [8,13], [9,12,14], [10,13,15], [11,14]
                ];
                const move5 = [
                    [1,5], [0,2,6], [1,3,7], [2,4,8], [3,9],
                    [0,6,10], [1,5,7,11], [2,6,8,12], [3,7,9,13], [4,8,14],
                    [5,11,15], [6,10,12,16], [7,11,13,17], [8,12,14,18], [9,13,19],
                    [10,16,20], [11,15,17,21], [12,16,18,22], [13,17,19,23], [14,18,24],
                    [15,21], [16,20,22], [17,21,23], [18,22,24], [19,23]
                ];
                const moves = [move3, move4, move5];

                moves[this.type-3][index].forEach(indexZero => {
                    this.findZero(indexZero, index);
                });
                this.$forceUpdate();
            },
        },
        created() {
            this.matrix = matrix4;
        }
    }
</script>

<style scoped lang="less">
    @color: #caa365;
    @border: darken(@color, 10);
    .buttons {
        width: 100%;
        display: flex;
        .button {
            margin-right: 10px;
            background-color: @color;
            line-height: 30px;
            padding: 5px 20px;
            border-bottom: 4px solid @border;
            border-radius: 10px;
            user-select: none;
            cursor: pointer;
            color: white;
            font-weight: 500;
            &:hover {
                background-color: @border;
            }
            &:active {
                margin-top: 4px;
                border-bottom: none;
            }
        }
    }
    .body-game {
        padding: 5px;
        width: 600px;
        height: 600px;
        background-color: @color;
        margin: 50px auto;
        border: 30px solid @border;
        box-shadow: inset 0 0 50px rgba(white, 0.3);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .fishka {

        text-align: center;
        border: 4px solid @border;

        font-size: 40px;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
        border-radius: 7px;
        &-3 {
            width: (600px - 80px) / 3;
            height: (600px - 80px) / 3;
            line-height: 500px / 3;
        }
        &-4 {
            width: (600px - 80px) / 4;
            height: (600px - 80px) / 4;
            line-height: 500px / 4;
        }
        &-5 {
            width: (600px - 80px) / 5;
            height: (600px - 80px) / 5;
            line-height: 500px / 5;
        }
        &.zero {
            border: none;
            cursor: default;
            &:hover {
                background-color: initial;
            }
        }
        &:hover {
            background-color: @border;
            transition: all 0.3s ease-out;
        }
    }
</style>