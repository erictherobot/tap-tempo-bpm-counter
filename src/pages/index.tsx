import Head from "next/head";
import BpmCounter from "@/components/BpmCounter";
import Header from "@/components/Header";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Tap Tempo BPM Counter Online</title>
        <meta
          name="description"
          content="TapTempo: Easily find the BPM of any beat with a simple tap. Perfect for musicians, DJs, and music enthusiasts. Try our user-friendly and accurate BPM counter today!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="-mt-10 container mx-auto min-h-screen flex items-center justify-center">
        <BpmCounter />
      </div>
    </>
  );
};

export default Home;
