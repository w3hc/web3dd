import { ConnectKitButton } from "connectkit";

const LoginButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ show }) => {
        return (
          <button onClick={show} className="App-button">Login</button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default LoginButton;
