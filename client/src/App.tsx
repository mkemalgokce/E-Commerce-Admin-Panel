import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from "@/pages/home"
import SignUp from "@/pages/sign-up"
import SignIn from "@/pages/sign-in"
import CategoryPage from "@/pages/categories"
import { UserProvider } from "@/providers/AuthProvider.tsx"
import { Toaster } from "react-hot-toast"
import StoreModalProvider from "@/providers/StoreModalProvider.tsx"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "@/components/Navbar.tsx"
import CreateStore from "@/pages/createStore.tsx"
import Settings from "@/pages/settings"
import BillboardPage from "@/pages/billboards"
import NewBillboardPage from "@/pages/billboards/NewBillboardPage.tsx"
import NewCategoryPage from "./pages/categories/NewCategoryPage"
import NewSizePage from "@/pages/sizes/NewSizePage.tsx"
import SizePage from "@/pages/sizes"
import ColorPage from "@/pages/colors"
import NewColorPage from "@/pages/colors/NewColorPage.tsx"
import NewProductPage from "@/pages/products/NewProductPage.tsx"
import ProductPage from "@/pages/products"
import OrdersPage from "@/pages/orders"
const AllRoutes = () => (
  <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route
      path="/create-store"
      element={
        <ProtectedRoute>
          <CreateStore />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/billboards"
      element={
        <ProtectedRoute>
          <BillboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/categories"
      element={
        <ProtectedRoute>
          <CategoryPage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/categories/:categoryId"
      element={
        <ProtectedRoute>
          <NewCategoryPage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/sizes/:sizeId"
      element={
        <ProtectedRoute>
          <NewSizePage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/sizes"
      element={
        <ProtectedRoute>
          <SizePage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/colors/:colorId"
      element={
        <ProtectedRoute>
          <NewColorPage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/colors"
      element={
        <ProtectedRoute>
          <ColorPage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/products/:productId"
      element={
        <ProtectedRoute>
          <NewProductPage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/products"
      element={
        <ProtectedRoute>
          <ProductPage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/billboards/:billboardId"
      element={
        <ProtectedRoute>
          <NewBillboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId/orders"
      element={
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      }
    />
    <Route
      path=":storeId?/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
  </Routes>
)
function App() {
  return (
    <>
      <UserProvider>
        <StoreModalProvider />
        <Toaster />
        <BrowserRouter>
          <Navbar />
          <AllRoutes />
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
