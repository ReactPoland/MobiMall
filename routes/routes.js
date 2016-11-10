import NewProductSeller from './NewProductSeller';
import PostProductToIG from './PostProductToIG';
import ShopperProfileView from './ShopperProfileView';
import Login from './Login';
import Dashboard from './Dashboard';
import SellerProfileView from './SellerProfileView';
import LoginInst from './LoginInst';
import SignUp from './SignUp';
import DashboardBuyer from './DashboardBuyer';
import Setting from './Setting';
import ThemeUi from '../components/ThemeUi';
import DashboardSeller from './DashboardSeller';
import ProfileChanging from './ProfileChanging';
import PageList from './PageList';
import Checkout from './Checkout';
import Empty from './Empty';

export default routes = {

	login: {
		Page: Login,
		title: 'login',
		key: 'login',
	},
	newProduct: {
		Page: NewProductSeller,
		title: 'New product',
		themeUi: true,
		key: 'newProduct',
	},
	checkout: {
		Page: Checkout,
		title: 'Checkout',
		themeUi: true,
		key: 'checkout',
	}, 
	pageList: {
		Page: PageList,
		key: 'pageList',
	},
	postProductToIG: {
		Page: PostProductToIG,
		title: "Post product to Instagram",
		themeUi: true,
		key: 'postProductToIG',
	}, 
	shopperProfileView: {
		Page: ShopperProfileView,
		themeUi: true,
		title: 'Profile',
		key: 'shopperProfileView',
	}, 
	dashboard: {
		Page: Dashboard,
		themeUi: true,
		key: 'dashboard',
	},
	sellerProfileView: {
		Page: SellerProfileView,
		themeUi: true,
		title: 'Profile',
		key: 'sellerProfileView',
	},
	dashboardBuyer: {
		Page: DashboardBuyer,
		title: 'Home',
		themeUi: true,
		key: 'dashboardBuyer',
		stripLinks: [ { 
			route: 'dashboardBuyer',
			icon: {
				name: 'home',
			}
		}, { 
			route: 'empty',
			icon: { 
				name: 'heart',
			}
		}, {
			route: 'empty',
			icon:{
				name: 'search',
			} 
		}, {
			route: 'setting',
			icon: {
				name: 'setting',
			}
		}, {
			route: 'shopperProfileView',
			icon: {
				name: 'user',
			}
		} ],
	},
	dashboardSeller: {
		Page: DashboardSeller,
		title: 'Home',
		themeUi: true,
		key: 'dashboardSeller',
		stripLinks: [ {
			route: 'dashboardSeller',
			icon: {
				name: 'home',
			}
		}, {
			route: 'newProduct',
			icon: {
				name: 'plus',
				type: 'awesome'
			}
		}, {
			route: 'empty',
			icon: { 
				name: 'orders',
			}
		}, {
			route: 'sellerProfileView',
			icon:{
				name: 'user',
			}
		}, {
			route: 'setting',
			icon: {
				name: 'setting',
			} 
		} ],
	},
	profileChanging: {
		Page: ProfileChanging,
		key: 'profileChanging',
	},
	signUp: {
		Page: SignUp,
		key: 'signUp',
	},
	setting: {
		title: 'Setting',
		themeUi: true,
		Page: Setting,
		key: 'setting',
	},
	empty: {
		title: 'Empty route',
		themeUi: true,
		Page: Empty,
		key: 'empty',

	}


}