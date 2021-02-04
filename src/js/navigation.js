import $ from 'jquery'
import { fetchPlayerList } from './teamInfo'
import { API_KEY } from './config'

const fetchTeams = () => $.ajax({
    url: 'http://api.football-data.org/v1/competitions/398/teams',
    headers: {'X-Auth-Token': API_KEY}
})
