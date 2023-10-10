import React from "react";
import { Container, Footer } from "../components";
import { Main } from "@components/home/main";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/icons/wbyte-simple-log.svg" />
      </Head>
      <Main />
      <Footer />
    </Container>
  );
};

export default Home;
