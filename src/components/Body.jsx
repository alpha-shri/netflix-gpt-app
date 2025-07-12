import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./register/Login";
import { useSelector } from "react-redux";
import { useOnAuthStateChanged } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Suspense } from "react";

const Body = () => {
  useOnAuthStateChanged();

  const user = useSelector((store) => store.user);

  const LazyBrowseMovies = lazy(() =>
    import("@/components/movies/BrowseMovies")
  );

  if (user === undefined) return <div>🔄 Loading...</div>;

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: (
        <ProtectedRoute>
          <LazyBrowseMovies />
        </ProtectedRoute>
      ),
      errorElement: (
        <div className="font-extrabold text-3xl text-red-700 text-center">
          Oops! Something went wrong
        </div>
      ),
    },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
};

export default Body;
