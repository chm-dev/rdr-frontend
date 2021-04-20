<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark>
            <v-toolbar-title>Login</v-toolbar-title>
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
                v-model="password"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                @keydown="enterHandle"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              block
              color="primary"
              elevation="1"
              @click="doLogin"
              :loading="locked"
              :disabled="!formValid || locked"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
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
      formValid: false,
      locked: false,
      errorMessage: ""
    };
  },
  props: {
    source: String
  },
  methods: {
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
          console.log("Well done!");
          console.log("User profile", response.data.user);
          console.log("User token", response.data.jwt);
          localStorage.jwt = response.data.jwt;
          this.$router.push(this.source || "/");
        })
        .catch(error => {
          console.log(error);
          // Handle error.
          console.log("An error occurred:", error.response);
          this.errorMessage =
            error.response.data.data[0].messages[0].message || "Login error";
        });

      setTimeout(() => (this.locked = false), 1500);
    },
    enterHandle(ev) {
      if (ev.key === "Enter") this.doLogin();
    }
  }
};
</script>

<style></style>
