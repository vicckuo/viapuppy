import useDarkMode from '@/hooks/useDarkMode';
import { options } from 'joi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import DropdownOptions, { dropDownOptions } from '../DropdownOptions';
import ProfileHead from '../ProfileHead';
import SearchBar from '../SearchBar';

interface Props {}

const AdminSecondaryNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();
  const navigateToCreateNewPost = () => router.push('/admin/posts/create');
  const handleLogout = async () => await signOut();

  const options: dropDownOptions = [
    {
      label: '新增文章',
      onClick: navigateToCreateNewPost,
    },
    {
      label: '更換主題',
      onClick: toggleTheme,
    },
    {
      label: '登出',
      onClick: handleLogout,
    },
  ];
  return (
    <div className='flex items-center justify-between'>
      {/* search bar */}
      <SearchBar />
      {/* options / profile head */}
      <DropdownOptions
        head={<ProfileHead nameInitial='J' />}
        options={options}
      />
    </div>
  );
};

export default AdminSecondaryNav;
