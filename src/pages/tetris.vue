<template>
    <div class="center">
        <div class="platforma">
            <div class="line" v-for="line in getField" >
                <div class="box" v-for="box in line" :class="{ 'active': box }" />
            </div>
        </div>
        <div class="panel-managment">
            <div class="table-count">{{ count }}</div>
            <div class="btn" @click="newGame">Новая игра</div>
            <div class="btn" @click="toggleGame">{{isStopGame ? 'Продолжить игру' : 'Поставить на паузу' }}</div>
        </div>
    </div>

</template>

<script>
    import {CLEAR_FIELD, figures} from "../constants";
    import {randomInt} from "../utils";

    const ARROW_LEFT = 'ArrowLeft';
    const ARROW_RIGHT = 'ArrowRight';
    const ARROW_DOWN = 'ArrowDown';

    export default {
        name: "tetris",
        data() {
            return {
                f1: [
                    [0,0,0,0,1,0,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0],
                    [0,0,0,0,1,1,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]
                ],

                f2: [
                    [0,0,0,0,1,1,0,0,0,0],
                    [0,0,0,0,1,1,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]
                ],

                f3: [
                    [0,0,0,0,1,0,0,0,0,0],
                    [0,0,0,0,1,1,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]
                ],

                f4: [
                    [0,0,0,1,1,0,0,0,0,0],
                    [0,0,0,0,1,1,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]
                ],

                f5: [
                    [0,0,0,0,1,0,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0],
                    [0,0,0,1,1,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]
                ],

                f6: [
                    [0,0,0,0,1,0,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0]
                ],

                clearedField: [
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],

                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],

                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],

                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]
                ],
                interval: null,
                count: 0,
                isStopGame: false,
                waiting: false,
                field: [
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],

                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],

                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],

                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,3,0,0,0,0,0,0,0,0],
                    [0,3,0,0,3,3,0,3,3,0],
                    [3,3,3,3,3,3,3,3,3,3]
                ]
            }
        },
        computed: {
            getField() {
                return this.field
            },
            getClearedField() {
                return this.clearedField.slice(0, this.clearedField.length);
            },
            getFigures() {
                return [
                    this.f1,
                    this.f2,
                    this.f3,
                    this.f4,
                    this.f5,
                    this.f6,
                ]
            }
        },
        methods: {
            newGame() {
                this.field = this.getClearedField;
                this.count = 0;
                clearInterval(this.interval);
                this.createFigure();
                this.startGame();
            },
            createFigure() {
                const numb = randomInt(0, 6);
                const f = this.getFigures[numb];
                for (let line = 0; line < 4; line++) {
                    this.field[line] = f[line].slice(0, f[line].length);
                }
                this.$forceUpdate();
                this.waiting = false;
            },
            startGame() {
                this.interval = setInterval(() => {
                    this.canMoveDown().then(canMove => {
                        if (canMove) {
                            this.moveFigureDown();
                        } else {
                            this.figureFinished().then(this.createFigure);
                        }
                    })

                }, 1000)
            },
            toggleGame() {
                this.isStopGame = !this.isStopGame;
            },
            onKeyDown(e) {
                if (e.code === ARROW_LEFT) {
                    this.canMoveLeft().then(fine => {
                        if (fine === 0) {
                            this.moveFigureLeft();
                        }
                    })
                }
                if (e.code === ARROW_RIGHT) {
                    this.canMoveRight().then(fine => {
                        if (fine === 0) {
                            this.moveFigureRight();
                        }
                    })

                }
                if (e.code === ARROW_DOWN && !this.waiting) {
                    this.canMoveDown().then(canMove => {
                        if (canMove) {
                            this.moveFigureDown();
                        }
                    })
                }
            },
            canMoveLeft() {
                return new Promise(resolve => {
                    let fine = 0;
                    this.field.forEach(line => {

                        if (line[0] === 1) {
                            fine = 1
                        }

                    });

                    resolve(fine);
                })
            },
            canMoveRight() {
                return new Promise(resolve => {
                    let fine = 0;
                    this.field.forEach(line => {

                        if (line[line.length - 1] === 1) {
                            fine = 1
                        }

                    });

                    resolve(fine);
                })
            },
            moveFigureDown() {
                if (!this.isStopGame) {
                    // сдвигаем ее на 1 клетку вниз
                    for (let indexLine = this.field.length - 1; indexLine >= 0; indexLine--) {
                        this.field[indexLine].forEach((box, indexBox) => {
                            if (box === 1) {
                                if (this.field[indexLine + 1]) {
                                    this.field[indexLine + 1][indexBox] = 1;
                                    this.field[indexLine][indexBox] = 0;
                                }
                            }
                        })
                    }
                    this.$forceUpdate();
                }
            },
            canMoveDown() {
                return new Promise(resolve => {
                    let canMove = true;
                    let countBox = 0;

                    this.field.forEach((line, indexLine) => {
                        line.forEach((box, indexBox) => {
                            if (box === 1) {
                                countBox++;
                                if (this.field[indexLine + 1] === undefined || this.field[indexLine + 1][indexBox] === 3) {
                                    canMove = false;
                                }
                            }
                        });
                    });
                    if (countBox === 0) {
                        canMove = false;
                    }

                    resolve(canMove);
                })
            },
            figureFinished() {
                return new Promise(resolve => {
                    this.waiting = true;
                    this.field = this.field.map(line => line.map(box => {
                        if (box === 1) {
                            return 3;
                        }

                        return box;
                    }));

                    resolve();
                })

            },
            moveFigureLeft() {
                this.field.forEach((line, indexLine) => {
                    line.forEach((box, indexBox) => {
                        if (box === 1) {
                            this.field[indexLine][indexBox - 1] = 1
                            this.field[indexLine][indexBox] = 0
                        }
                    })
                });
                this.$forceUpdate();
            },
            moveFigureRight() {
                this.field.forEach((line, indexLine) => {
                    for (let indexBox = line.length - 1; indexBox >= 0; indexBox --) {
                        if (this.field[indexLine][indexBox] === 1) {
                            this.field[indexLine][indexBox + 1] = 1
                            this.field[indexLine][indexBox] = 0
                        }
                    }
                });
                this.$forceUpdate();
            },
            rotatefigure() {
                this.field.forEach(line => {
                    line.forEach(box => {

                    })
                })
            },
        },
        created() {
            document.addEventListener('keydown', this.onKeyDown);
        }


    }
</script>

<style scoped lang="less">
    .center {
        display: flex;
        justify-content: center;
        /*align-items: center;*/
        align-items: flex-start;
        height: calc(100vh - 80px);
    }
    .panel-managment {
        width: 300px;
        margin-top: 25px;
        margin-left: 30px;
        border: 1px solid Black;
        padding: 20px;
        .table-count {
            border: 1px solid #ccc;
            text-align: right;
            font-style: italic;
            padding: 5px 15px;
            font-size: 20px;
            font-family: "Arial Black", serif;
        }
        .btn {
            text-align: center;
            width: 100%;
            background-color: #cccccc;
            margin-top: 10px;
            text-transform: uppercase;
            font-weight: bold;
            cursor: pointer;
            user-select: none;
            border-bottom: 4px solid darken(#ccc, 10);
            &:hover {
                background-color: darken(#ccc, 10);
            }
            &:active {
                margin-top: 14px;
                border-bottom: 0;
            }
        }
    }
    .platforma {
        margin-top: 25px;
        border: 2px solid #6f6a5e;
        padding: 5px;
        .line {
            display: flex;
            .box {
                width: 30px;
                height: 30px;
                border: 1px solid #ccc;
                padding: 5px;
                opacity: 0.5;
                &:before {
                    content: '';
                    width: 100%;
                    height: 100%;
                    display: block;
                    background-color: #ccc;
                }
                &.active {
                    opacity: 1;
                    &:before {
                        background-color: #1b1e21;
                    }
                }
            }
        }
    }

</style>