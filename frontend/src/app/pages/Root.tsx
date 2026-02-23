import { Outlet } from "react-router";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MethodologyModal from "../components/MethodologyModal";
import { Toaster } from "../components/ui/sonner";

export default function Root() {
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
      <Footer onMethodologyClick={() => setMethodologyOpen(true)} />
      <MethodologyModal open={methodologyOpen} onOpenChange={setMethodologyOpen} />
      <Toaster position="bottom-right" />
    </div>
  );
}