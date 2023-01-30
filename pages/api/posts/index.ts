import { NextApiHandler } from 'next';
import dbConnect from '@/lib/dbConnect';
import Joi from 'joi';
import { postValidationSchema, validateSchema } from '@/lib/validator';
import { formatPosts, isAdmin, readFile, readPostsFromDb } from '@/lib/utils';
import Post from '@/models/Post';
import formidable from 'formidable';
import cloudinary from '@/lib/cloudinary';
import { IncomingPost, UserProfile } from '@/utils/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      return readPosts(req, res);
    case 'POST':
      return createNewPost(req, res);
  }
};

const createNewPost: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(401).json({ error: '未經認證的請求！' });

  const { files, body } = await readFile<IncomingPost>(req);

  let tags = [];

  // tags will be in string form so converting to array
  if (body.tags) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, slug, meta } = body;

  await dbConnect();
  const alreadyExist = await Post.findOne({ slug });
  if (alreadyExist)
    return res.status(400).json({ error: '代稱已創建使用過！' });

  // create new post
  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
  });

  //uploading thumbnail if there is any
  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: 'dev-blogs',
      }
    );
    newPost.thumbnail = { url, public_id };
  }
  await newPost.save();

  res.json({ post: newPost });
};

const readPosts: NextApiHandler = async (req, res) => {
  try {
    const { limit, pageNo, skip } = req.query as {
      limit: string;
      pageNo: string;
      skip: string;
    };
    const posts = await readPostsFromDb(
      parseInt(limit),
      parseInt(pageNo),
      parseInt(skip)
    );
    res.json({ posts: formatPosts(posts) });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
