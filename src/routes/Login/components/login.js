import React from "react";
import { View } from "react-native";
import { Container } from "native-base";
import { Actions } from "react-native-router-flux";

//Component Imports
import LoginContainer from "./Login";
import CreateProfile from "./CreateProfile";

class Login extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.user_id && this.props.token) {
      // this.props.connectSockeIoServer();
      this.props.reconnectSocketIo();
      if (this.props.currentRoute) {
        console.log("Going to last active scene.");
        if (this.props.currentRoute == "profileCamera") {
          Actions["profileCamera"].call({ type: "replace" });
        } else {
          Actions[this.props.currentRoute.slice(1)].call({ type: "replace" });
        }
      } else {
        Actions.home({ type: "replace" });
      }
    }
  }

  componentDidMount() {
    this.props.clearCreateProfile();
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <LoginContainer
            user_id={this.props.user_id}
            authUser={this.props.authUser}
            addAlert={this.props.addAlert}
            loginUser={this.props.loginUser}
            signupUser={this.props.signupUser}
            needsToCreateProfile={this.props.needsToCreateProfile}
            getInputData={this.props.getInputData}
            inputData={this.props.inputData}
            isLoggingIn={this.props.isLoggingIn}
            loggingIn={this.props.loggingIn}
            isSigningUp={this.props.isSigningUp}
            signingUp={this.props.signingUp}
          />
        </View>
      </Container>
    );
  }
}

export default Login;
