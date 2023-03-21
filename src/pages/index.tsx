import Layout from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>BBMarket - Home</title>
        <meta name="description" content="Best e-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold">Hello World!</h1>
      </div>
    </Layout>
  );
}
