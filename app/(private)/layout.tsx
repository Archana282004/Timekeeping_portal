import React from "react";
import Header from "@/components/hoc/layout-component/header";
import Footer from "@/components/hoc/layout-component/footer";
import { cookies, headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = async ({ children }) => {
  const cookieStore = cookies();
  const hasToken = cookieStore.has("access_token");

  if (!hasToken) redirect("/login", RedirectType.replace);


  return (
    <div id="wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
