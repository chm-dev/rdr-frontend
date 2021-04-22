<template>
  <v-container fluid fill-height>
    <v-flex>
      <div class="mx-auto d-block" style="max-width: 640px">
        <v-card class="elevation-1 mx-auto">
          <v-toolbar dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div v-if="errorMessage">
              <v-alert dense outlined type="error">
                {{ errorMessage }}
              </v-alert>
            </div>
            <v-form :disabled="locked" v-model="formValid">
              <v-text-field
                v-model="login"
                autofocus
                prepend-icon="mdi-account"
                name="login"
                label="Login"
                type="text"
                @keydown="enterHandle"
                :rules="[() => !!login || 'This field is required']"
              ></v-text-field>
              <v-text-field
                v-model="email"
                autofocus
                prepend-icon="mdi-email"
                name="email"
                label="Email address(for password reset only)"
                type="text"
                @keydown="enterHandle"
                :rules="[() => !!email || 'This field is required']"
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                @keydown="enterHandle"
              ></v-text-field>
              <v-text-field
                v-model="password2"
                id="password2"
                prepend-icon="mdi-lock"
                name="password2"
                label="Repeat password"
                type="password"
                @keydown="enterHandle"
                :rules="[
                  () =>
                    (!!password2 && password2 === password) ||
                    'Passwords do not match'
                ]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              block
              color="primary"
              elevation="1"
              @click="doRegister"
              :loading="locked"
              :disabled="!formValid || locked"
              >Register
            </v-btn>
          </v-card-actions>
        </v-card>
        <p class="my-4 text-center">or</p>
        <v-btn text color="primary" block class="" to="/login">
          Login to existitng account
        </v-btn>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";
import config from "../config";

export default {
  name: "Login",
  data: () => {
    return {
      config: config,
      login: "",
      password: "",
      password2: "",
      formValid: false,
      locked: false,
      errorMessage: "",
      email: ""
    };
  },
  props: {
    source: String
  },
  methods: {
    doRegister() {
      alert("soon ;)");
    },
    doLogin() {
      if (!this.formValid) return false;
      this.errorMessage = "";
      this.locked = true;
      const _password = this.password;
      this.password = "";
      console.log(_password);
      const { backendUrl } = this.config;
      axios
        .post(`${backendUrl}/auth/local`, {
          identifier: this.login,
          password: _password
        })
        .then(response => {
          // Handle success.
          console.log("User token", response.data.jwt);
          localStorage.jwt = response.data.jwt;
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.jwt;
          this.$router.push(this.source || "/");
        })
        .catch(error => {
          this.locked = false;
          // Handle error.
          console.log("An error occurred:", error.response);
          this.errorMessage =
            (error.response.data.data &&
              error.response.data.data[0].messages[0].message) ||
            "Login error";
        });
    },
    enterHandle(ev) {
      if (ev.key === "Enter") this.doLogin();
    }
  }
};
</script>

<style></style>
