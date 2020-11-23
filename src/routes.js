import VueRouter from 'vue-router'
import Tetris from './pages/tetris'
import Pjathashki from './pages/pjatnashki'
import Home from './pages/home'


export default new VueRouter({
    routes: [
        {
            name: 'Главная',
            path: '/',
            component: Home,
            hidden: true,
        },
        {
            name: 'Пятнашки',
            path: '/game1',
            component: Pjathashki,
        },
        {
            name: 'Тетрис',
            path: '/game2',
            component: Tetris,
        },
    ],
})

