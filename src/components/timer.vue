<template>
    <div class="timer">
        <span class="hours">{{hours}}</span>
        <span class="divider">:</span>
        <span class="minutes">{{minutes}}</span>
        <span class="divider">:</span>
        <span class="minutes">{{seconds}}</span>
        <div class="btn-toogle-time" v-if="!buttonHidden" @click="handleButton" />
    </div>
</template>

<script>
    import {up} from "../utils";

    export default {
        name: "timer",
        props: {
            buttonHidden: Boolean,
            on: Boolean,
            clear: Boolean,
        },
        data() {
            return {
                interval: null,
                timeIsRun: false,
                hours: '00',
                minutes: '00',
                seconds: '00',
            }
        },
        watch: {
            on: function() {
                if (this.on) {
                    this.goTime()
                } else {
                    this.stopTime();
                }
            },
            clear: function() {
                if (this.clear) {
                    this.clearTime();
                }
            }
        },
        methods: {
            goTime() {
                this.interval = setInterval(() => {
                    this.seconds = up(this.seconds, 60);
                    if (this.seconds === '00') {
                        this.minutes = up(this.minutes, 60);
                        if (this.minutes === '00') {
                            this.hours = up(this.hours, 99);
                        }
                    }
                    this.$emit('time', `${this.hours}:${this.minutes}:${this.seconds}`)
                }, 1000);
            },
            stopTime() {
                clearInterval(this.interval);
            },
            clearTime() {
                this.hours = '00';
                this.minutes = '00';
                this.seconds = '00';
            },
            handleButton() {
                if (this.timeIsRun) {
                    this.stopTime();
                    this.clearTime();
                    this.timeIsRun = false
                } else {
                    this.timeIsRun = true;
                    this.goTime();
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .timer {
        display: flex;
        align-items: center;
    }
    .btn-toogle-time {
        margin-left: 10px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #a82828;
        display: inline-block;
        cursor: pointer;
        transition: all 0.3s ease-out;

        &:hover {
            opacity: 0.7;
        }
        &:active {
            transform: scale(0.7);
        }
    }
</style>