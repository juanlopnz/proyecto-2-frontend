import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/home/Home';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import "./index.css";
import { Fragment } from "react";
import { AuthProvider, authContext } from "./context/auth/AuthContext";
import UnlockWallet from "./pages/auth/UnlockWallet";
import CreateNFT from './pages/createNFT/CreateNFT';
import SingleNFT from './pages/home/SingleNFT';
import Profile from './pages/profile/Profile';
import EditNFT from './pages/editNFT/EditNFT';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthProvider>
          <authContext.Consumer>
            {(ctx) => {
              if (!ctx?.wallet) {
                return (
                  <Route exact path="/">
                    <UnlockWallet />
                  </Route>
                );
              }
              return (
                <Fragment>
                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                  <Route exact path="/home">
                    <Home />
                  </Route>
                  <Route exact path="/nft/:id" component={SingleNFT}>
                  </Route>
                  <Route exact path="/create-nft">
                    <CreateNFT />
                  </Route>
                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                  <Route exact path="/edit-nft/:id" component={EditNFT} />
                </Fragment>
              );
            }}
          </authContext.Consumer>
        </AuthProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
