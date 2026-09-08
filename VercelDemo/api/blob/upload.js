import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return res.status(400).json({ error: '没有上传文件' });
    }

    // 上传到 Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    });

    return res.status(200).json({
      url: blob.url,
      filename: blob.pathname
    });
  } catch (error) {
    console.error('文件上传失败:', error);
    return res.status(500).json({ error: '文件上传失败' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
