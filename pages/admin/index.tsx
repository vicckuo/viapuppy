import AdminNav from '@/components/common/nav/AdminNav';
import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}

const Admin: NextPage<Props> = () => {
  return (
    <AdminLayout>
      <div></div>
    </AdminLayout>
  );
};

export default Admin;
