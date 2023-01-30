import { FC, ReactNode } from 'react';
import AdminNav from '../common/nav/AdminNav';
import {
  AiOutlineContacts,
  AiOutlineContainer,
  AiOutlineDashboard,
  AiOutlineFileAdd,
  AiOutlineMail,
  AiOutlineTeam,
} from 'react-icons/ai';
import Link from 'next/link';
import AppHead from '../common/AppHead';
import AdminSecondaryNav from '../common/nav/AdminSecondaryNav';

interface Props {
  children: ReactNode;
  title?: string;
}

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: '儀表版' },
  { href: '/admin/posts', icon: AiOutlineContainer, label: '文章' },
  { href: '/admin/users', icon: AiOutlineTeam, label: '用戶' },
  { href: '/admin/comments', icon: AiOutlineMail, label: '評論' },
];

const AdminLayout: FC<Props> = ({ children, title }): JSX.Element => {
  return (
    <>
      <AppHead title={title} />
      <div className='flex'>
        <AdminNav navItems={navItems} />
        <div className='flex-1 p-4 dark:bg-primary-dark bg-primary'>
          <AdminSecondaryNav />
          {children}
        </div>
        {/* create button */}
        <Link href='/admin/posts/create'>
          <div className='bg-secondary-dark dark:bg-secondary-light text-primary  dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition'>
            <AiOutlineFileAdd size={24} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
