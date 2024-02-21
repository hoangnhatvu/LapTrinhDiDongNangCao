interface IRoute{
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive (pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  {
    path: '/admin',
    icon: 'HomeIcon', 
    name: 'Dashboard',
    exact: true,
  },
  {
    path: '/admin/accounts',
    icon: 'PeopleIcon',
    name: 'Tài khoản',
  },
  {
    path: '/admin/products',
    icon: 'MenuIcon',
    name: 'Sản phẩm',
  },
  {
    path: '/admin/cards',
    icon: 'CardsIcon',
    name: 'Cards',
  },
  {
    path: '/admin/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },
  {
    path: '/admin/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/admin/login',
        name: 'Login',
      },
      {
        path: '/admin/create-account',
        name: 'Create account',
      },
      {
        path: '/admin/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/admin/404',
        name: '404',
      },
      {
        path: '/admin/blank',
        name: 'Blank',
      },
    ],
  },
]

export type {IRoute}
export default routes
