import { GitHubAuthButton } from '@/components/button';
import { NextPage } from 'next';

interface Props {}

const Signin: NextPage<Props> = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <GitHubAuthButton />
    </div>
  );
};

export default Signin;
