import VueRouter from 'vue-router'

import SignInSignUp from './components/SignInSignUp';
import InitiativeScreen from './components/InitiativeScreen';
import ManageActors from './components/ManageActors';
import AccountSettings from './components/AccountSettings';
import VerifyAccount from './components/VerifyAccount';
import ForgotPassword from './components/ForgotPassword';

const routes = [
  {path: '/signin', component: SignInSignUp},
  {path: '/tracker', component: InitiativeScreen},
  // {path: '/encounters', component: ManageEncounters},
  {path: '/actors', component: ManageActors},
  {path: '/account', component: AccountSettings},
  {path: '/verify', component: VerifyAccount},
  {path: '/forgotpass', component: ForgotPassword},
  {path: '/', component: InitiativeScreen},
];

export default new VueRouter({
  routes,
  mode: 'history',
});
