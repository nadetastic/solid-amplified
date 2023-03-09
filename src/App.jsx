import logo from './logo.svg';
import styles from './App.module.css';
import { Auth } from 'aws-amplify'
import { createSignal } from "solid-js";
// Auth.configure({
//   authenticationFlowType: 'USER_PASSWORD_AUTH',
// });
function App() {

  const [username, setUsername] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [user, setUser] = createSignal('')
  const [code, setCode] = createSignal('')
  const [emailAttribute, setEmailAttribute] = createSignal('')

  const userInfo = async () => {
    try {
      const info = await Auth.currentUserInfo()
      console.log(info)
    } catch (e){
      console.error(e)
    }
  }
  const google = async () => {
    try {
      const res = await Auth.federatedSignIn({ provider: 'Google' })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }
  const currentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({
        // bypassCache: true
      })
      console.log(user)
    } catch (e) {
      console.error(e)
    }
  }
  const signIn = async () => {
    console.log(username(),password())
    try {
      const user = await Auth.signIn({
        username:username(), password: password()
      })
      setUser(user)
      console.log(user)
    } catch (e) {
      console.error(e)
    }
  }
  const signUp = async () => {
    try {
      const user = await Auth.signUp({
        username, password, autoSignIn: { enabled: true },
        attributes: { email: emailAttribute }
      })
      setUser(user)
      console.log('signUp', user)
    } catch (e) {
      console.error(e)
    }
  }
  const signOut = async (event) => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
      event.preventDefault();
    }
  };
  const confirmSignIn = async () => {
    try {
      const res = await Auth.confirmSignIn(user, code)
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }
  const confirmSignUp = async () => {
    console.log(code)
    try {
      const res = await Auth.confirmSignUp(
        username,code, { forceAliasCreation: true }
      )
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }
  
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <main>
      <button onClick={google}>Google</button>
      <hr />
      <h2>UserInfo</h2>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)}></input><br />
      <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}></input><br />
      <input type="text" placeholder="Optional (email attribute)" onChange={e => setEmailAttribute(e.target.value)}></input><br />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signUp}>Sign Up</button><br />
      <hr />
      <h2>Check Current User</h2>
      <button onClick={currentUser}>CurrentUser</button><br />
      <button onClick={userInfo}>User Info</button>
      <hr />
      <h2>Confirmation Code</h2>
      <input type="text" onChange={e => setCode(e.target.value)}></input><br />
      <button onClick={confirmSignIn}>ConfirmSignIn</button><br />
      <button onClick={confirmSignUp}>ConfirmSignUp</button><br />
      <button onClick={signOut}>Sign Out</button>
    </main>
      </header>
    </div>
  );
}

export default App;
