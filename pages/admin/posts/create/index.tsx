import axios from 'axios';
import { NextPage } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import Editor, { FinalPost } from '@/components/editor';
import { generateFormData } from '@/utils/helper';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface Props {}

const Create: NextPage<Props> = () => {
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (post: FinalPost) => {
    setCreating(true);
    try {
      // we have to generate FormData
      const formData = generateFormData(post);

      // submit our post
      const { data } = await axios.post('/api/posts', formData);
      router.push('/admin/posts/update/' + data.post.slug);
      // console.log(data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return (
    <AdminLayout title='新增文章'>
      <div className='max-w-4xl mx-auto'>
        <Editor
          onSubmit={handleSubmit}
          busy={creating}
        />
      </div>
    </AdminLayout>
  );
};

export default Create;
