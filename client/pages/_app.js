import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import HeaderComponent from "../components/header";
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import reducers from '../reducers'
import thunk from 'redux-thunk'
import '.././node_modules/nprogress/nprogress.css'
import'../static/styles.css'

const composeEnhancers = compose
const store =createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

const AppComponent = ({ Component, pageProps,currentUser }) => {
  return (
     <Provider store={store}>
      <HeaderComponent currentUser={currentUser}/>
      <Component currentUser={currentUser} {...pageProps} />
       </Provider>
   
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx,client,data.currentUser);
  }

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;







