import React, { ComponentType, FC, Suspense } from 'react';
import { Route, withRouter } from 'react-router';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/appReducer';
import store, { AppStateType } from './redux/reduxStore';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
// import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import Preloader from './components/Common/Preloader/Preloader';

import './App.css';
import NavbarContainer from './components/Navbar/NavbarContainer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

// ReturnType - позволяет определить тип возвращаемого значения конкретной функции - mapStateToProps в данном случае
type MapPropsType = ReturnType<typeof mapStateToProps>;

type DispatchPropsType = {
	initializeApp: () => void
};

class App extends React.Component<MapPropsType & DispatchPropsType> {

	catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
		alert('Some error occurred');
		console.error(promiseRejectionEvent);
	};

	componentDidMount() {
		this.props.initializeApp();
		// слушатель на window отлавливает на глобальном уровне ошибки	
		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
	};

	componentWillUnmount() {
		// чистим за собой side effect при удалении компоненты, иначе слушатель так и останется
		window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
	};

	render() {
		if (!this.props.initialized) {
			return <Preloader />
		};

		return (
			<>
				<div className='app-wrapper'>
					<HeaderContainer />
					<NavbarContainer />
					<div className='app_wrapper_content'>
						<Switch>
							<Redirect exact from="/" to="/profile" />
							<Route path='/dialogs'
								render={() => {
									return <Suspense fallback={<div>...loading</div>}>
										<DialogsContainer />
									</Suspense>
								}
								} />
							<Route path='/profile/:userId?'          // знак ? в записи :userId? - означает, что данный параметр не обязателен (опционален) --- если его не будет, перейдем на страницу profile
								render={() => {
									return <Suspense fallback={<div>...loading</div>}>
										<ProfileContainer /*store={this.props.store}*/ />
									</Suspense>
								}
								} />
							<Route path='/users'
								render={() => <UsersContainer pageTitle='Samurais' />} />
							<Route path='/login'
								render={() => <Login />} />
							<Route path='/news' component={News} />
							<Route path='/music' component={Music} />
							<Route path='/settings' component={Settings} />
							<Route path='*'
								render={() => <div>404 NOT FOUND</div>} />
						</Switch>
					</div>
				</div>
			</>
		);
	};
};

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized
});

const AppContainer = compose<ComponentType>(
	withRouter,
	connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp: FC = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	);
};

export default SamuraiJSApp;
