<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link tag="a" class="navbar-brand" to="/" >Мои игры</router-link>
            <button class="navbar-toggler" type="button" @click="collapse">
                <span class="navbar-toggler-icon" />
            </button>
            <div v-bind:class='{show: show}' class="collapse navbar-collapse" >

                <ul class="navbar-nav" v-for="item of routes">
                    <DropdownMenu v-if="item.dropdown" :title="item.title" :menu="item.dropdown" />
                    <router-link tag="li" class="nav-item" :to="item.path" active-class="active"  v-else>
                        <a class="nav-link">{{item.title}}</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import DropdownMenu from './dropdown-menu';

    export default {
        name: "header",
        components:{
            DropdownMenu,
        },
        data() {
            return {
                routes: [],
                showMenu: false,
                currentPath: this.$route.path
            }
        },
        created() {
            this.$router.options.routes.forEach(route => {
                if (!route.hidden) {
                    this.routes.push({
                        title: route.name,
                        path: route.path,
                        dropdown: route.children,
                    })
                }
            })
        },
        watch: {
            $route(toR) {
                if (this.currentPath !== toR.path) {
                    this.currentPath = toR.path;
                    this.showMenu = false;
                }

            }
        },
        methods: {
            collapse() {
                this.showMenu = !this.showMenu
            }
        },
        computed: {
            show() {
                return  this.showMenu
            }
        },
    }
</script>

<style scoped>

</style>