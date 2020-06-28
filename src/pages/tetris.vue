<template>
    <div class="center">
        <div class="platforma"></div>
    </div>
</template>

<script>
    export default {
        name: "tetris"
    }
</script>

<style scoped lang="less">
    .center {
        display: flex;
        justify-content: center;
    }
    .platforma {
        background-color: #6f6a5e;
        width: 100%;
        max-width: 600px;
        height: calc(100vh - 66px);
        margin-top: 5px;
        box-shadow: inset 0px 0px 50px 25px rgba(white, 0.3);
        border: 2px solid #6f6a5e;
    }
</style>