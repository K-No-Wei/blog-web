import service from "@/plugin/service";

export function Comment(data){
    return service({
        method: 'post',
        url: '/comment',
        data
    })
}

export function GetComment(id){
    return service({
        method: 'get',
        url: `/comment/${id}`,
    })
}


export function GetAv(id){
    return service({
        method: 'get',
        url: `https://api.usuuu.com/qq/${id}`,
    })
}