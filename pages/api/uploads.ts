import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../utils/dbConnect";

import image from "../../models/Image";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const allImages = await image.find();

    res.status(200).json({ images: allImages });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        "Aconteceu um erro no servidor. Por favor tente novamente mais tarde."
    });
  }
};

export default handler;
