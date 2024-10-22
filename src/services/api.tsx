import axios from "axios";

export const apiAuth = axios.create({
    baseURL: 'https://api-market.pedagogico.cubos.academy',
    headers: {'Contente-Type': 'applocation/json'}
})