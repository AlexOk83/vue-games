import VueRouter from 'vue-router'
import Tetris from './pages/tetris'
import Pjathashki from './pages/pjatnashki'


export default new VueRouter({
    routes: [
        {
            name: 'Тетрис',
            path: '/',
            component: Tetris,
        },
        {
            name: 'Пятнашки',
            path: '/game2',
            component: Pjathashki,
        },
    ],
})

