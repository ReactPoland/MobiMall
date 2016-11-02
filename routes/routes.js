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
			iconName: 'store',
		}, {
			route: 'shopperProfileView',
			iconName: 'dashboard',
		} ],
	},
	dashboardSeller: {
		Page: DashboardSeller,
		title: 'Home',
		themeUi: true,
		key: 'dashboardSeller',
		stripLinks: [ {
			route: 'dashboardSeller',
			iconName: 'store',
		}, {
			route: 'sellerProfileView',
			iconName: 'dashboard',
		}, {
			route: 'newProduct',
			iconName: 'heart'
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
		Page: Setting,
		key: 'setting',
	}


}