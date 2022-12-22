// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as actions from "../../../../server/actions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { machine_id } = req.query;

  if (typeof machine_id !== "string") {
    res.status(400).json(null);
    return;
  }

  await actions.wakeup(machine_id);

  res.status(200).json({});
};

export default handler;
