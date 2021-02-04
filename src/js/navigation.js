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
