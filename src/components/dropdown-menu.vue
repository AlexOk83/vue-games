<template>
    <li class="nav-item dropdown" v-bind:class='{show: isOpen}'>
        <div class="overlay" @click="toggleMenu" />
        <a class="nav-link dropdown-toggle" href="#" role="button" @click="toggleMenu">{{title}}</a>
        <ul class="dropdown-menu"  v-bind:class='{show: isOpen}'>
            <router-link tag="a" class="dropdown-item" v-for="item of menu" :key="item.name" :to="item.path">{{item.name}}</router-link>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "dropdown-menu",
        data() {
            return {
                isOpen: false,
            }
        },
        props: ['title', 'menu'],
        methods: {
            toggleMenu() {
                this.isOpen = !this.isOpen;
                console.log(this);
            }
        },
        watch: {
            $route(toR) {
                if (this.currentPath !== toR.path) {
                    this.currentPath = toR.path;
                    this.isOpen = false;
                }

            }
        },
    }
</script>

<style scoped lang="less">
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: none;
    z-index: -1;
    .show & {
        display: block;
    }
}
</style>