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
		key: 'newproduct',
	},
	checkout: {
		Page: Checkout,
		title: 'Checkout',
		themeUi: true,
		key: 'checkout',
	}, 
	pageList: {
		Page: PageList,
		key: 'pagelist',
	},
	postProductToIG: {
		Page: PostProductToIG,
		title: "Post product to Instagram",
		themeUi: true,
		key: 'posttoig',
	}, 
	shopperProfileView: {
		Page: ShopperProfileView,
		themeUi: true,
		title: 'Profile',
		key: 'posttoig',
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
		key: 'sellerprofileview',
	},
	dashboardBuyer: {
		Page: DashboardBuyer,
		title: 'Home',
		themeUi: true,
		key: 'dashboardbuyer',
	},
	dashboardSeller: {
		Page: DashboardSeller,
		title: 'Home',
		themeUi: true,
		key: 'dashboardseller',
	},
	profileChanging: {
		Page: ProfileChanging,
		key: 'profilechanging',
	},
	signUp: {
		Page: SignUp,
		key: 'signup',
	},
	setting: {
		Page: Setting,
		key: 'setting',
	}


}