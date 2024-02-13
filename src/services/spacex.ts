import {type Doc, type APISpaceXResponse} from '../types/api'


/* fetch by id */
export const getLaunchBy = async({id} : { id: string}) => {
    const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`)
    const launch = (await res.json()) as Doc
    console.log(launch)
    return launch
}


/* fetch */
export const getLaunches = async() => {
    const res = await fetch('https://api.spacexdata.com/v5/launches/query', { //utilizamos la query para no traer todo
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: {},
            options: {
                sort: {
                    date_unix:"asc", //ordenamos la fecha ascendente
                },
                limit: 12 //limitamos para que aparezcan 12 lanzamientos
            }
        })
    })
    const {docs: launches} = await res.json() as APISpaceXResponse
    return launches
}