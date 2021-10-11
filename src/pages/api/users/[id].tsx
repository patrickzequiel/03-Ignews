import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.query);

    const users = [
        { id: 1, name: "Lorelay Doe" },
        { id: 2, name: "Rolane Doe" },
        { id: 3, name: "Juliana Doe" },
    ]

    return response.json(users);
}