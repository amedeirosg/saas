"use client";
import { useAuth } from "@/hooks/useAuth";
import Login from "./login/page";
import Home from "./home/page";
import { useEffect, useState } from "react";

export default function Main() {
  const session = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session !== undefined) {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div>
      <Home />
    </div>
  );
}
