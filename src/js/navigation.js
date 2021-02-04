import $ from 'jquery'
import { fetchPlayerList } from './teamInfo'
import { API_KEY } from './config'

const fetchTeams = () => $.ajax({
    url: 'http://api.football-data.org/v1/competitions/398/teams',
    headers: {'X-Auth-Token': API_KEY}
})

    .then(data => {
        renderTeamList(data.teams.slice(0, 5))
        const firstTeam = data.teams[0]
        const href = firstTeam._links.self.href
        fetchPlayerList(href.split('teams/')[1])
        attachEvents()
        return firstTeam
    }, () => console.log('fail'))
    .then(firstTeam => console.log(firstTeam))
    .always(() => console.log('do some cleanup'))

const attachEvents = () => {
    const $navItems = $('.nav-item')
    $navItems.on('click', (e) => {
        const id = $(e.currentTarget).data('id')
        fetchPlayerList(id)
    })

    $navItems.on('mouseenter', () => console.log(' mouse enter'))
    $navItems.on('mouseleave', () => console.log(' mouse leave'))
}

const animateHeaderTitle = () => {
    const $headerTitle = $('.header__title')
    $headerTitle.css({ 'top': '-80px' })
        .animate({ 'top': '0' }, 2000, 'swing', () => console.log('ANIMATION COMPLETED'))
    $.when($headerTitle).done(() => console.log('ANIMATION COMPLETED TWICE'))
}

const createTeamItemTpl = (name, id) => `
    <li class="nav-item" data-id="${id}">
        <a class="nav-link" href="#">${name}</a>
    </li>
    `   
