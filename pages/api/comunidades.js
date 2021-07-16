import { SiteClient } from 'datocms-client';

export default async function receberodDeRequests(request, response) {

    if (resquest.method === 'POST') {
        const TOKEN = 'f0c21d71b467c66a82036463ba9aad'

        const client = new SiteClient(TOKEN);

        const registroCriado = client.items.create({
            itemType: "968454",
            ...request.body,
            //title: "Comunidade de teste",
            //imageUrl: "https://github.com/cfcamargo.png",
            //creatorSlug: "cfcamargo"
        })


        response.json({
            dados: 'algum dado qualquer',
            registroCriado: registroCriado
        })
        return;
    }



}