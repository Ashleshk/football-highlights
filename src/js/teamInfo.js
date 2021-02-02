import $ from 'jquery'
import { API_KEY } from './config'

const createPlayerTpl = (name, description) => `
    <div class="col-lg-4 player-item">
    <img class="rounded-circle" src="https://www.shareicon.net/data/2016/07/31/804694_game_512x512.png" alt="Generic placeholder image" width="140" height="140">
    <h2>${name}</h2>
    <p>${description}</p>
    <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
</div>
`

const createPlayerListTpl = playerList =>
    playerList.map(player => createPlayerTpl(player.name, player.description)).join('')

const renderPlayerList = playerList => $('#player-list')
    .html(createPlayerListTpl(playerList))
    .find('.player-item')
    .each((index, element) => {
        $(element).css({ 'opacity': '0', 'right': '50px' })
            .animate({ 'opacity': '1', 'right': 0 }, index * 350)
    })

export const fetchPlayerList = id => $.ajax({
    url: `http://api.football-data.org/v1/teams/${id}/players`,
    headers: {'X-Auth-Token': API_KEY}
})
    .done(data => renderPlayerList(data.players))
    .fail(() => console.log('fail'))
    .always(() => console.log('do some cleanup'))

export const initSlideshow = () => {
    setInterval(() => {
        $('.slideshow__item:first').fadeOut().next().fadeIn().end().appendTo('.slideshow__wrapper')
    }, 3000)
}