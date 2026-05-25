import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const PageLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // loader duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return loading ? <Loader /> : null;
};

export default PageLoader;
