<template>
    <div class="center">
        <div class="platforma">
            <div class="line" v-for="line in getField">
                <div class="box" v-for="box in line" :class="{ 'active': box }"/>
            </div>
        </div>
        <div class="panel-managment">
            <div class="table-count">{{ count }}</div>
            <div class="btn" @click="newGame">Новая игра</div>
            <div class="btn" @click="toggleGame">{{isStopGame ? 'Продолжить игру' : 'Поставить на паузу' }}</div>
        </div>
        <div class="joystic">
            <div class="arrow arrow-up" @click="() => {
                this.rotatefigure();
            }"/>
            <div class="arrow arrow-down" @click="() => {
                this.canMoveDown().then(canMove => {
                    if (canMove) {
                        this.moveFigureDown();
                    }
                });
            }" />
            <div class="arrow arrow-left" @click="() => {
                this.canMoveLeft().then(fine => {
                    if (fine === 0) {
                        this.moveFigureLeft();
                    }
                })
            }" />
            <div class="arrow arrow-right" @click="() => {
                this.canMoveRight().then(fine => {
                    if (fine === 0) {
                        this.moveFigureRight();
                    }
                })
            }"/>
            <div class="btn btn-new" @click="newGame"/>
            <div class="btn btn-pause" @click="toggleGame"/>


        </div>
    </div>

</template>

<script>
    import {NEW_LINE, VARIANS} from "../constants";
    import {randomInt} from "../utils";

    const ARROW_LEFT = 'ArrowLeft';
    const ARROW_RIGHT = 'ArrowRight';
    const ARROW_DOWN = 'ArrowDown';
    const ARROW_UP = 'ArrowUp';

    export default {
        name: "tetris",
        data() {
            return {
                f1: [
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                f2: [
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                f3: [
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                f4: [
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
                ],

                f5: [
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                f6: [
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                clearedField: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                interval: null,
                count: 0,
                level: 1,
                isStopGame: false,
                waiting: false,
                gameOver: false,
                typeFigure: null,
                posFigure: 0,
                field: [
                    [0, 3, 0, 0, 3, 0, 0, 0, 3, 0],
                    [0, 3, 0, 0, 3, 0, 0, 0, 3, 0],
                    [0, 3, 3, 3, 3, 0, 0, 0, 3, 0],
                    [0, 3, 0, 0, 3, 0, 0, 0, 3, 0],
                    [0, 3, 0, 0, 3, 0, 0, 0, 3, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 3, 3, 0, 0, 3, 3, 0, 0],
                    [0, 3, 0, 0, 3, 3, 0, 0, 3, 0],
                    [0, 3, 0, 0, 0, 0, 0, 0, 3, 0],
                    [0, 0, 3, 0, 0, 0, 0, 3, 0, 0],
                    [0, 0, 0, 3, 0, 0, 3, 0, 0, 0],
                    [0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 3, 3, 0, 0, 0, 0, 0, 0, 0],

                    [3, 0, 0, 0, 0, 0, 3, 3, 0, 0],
                    [3, 0, 3, 3, 0, 3, 0, 0, 3, 0],
                    [3, 0, 0, 3, 0, 3, 0, 0, 3, 0],
                    [0, 3, 3, 0, 0, 0, 3, 3, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            },
        },
        methods: {
            newGame() {
                this.field = this.getClearedField;
                this.count = 0;
                this.level = 1;
                this.gameOver = false;
                clearInterval(this.interval);
                this.createFigure();
                this.startGame(1000);
            },
            createFigure() {
                this.typeFigure = randomInt(0, 6);
                this.posFigure = 0;
                const f = this.getFigures[this.typeFigure];
                for (let line = 0; line < 4; line++) {
                    this.field[line].forEach((box, indexBox) => {
                        if (box === 3 && f[line][indexBox] === 1) {
                            this.gameOver = true;
                        }
                    })
                    this.field[line] = f[line].slice(0, f[line].length);
                }
                this.$forceUpdate();
                this.waiting = false;
            },
            startGame(interval) {
                this.interval = setInterval(() => {
                    if (this.gameOver) {
                        return;
                    }
                    this.canMoveDown().then(canMove => {
                        if (canMove) {
                            this.moveFigureDown();
                        } else {
                            this.figureFinished().then(() => {
                                this.removeLines();
                                this.createFigure();
                            });
                        }
                    })

                }, interval);
            },
            removeLines() {
                const indexesRemove = [];
                this.field.forEach((line, index) => {
                    let count = 0;
                    const len = line.length;
                    line.forEach(box => {
                        if (box === 3) {
                            count++;
                        }
                    });
                    if (count === len) {
                        indexesRemove.push(index);
                        this.count = this.count + 10 * this.level;
                        if (this.count > 100 * this.level) {
                            this.level++;
                        }
                    }
                });

                indexesRemove.forEach(index => {
                    this.field.unshift(NEW_LINE);
                    this.field.splice(index + 1, 1);
                })
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
                if (e.code === ARROW_UP) {
                    this.rotatefigure();
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
                    for (let indexBox = line.length - 1; indexBox >= 0; indexBox--) {
                        if (this.field[indexLine][indexBox] === 1) {
                            this.field[indexLine][indexBox + 1] = 1
                            this.field[indexLine][indexBox] = 0
                        }
                    }
                });
                this.$forceUpdate();
            },
            getFigure() {
                if (Array.isArray(VARIANS[this.typeFigure])) {
                    const variantCount = VARIANS[this.typeFigure].length;

                    if (variantCount === 1) {
                        return {
                            variantCount,
                            current: VARIANS[this.typeFigure][0],
                            next: VARIANS[this.typeFigure][0],
                            pos: 0,
                        }
                    }

                    if (VARIANS[this.typeFigure][this.posFigure]) {
                        const current = VARIANS[this.typeFigure][this.posFigure];
                        let next = VARIANS[this.typeFigure][0];
                        let pos = 0;

                        if (VARIANS[this.typeFigure][this.posFigure + 1]) {
                            next = VARIANS[this.typeFigure][this.posFigure + 1];
                            pos = this.posFigure + 1;
                        }

                        return {variantCount, current, next, pos}
                    }

                    return {
                        variantCount,
                        current: VARIANS[this.typeFigure][0],
                        next: VARIANS[this.typeFigure][1] || VARIANS[this.typeFigure][0],
                        pos: VARIANS[this.typeFigure][1] ? 1 : 0
                    }
                }
            },
            getCoordinates() {
                return new Promise(resolve => {
                    let coordinates = null;
                    this.field.forEach((line, y) => {
                        line.forEach((box, x) => {
                            if (box === 1 && coordinates === null) {
                                coordinates = [y, x];
                            }
                        });
                    });

                    resolve(coordinates);
                })
            },
            rotatefigure() {
                // мы знаем что это за фигура
                const {current, next, pos} = this.getFigure();
                const h = current.length - 1;
                console.log(current, next, h);
                // нужно выяснить координаты верхнего левого угла фигуры
                this.getCoordinates().then(coordinates => {
                    console.log(coordinates);
                    let offset = 0;
                    if (current[0][0] !== 1) {
                        if (current[0][1] === 1) {
                            offset = 1;
                        } else {
                            offset = 2;
                        }
                    }
                    this.field = this.field.map((line, y) => {
                        if (y < coordinates[0] || y > coordinates[0] + h) {
                            return line;
                        }

                        return line.map((box, x) => {
                            if (x < coordinates[1] - offset || x > coordinates[1] - offset + h) {
                                return box;
                            }

                            return next[y - coordinates[0]][x - coordinates[1] + offset];
                        })
                    });
                    this.posFigure = pos;
                })


            }
        },
        watch: {
            gameOver: function () {
                if (this.gameOver) {
                    alert('game over');
                }
            },
            level: function () {
                clearInterval(this.interval);
                const int = 1000 - (100 * this.level) > 100 ? 1000 - (100 * this.level) : 100;
                this.startGame(int);
            }
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
        flex-wrap: wrap;
        align-items: flex-start;
        height: calc(100vh - 80px);
    }

    .panel-managment {
        width: 300px;
        margin-top: 25px;
        margin-left: 30px;
        border: 1px solid Black;
        padding: 20px;
        @media screen and (max-width: 768px) {
            display: none;
        }

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
                @media screen and (max-width: 768px) {
                    width: 20px;
                    height: 20px;
                }

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

    .joystic {
        display: none;
        @media screen and (max-width: 768px) {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            height: 100px;
            position: fixed;
            left: 0;
            bottom: 0;
            background-color: #ccc;
        }

        .arrow {
            width: 40px;
            height: 40px;
            border: 1px solid black;
            text-align: center;
            line-height: 30px;
            font-size: 40px;

            &-left {
                &:before {
                    content: '\2190';
                    display: inline-block;
                }
            }

            &-right {
                &:before {
                    content: '\2192';
                    display: inline-block;
                }
            }

            &-up {
                &:before {
                    content: '\2191';
                    display: inline-block;
                }
            }

            &-down {
                &:before {
                    content: '\2193';
                    display: inline-block;
                }
            }
        }

        .btn {
            width: 60px;
            height: 60px;
            border: 1px solid black;
            border-radius: 50%;
            box-shadow: inset 2px 2px 4px rgba(black, 0.5);
            cursor: pointer;

            &:before {
                line-height: 45px;
                text-transform: uppercase;
                font-size: 12px;
                font-weight: bold;
            }

            &-new {
                background-color: #29e34f;

                &:before {
                    content: 'start';
                }
            }

            &-pause {
                background-color: #2973e3;

                &:before {
                    content: 'pause';
                }
            }
        }
    }

</style>