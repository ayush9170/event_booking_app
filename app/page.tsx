


import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>You need to be signed in to view this page.</p>;
  }

  return <div>Welcome to your dashboard, !</div>;
};

export default Dashboard;
