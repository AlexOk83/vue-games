<template>
    <div id="app">
        <Header />
        <div class="container">
            <router-view />
        </div>

    </div>
</template>

<script>
    import Header from './components/Header'

    export default {
        components: {
            Header,
        },
        methods: {

        },
        created() {

        }
    }
</script>

<style scoped>

</style>