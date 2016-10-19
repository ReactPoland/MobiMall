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

export default routes = {

	login: {
		Page: Login,
		title: 'login',
	},
	newProduct: {
		Page: NewProductSeller,
		title: 'New product',
		themeUi: true,
	}, 
	pageList: {
		Page: PageList,
	},
	postProductToIG: {
		Page: PostProductToIG,
		title: "Post product to Instagram",
		themeUi: true,
	}, 
	shopperProfileView: {
		Page: ShopperProfileView,
		themeUi: true,
	}, 
	dashboard: {
		Page: Dashboard,
		themeUi: true,
	},
	sellerProfileView: {
		Page: SellerProfileView,
		themeUi: true,
	},
	dashboardBuyer: {
		Page: DashboardBuyer,
		themeUi: true,
	},
	dashboardSeller: {
		Page: DashboardSeller,
		themeUi: true,
	},
	profileChanging: {
		Page: ProfileChanging,
	},
	signUp: {
		Page: SignUp,
	},
	setting: {
		Page: Setting
	}


}