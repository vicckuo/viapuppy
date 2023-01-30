import { FC } from 'react';
import NextImage from 'next/image';
import CheckMark from '@/components/common/CheckMark';

interface Props {
  src: string;
  selected?: boolean;
  // here ?
  alt: string;
  onClick?(): void;
}

const Image: FC<Props> = ({ src, alt, selected, onClick }): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className='relative rounded overflow-hidden cursor-pointer'
    >
      <NextImage
        src={src}
        width={200}
        height={200}
        alt={alt}
        style={{ objectFit: 'cover', width: '200px', height: '150px' }}
        className='bg-secondary-light hover:scale-110 transition'
      />
      <div className='absolute top-2 left-2'>
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default Image;
