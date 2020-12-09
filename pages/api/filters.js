// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import filters from '../../data/filters';

export default async (req, res) => {
  res.statusCode = 200;
  return res.status(200).json(filters);
}
