<template>
    <div>
        <h1>Привет!</h1>
        <timer
            :on="timerOn"
            :button-hidden="true"
        />
    </div>
</template>

<script>
    import Timer from '../components/timer';
    export default {
        name: "home",
        components: {
            Timer
        },
        data() {
            return {
                timerOn: false
            }
        },
        created() {
            this.timerOn = false;
            setTimeout(() => {
                this.timerOn = true;
            }, 100);
        }
    }
</script>

<style scoped>

</style>