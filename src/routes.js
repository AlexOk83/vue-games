import VueRouter from 'vue-router'
import Tetris from './pages/tetris'
import Pjathashki from './pages/pjatnashki'
import Home from './pages/home'
import TicTac from './pages/ticTacToe'


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
        {
            name: 'Крестики - нолики',
            path: '/game3',
            component: TicTac,
        },
    ],
})

