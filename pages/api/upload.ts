import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../utils/dbConnect";

import image from "../../models/Image";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const { name, data } = req.body;

    await image.create({
      name,
      data
    });

    res.status(200).json({
      sucess: "Upload was successful!"
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        "Aconteceu um erro no servidor. Por favor tente novamente mais tarde."
    });
  }
};

export default handler;
