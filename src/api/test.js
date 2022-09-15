import service from "@/plugin/service";

export function getArticleBody(id){
    return service({
        method: 'post',
        url: `/article/${id}`
    })
}