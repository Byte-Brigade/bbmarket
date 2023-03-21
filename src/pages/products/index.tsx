import Layout from "@/components/Layout";
import Head from "next/head";

export default function Products() {
  return (
    <Layout>
      <Head>
        <title>BBMarket - Products</title>
        <meta name="description" content="Best e-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container p-4 mx-auto">
        <h1 className="text-2xl font-semibold">This is products page!</h1>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="p-4 border rounded-xl border-slate-100">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                fuga suscipit laboriosam cupiditate asperiores et, debitis
                dolorum ut at dolor incidunt quibusdam deleniti modi repellat
                quia doloribus dolores, inventore magnam?
              </p>
            </div>
            <div className="p-4 border rounded-xl border-slate-100">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                fuga suscipit laboriosam cupiditate asperiores et, debitis
                dolorum ut at dolor incidunt quibusdam deleniti modi repellat
                quia doloribus dolores, inventore magnam?
              </p>
            </div>
            <div className="p-4 border rounded-xl border-slate-100">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                fuga suscipit laboriosam cupiditate asperiores et, debitis
                dolorum ut at dolor incidunt quibusdam deleniti modi repellat
                quia doloribus dolores, inventore magnam?
              </p>
            </div>
            <div className="p-4 border rounded-xl border-slate-100">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                fuga suscipit laboriosam cupiditate asperiores et, debitis
                dolorum ut at dolor incidunt quibusdam deleniti modi repellat
                quia doloribus dolores, inventore magnam?
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
