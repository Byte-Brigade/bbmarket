import DashboardLayout from "@/components/Dashboard";
import LoadingDashboard from "@/components/LoadingDashboard";
import ProductTable from "@/components/ProductTable";
import { auth } from "@/utils/firebase";
import { IconPlus } from "@tabler/icons-react";
import { Button, Dropdown, Tabs } from "flowbite-react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type Data = {
  products: {
    id: number;
    title: string;
    price: string;
    stock: number;
    brand: string;
  }[];
};

export const getServerSideProps: GetServerSideProps<{
  data: Data;
}> = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=5");
  const data = await res.json();
  return { props: { data } };
};

export default function Dashboard({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const products = data.products;

  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);

  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingDashboard />;
  }

  if (!user) {
    router.push("/auth/login");
    toast.error("Please sign in to continue", {
      toastId: "id-not-logged-in",
    });
    return <div>Redirecting ...</div>;
  }

  return (
    <DashboardLayout>
      <Head>
        <title>BBMarket - Dashboard</title>
        <meta name="description" content="Best e-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-y-4">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p>18 Aug 2021 - 18 Sep 2021</p>
        </div>
        {/* <div className="flex items-center overflow-hidden rounded-lg">
          <div className="flex items-center justify-center h-full px-2 text-white bg-blue-500 border-r-2 border-blue-600">
            <IconCoins className="w-20 h-20" />
          </div>
          <div className="flex flex-col p-4 text-white bg-blue-500 gap-y-2">
            <h1 className="text-lg font-semibold">Title 1</h1>
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              quo?
            </div>
          </div>
        </div> */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 border-2 border-gray-200 rounded-xl">
            <div className="flex flex-col p-4">
              <div>
                <Button size="xs">
                  <IconPlus />
                  Add Product
                </Button>
              </div>
              <div className="w-full">
                <Tabs.Group
                  style="underline"
                  ref={tabsRef}
                  onActiveTabChange={(tab) => setActiveTab(tab)}
                >
                  <Tabs.Item title="All">
                    <ProductTable products={products} />
                  </Tabs.Item>
                  <Tabs.Item title="New Product">
                    <ProductTable />
                  </Tabs.Item>
                  <Tabs.Item title="Active">
                    <ProductTable />
                  </Tabs.Item>
                </Tabs.Group>
              </div>
            </div>
          </div>
          <div className="border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-semibold text-gray-300">VISITORS</h1>
              <Dropdown label="Daily" size="xs">
                <Dropdown.Item>Daily</Dropdown.Item>
                <Dropdown.Item>Monthly</Dropdown.Item>
                <Dropdown.Item>All Time</Dropdown.Item>
              </Dropdown>
            </div>
            <div className="border-b-2 border-gray-200">
              <div className="p-4 animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
                <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
                <div className="flex items-baseline mt-4 space-x-6 max-h-44">
                  <div className="w-full h-32 bg-gray-200 rounded-t-lg"></div>
                  <div className="w-full h-24 bg-gray-200 rounded-t-lg"></div>
                  <div className="w-full h-32 bg-gray-200 rounded-t-lg"></div>
                  <div className="w-full bg-gray-200 rounded-t-lg h-44"></div>
                  <div className="w-full bg-gray-200 rounded-t-lg h-36"></div>
                  <div className="w-full h-32 bg-gray-200 rounded-t-lg"></div>
                  <div className="w-full bg-gray-200 rounded-t-lg h-36"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-semibold text-gray-300">DEVICES</h1>
            </div>
            <div className="p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              similique earum dignissimos vitae placeat debitis quidem quam,
              commodi facilis et cupiditate hic quod nisi deleniti.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-semibold text-gray-300">SESSIONS</h1>
              <IconPlus />
            </div>
            <div className="p-4 animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
              <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
              <div className="flex items-baseline mt-4 space-x-6 max-h-36">
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-28"></div>
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-36"></div>
                <div className="w-full h-24 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full h-24 bg-gray-200 rounded-t-lg"></div>
              </div>
            </div>
          </div>
          <div className="border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-semibold text-gray-300">
                PRODUCT VIEW
              </h1>
              <IconPlus />
            </div>
            <div className="p-4 animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
              <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
              <div className="flex items-baseline mt-4 space-x-6 max-h-36">
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-28"></div>
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-36"></div>
                <div className="w-full h-24 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full h-24 bg-gray-200 rounded-t-lg"></div>
              </div>
            </div>
          </div>
          <div className="border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-semibold text-gray-300">
                ADD TO CART
              </h1>
              <IconPlus />
            </div>
            <div className="p-4 animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
              <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
              <div className="flex items-baseline mt-4 space-x-6 max-h-36">
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-28"></div>
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-36"></div>
                <div className="w-full h-24 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full h-24 bg-gray-200 rounded-t-lg"></div>
              </div>
            </div>
          </div>
          <div className="border-2 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-semibold text-gray-300">PURCHASE</h1>
              <IconPlus />
            </div>
            <div className="p-4 animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2.5"></div>
              <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full"></div>
              <div className="flex items-baseline mt-4 space-x-6 max-h-36">
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-28"></div>
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-36"></div>
                <div className="w-full h-24 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full h-20 bg-gray-200 rounded-t-lg"></div>
                <div className="w-full h-24 bg-gray-200 rounded-t-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
