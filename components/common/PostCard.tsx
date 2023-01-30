import { PostDetail } from '@/utils/types';
import Image from 'next/image';
import { FC } from 'react';
import dateformat from 'dateformat';
import Link from 'next/link';

interface Props {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + '...';
};

const PostCard: FC<Props> = ({
  controls = false,
  post,
  busy,
  onDeleteClick,
}): JSX.Element => {
  const { title, slug, meta, createdAt, tags, thumbnail } = post;
  return (
    <div className='rounded shadow-sm shadow-secondary-dark overflow-hidden bg-primary dark:bg-primary-dark transition flex flex-col h-full'>
      {/* thumbnail */}
      <div className='aspect-video relative'>
        {!thumbnail ? (
          <div className='w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold'>
            無縮圖
          </div>
        ) : (
          <Image
            src={thumbnail}
            fill
            alt='Thumbnail'
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>

      {/* Post Info */}
      <div className='p-2 flex-1 flex flex-col'>
        <Link href={'/' + slug}>
          <div className='flex items-center justify-between text-sm text-primary-dark dark:text-primary'>
            <div className='flex items-center space-x-1'>
              {/* 標籤 */}
              {tags.map((t, index) => (
                <span key={t + index}>#{t}</span>
              ))}
            </div>
            {/* 日期 */}
            <span>{dateformat(createdAt, 'd-mmm-yyyy')}</span>
          </div>
          {/* 標題 */}
          <h1 className='font-semibold text-primary-dark dark:text-primary'>
            {trimText(title, 50)}
          </h1>
          {/* 敘述 */}
          <p className='text-secondary-dark'>{trimText(meta, 70)}</p>
        </Link>

        {controls && (
          <div className='flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary'>
            {busy ? (
              <span className='animate-pulse'>刪除中</span>
            ) : (
              <>
                <Link
                  className='hover:underline'
                  href={'/admin/posts/update/' + slug}
                >
                  編輯
                </Link>
                <button
                  onClick={onDeleteClick}
                  className='hover:underline'
                >
                  刪除
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
