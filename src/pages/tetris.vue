<template>
    <div class="center">
        <div class="display">
            <div class="platforma">
                <div class="line" v-for="line in getField">
                    <div class="box" v-for="box in line" :class="{ 'active': box }"/>
                </div>
                <div class="btn-left" :class="{'hide' : isGame}" @click="() => {
                    this.canMoveLeft().then(fine => {
                    if (fine === 0) {
                        this.moveFigureLeft();
                    }
                })
                 }">left</div>
                <div class="btn-right" :class="{'hide' : isGame}" @click="() => {
                    this.canMoveRight().then(fine => {
                    if (fine === 0) {
                        this.moveFigureRight();
                    }
                })
                 }">right</div>
                <div class="btn-rotate" :class="{'hide' : isGame}" @click="() => { this.rotatefigure(); }">rotate</div>
                <div class="btn-down" :class="{'hide' : isGame}" @click="() => {
                    this.canMoveDown().then(canMove => {
                        if (canMove) {
                            this.moveFigureDown();
                        }
                    });
                }">down</div>

            </div>
            <div class="table">
                <div class="table__field">
                    <div class="label">Очки</div>
                    <div class="count">{{ count }}</div>
                </div>
                <div class="table__field">
                    <div class="label">Убрано</div>
                    <div class="count">{{ countLine }}</div>
                </div>
                <div class="table__field">
                    <div class="label">Уровень</div>
                    <div class="count">{{ level }}</div>
                </div>
                <div class="table__field">
                    <div class="label">Следующая</div>
                    <div class="line" v-for="line in nextBox">
                        <div class="box" v-for="box in line" :class="{ 'active': box }"/>
                    </div>
                </div>
                <div class="btn" @click="newGame">Новая игра</div>
                <div class="btn" @click="toggleGame">{{isStopGame ? 'Продолжить' : 'на паузу' }}</div>
            </div>
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

                f7: [
                    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                f8: [
                    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                f9: [
                    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                f10: [
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                f11: [
                    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                interval: null,
                count: 0,
                countLine: 0,
                level: 1,
                isStopGame: false,
                waiting: false,
                gameOver: false,
                typeFigure: null,
                typeNextFigure: null,
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
                ],
                nextBox: [],
            }
        },
        computed: {
            getField() {
                return this.field
            },
            getFigures() {
                return [
                    this.f1,
                    this.f2,
                    this.f3,
                    this.f4,
                    this.f5,
                    this.f6,
                    this.f7,
                    this.f8,
                    this.f9,
                    this.f10,
                    this.f11,
                ]
            },
            isGame() {
                return !this.isStopGame && this.interval !== null;
            }
        },
        methods: {
            newGame() {
                this.field = [
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
                this.count = 0;
                this.level = 1;
                this.gameOver = false;
                clearInterval(this.interval);
                this.nextFigure(true);
                this.createFigure();
                this.startGame(1000);
            },
            nextFigure(start) {
                this.typeNextFigure = randomInt(0, 11);
                if (!start) {
                    this.nextBox = VARIANS[this.typeNextFigure][0];
                } else {

                }
            },
            createFigure() {
                this.typeFigure = this.typeNextFigure;
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
                this.nextFigure();
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
                        this.countLine = this.countLine + 1;
                        this.count = this.count + (10 * this.level);
                        if (this.count > 1000 * this.level) {
                            this.level = this.level + 1;
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
                            this.count = this.count + this.level;
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
    @import "../styles/tetris";

</style>