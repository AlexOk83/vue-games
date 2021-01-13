<template>
    <div class="display">
        <div class="line" v-for="(line, indexLine) in field">
            <div class="box" v-for="(box, indexBox) in line" :class="{ 'zero': box === 1, 'cross': box === 2 }" @click="() => changeBox(indexLine, indexBox)"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ticTacToe",
        data() {
            return {
                field: [
                    [0,0,0],
                    [0,0,0],
                    [0,0,0],
                ],
                lastElement: 1,
            }
        },
        methods: {
            changeBox(line, box) {

                if (this.field[line][box] !== 0) {
                    return null;
                }

                if (this.lastElement === 1) {
                    this.lastElement = 2;
                    this.field[line][box] = 2;
                } else {
                    this.lastElement = 1;
                    this.field[line][box] = 1;
                }
                this.$forceUpdate();

            }
        }

    }
</script>

<style scoped lang="less">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .display {
        width: 600px;
        border: 1px solid grey;
        margin: 20px auto;
        padding: 20px;
    }
    .line {
        width: 100%;
        height: 200px;
        border-bottom: 1px solid grey;
        display: flex;
        &:last-child {
            border-bottom: 0;
        }
        .box {
            cursor: pointer;
            width: 200px;
            height: 200px;
            border-right: 1px solid grey;
            position: relative;
            transition: all 0.3s ease-out;
            &:last-child {
                border-right: 0;
            }
            &:active {
                box-shadow: inset 0 0 10px rgba(black, 0.2);
            }
            &.zero {
                &:before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    margin-top: -65px;
                    left: 50%;
                    margin-left: -75px;
                    display: block;
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    border: 5px solid grey;
                    background: transparent;
                }
                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    margin-top: -65px;
                    left: 50%;
                    margin-left: -65px;
                    display: block;
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    border: 5px solid grey;
                    background: transparent;
                    opacity: 0.3;

                }
            }
            &.cross {
                &:before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    margin-top: -75px;
                    left: 80px;
                    display: block;
                    width: 5px;
                    height: 150px;
                    background-color: grey;
                    transform: rotate(-45deg);
                    box-shadow: 7px 7px 4px rgba(black, 0.3);
                }
                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    margin-top: -75px;
                    left: 80px;
                    display: block;
                    width: 5px;
                    height: 150px;
                    background-color: grey;
                    transform: rotate(45deg);
                    box-shadow: 7px -7px 4px rgba(black, 0.3);
                }
            }
        }
    }
</style>