<template>
    <div class="map-game">
        <div class="line" v-for="line in map">
            <div class="box" :class="getBoxClasses(box)" v-for="box in line" />
        </div>
        <div class="game-field">
            <div class="line" v-for="line in field">
                <div class="field" :class="getFieldClasses(box)" v-for="box in line" />
            </div>
        </div>
        <div :class="['dice', 'dice--red', `dice-count--${countRed}`]" >
            <div class="point" v-for="point in countRed"/>
        </div>
        <div :class="['dice', 'dice--green', `dice-count--${countGreen}`]" >
            <div class="point" v-for="point in countGreen"/>
        </div>
        <div :class="['dice', 'dice--yellow', `dice-count--${countYellow}`]" >
            <div class="point" v-for="point in countYellow"/>
        </div>
        <div :class="['dice', 'dice--blue', `dice-count--${countBlue}`]" >
            <div class="point" v-for="point in countBlue"/>
        </div>

    </div>


</template>

<script>
    import { CLEARED_MAP, GAME_FIELD } from './constants'

    export default {
        name: "Minku-Barricade",
        data() {
            return {
                field: GAME_FIELD,
                countRed: 6,
                countGreen: 2,
                countYellow: 4,
                countBlue: 5,
            }
        },
        methods: {
            getBoxClasses(box) {
                if (box === 9) {
                    return 'box-earth'
                }

                if (box === 1) {
                    return ['box-home', 'box-home--red']
                }
                if (box === 2) {
                    return ['box-home', 'box-home--green']
                }
                if (box === 3) {
                    return ['box-home', 'box-home--yellow']
                }
                if (box === 4) {
                    return ['box-home', 'box-home--blue']
                }
                if (box === 11) {
                    return ['box-road', 'box-home--red']
                }
                if (box === 12) {
                    return ['box-road', 'box-home--green']
                }
                if (box === 13) {
                    return ['box-road', 'box-home--yellow']
                }
                if (box === 14) {
                    return ['box-road', 'box-home--blue']
                }
                if (box === 8) {
                    return ['box-road', 'box-finish']
                }
                return 'box-road'
            },
            getFieldClasses(box) {
                if (box === 0) {
                    return 'field-way'
                }

                if (box === 1) {
                    return 'field--red'
                }
                if (box === 2) {
                    return 'field--green'
                }
                if (box === 3) {
                    return 'field--yellow'
                }
                if (box === 4) {
                    return 'field--blue'
                }
            }
        },
        computed: {
            map() {
                return CLEARED_MAP;
            },
            startField() {
                return GAME_FIELD;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "styles";
</style>