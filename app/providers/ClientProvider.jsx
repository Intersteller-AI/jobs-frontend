"use client";

import Navbar from "@/components/Generals/Navbar";
import { Provider } from "react-redux";
import store from "../../store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Generals/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

const ClientProvider = ({ children }) => {
  const [client] = useState(new QueryClient());

  const urlPath = usePathname();

  return (
    <>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <Navbar />
          <div className="flex mt-[60px]">
            {(urlPath !== "/signin" ||
              urlPath !== "/signup" ||
              urlPath !== "/") && <Sidebar />}
            {children}
          </div>
          <Toaster />
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default ClientProvider;
