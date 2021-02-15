<template>
    <div :class="['dice', `dice--${classModify}`, classes]" @click="rollDice">
        <div class="point" v-for="point in count" v-if="!wait" />
        <div class="point" v-for="point in 6" v-if="wait" />

    </div>
</template>

<script>
    import {randomInt} from "../../utils";

    export default {
        props: {
          classModify: String,
        },
        name: "dice",
        data() {
            return {
                count: 6,
                wait: false,
            }
        },
        computed: {
            classes() {
                if (this.wait) {
                    return `dice--wait`
                }

                return `dice-count--${this.count}`
            }
        },
        methods: {
            rollDice() {
                this.wait = true;
                this.count = randomInt(1, 6);
                setTimeout(() => {
                    this.wait = false;
                }, 500)
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "styles";
</style>