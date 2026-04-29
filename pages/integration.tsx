import { GetServerSideProps } from 'next';

export default function IntegrationRedirect() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/chess-clubs',
      permanent: false,
    },
  };
};