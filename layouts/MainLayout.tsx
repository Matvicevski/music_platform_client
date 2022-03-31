import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import Player from '../components/Player';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface MainLayoutProps {
  title?: string,
  description?: string,
  keywords?: string
}


const MainLayout: React.FC<MainLayoutProps>
  = ({
       children,
       title,
       description,
       keywords
     }) => {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title || 'Музыкальная площадка'}</title>
        <meta name="description" content={'Музыкальная площадка' + description}/>
        <meta name="robots" content="index, follow"/>
        <meta name="keywords" content={keywords || 'Музыка, треки, артисты'}/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </Head>
      <Navbar/>
      <Container style={{margin: '90px 0'}}>
        {children}
      </Container>
      {router.pathname === '/tracks' ? <Player/> : null}
    </>
  );
};

export default MainLayout;