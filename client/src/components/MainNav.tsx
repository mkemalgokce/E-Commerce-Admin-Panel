import { cn } from "@/lib/utils.ts"
import { Link, useMatch } from "react-router-dom"

const MainNav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const match = useMatch("/:storeId/*")
  if (!match) return null
  const pathName = window.location.pathname

  const routes = [
    {
      href: `/${match.params.storeId}`,
      label: "Overview",
      active: pathName === `/${match.params.storeId}`
    },
    {
      href: `/${match.params.storeId}/orders`,
      label: "Orders",
      active: pathName === `/${match.params.storeId}/orders`
    },
    {
      href: `/${match.params.storeId}/products`,
      label: "Products",
      active: pathName === `/${match.params.storeId}/products`
    },
    {
      href: `/${match.params.storeId}/billboards`,
      label: "Billboards",
      active: pathName === `/${match.params.storeId}/billboards`
    },
    {
      href: `/${match.params.storeId}/categories`,
      label: "Categories",
      active: pathName === `/${match.params.storeId}/categories`
    },
    {
      href: `/${match.params.storeId}/colors`,
      label: "Colors",
      active: pathName === `/${match.params.storeId}/colors`
    },
    {
      href: `/${match.params.storeId}/sizes`,
      label: "Sizes",
      active: pathName === `/${match.params.storeId}/sizes`
    },
    {
      href: `/${match.params.storeId}/settings`,
      label: "Settings",
      active: pathName === `/${match.params.storeId}/settings`
    }
  ]
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map(route => (
        <Link
          key={route.href}
          to={route.href}
          className={cn(
            "hover: text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-gray-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
export default MainNav
