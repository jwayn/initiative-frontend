<template>
  <div v-if="!showMessage" class="w-full max-w-xs">
    <transition name="color-fade" mode="out-in">
      <form key="signUpForm" v-if="!showForgotPassword" class="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4" @submit.prevent="handleFormSubmit">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            :class="formErrors.email ? 'border-red-500' : ''"
            id="email" 
            type="text" 
            placeholder="Email" 
            v-model="email">
        </div>
        <div v-if="showSignup" class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="formErrors.username ? 'border-red-500' : ''"
            id="username" 
            type="text" 
            placeholder="Username" 
            v-model="username">
        </div>
        <div :class="showSignup ? 'mb-4' : 'mb-6'">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="formErrors.password ? 'border-red-500' : ''"
            id="password" 
            type="password" 
            placeholder="******************" 
            v-model="password">
        </div>
        <div v-if="showSignup" class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Verify Password
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="formErrors.verifyPassword ? 'border-red-500' : ''"
            id="verifyPassword" 
            type="password" 
            placeholder="******************" 
            v-model="verifyPassword">
        </div>
        <div class="flex items-center justify-around">
          <a v-if="!showSignup" class="font-light text-green-700 border border-green-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" @click.prevent="showSignup = !showSignup; formErrors = []">Sign Up</a>
          <a v-if="showSignup" class="font-light text-green-700 border border-green-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" @click.prevent="showSignup = !showSignup; formErrors = []">Sign In</a>
          <button 
            @click.prevent="handleFormSubmit"
            v-if="showSignup" 
            class="transition-color bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
            :disabled="loginLoading">
            Sign Up
            <div v-if="loginLoading" class="lds-ring ml-2"><div></div><div></div><div></div><div></div></div>
          </button>
          <button 
            @click.prevent="handleFormSubmit"
            v-if="!showSignup"
            class="transition-color font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center" 
            type="submit"
            :disabled="loginLoading"
            :class="loginLoading ? 'bg-gray-400 hover:bg-gray-400 text-gray-600 cursor-default' : 'bg-green-700 hover:bg-green-500 text-white'">
            Sign In
            <div v-if="loginLoading" class="lds-ring ml-2"><div></div><div></div><div></div><div></div></div>
          </button>
        </div>
        <div class="mt-4">
          <transition-group name="login-error-fade">
            <p v-for="error in formErrors" :key="error" class="text-sm text-red-500 py-1">
              {{error}}
              <button @click.prevent="resendVerification" type="button" class="text-green-700 font-bold hover:text-green-500" v-if="error.includes('Account is not verified')">Resend verification link?</button>
            </p>
          </transition-group>
        </div>
        <div v-if="!showSignup" class="flex justify-center mt-6">
          <button type="button" @click.prevent="showForgotPassword = true;formHasErrors = false;formErrors = {}" class="align-baseline font-bold text-sm text-green-700 hover:text-green-500" href="#">
            Forgot Password?
          </button>
        </div>
      </form>
      <form key="forgotPassForm" v-else class="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            :class="formErrors.email ? 'border-red-500' : ''"
            id="email" 
            type="text" 
            placeholder="Email" 
            v-model="email">
        </div>
        <div class="flex justify-around pt-8">
          <button
            type="button"
            @click.prevent="showForgotPassword = false;formHasErrors = false;formErrors = {}"
            class="py-2 px-4 rounded border border-green-700 text-green-700 focus:outline-none focus:shadow-outline flex items-center">
            Cancel
          </button>
          <button
            class="transition-color font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center" 
            type="submit"
            @click.prevent="handleSendResetLink"
            :disabled="loginLoading"
            :class="loginLoading ? 'bg-gray-400 hover:bg-gray-400 text-gray-600 cursor-default' : 'bg-green-700 hover:bg-green-500 text-white'">
            Send Link
            <div v-if="loginLoading" class="lds-ring ml-2"><div></div><div></div><div></div><div></div></div>
          </button>
        </div>

        <div class="mt-4">
          <transition-group name="login-error-fade" mode="out-in">
            <p v-for="error in formErrors" :key="error" class="text-sm text-red-500 py-1">{{error}}</p>
          </transition-group>
          <p v-if="showForgotPassMessage">{{message}}</p>
        </div>
      </form>
    </transition>
  </div>
  <div v-else class="w-full max-w-sm m-4">
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      verifyPassword: '',
      showSignup: false,
      loginError: '',
      loginLoading: false,
      formErrors: {},
      formHasErrors: false,
      showForgotPassword: false,
      message: '',
      showMessage: false,
      showForgotPassMessage: false,
    }
  },
  methods: {
    login() {
      this.verifyLogin();

      if(!this.formHasErrors) {
        this.loginLoading = true;
        this.$store.dispatch('retrieveToken', {
          email: this.email,
          password: this.password,
        }).then(res => {
          if(res === 200) {
            this.loginLoading = false;
          } else {
            this.formErrors.login = res.data.message;
            this.loginLoading = false;
          }
        }).catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
          this.loginLoading = false;
        })
      }
    },
    signUp() {
      this.verifySignup();

      if(!this.formHasErrors) {
        this.loginLoading = true;
        this.$store.dispatch('signUp', {
          email: this.email,
          username: this.username,
          password: this.password,
        }).then(res => {
          if(res === 200) {
            this.loginLoading = false;
            this.message = "A verification link has been sent to your email. Please verify your account to sign in."
            this.showMessage = true;
          } else {
            this.formErrors.login = res.message;
            this.loginLoading = false;
          }
        }).catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
          this.loginLoading = false;
        })
      }
    },
    verifyLogin() {
      this.formHasErrors = false;
      this.formErrors = {};
      const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
      if(!this.email.trim().match(emailRegex)) {this.formErrors.email = 'Email is invalid.'; this.formHasErrors = true}
      if(this.password.trim() < 5) {this.formErrors.password = 'Password must be 6 characters or greater.'; this.formHasErrors = true}
    },
    verifySignup() {
      this.formHasErrors = false;
      this.formErrors = {};
      const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
      if(!this.email.trim().match(emailRegex)) {this.formErrors.email = 'Email is invalid.'; this.formHasErrors = true}
      if(this.password.trim() < 5) {this.formErrors.password = 'Password must be 6 characters or greater.'; this.formHasErrors = true}
      if(this.verifyPassword.trim() < 1 || this.password !== this.verifyPassword) {this.formErrors.verifyPassword = 'Passwords do not match.'; this.formHasErrors = true}
      if(this.username.trim() < 1) {this.formErrors.username = 'Username is invalid. Must be at least one character long.'; this.formHasErrors = true}
    },
    handleFormSubmit() {
      !this.showSignup ? this.login() : this.signUp();
    },
    handleSendResetLink() {
      this.formHasErrors = false;
      this.formErrors = {};
      const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
      if(!this.email.trim().match(emailRegex)) {this.formErrors.email = 'Email is invalid.'; this.formHasErrors = true}

      if(!this.formHasErrors) {
        this.loginLoading = true;
        this.$store.dispatch('sendPassReset', this.email).then(res => {
          if(res === 200) {
            this.loginLoading = false;
            this.message = "Please check your email for the reset password link."
            this.showForgotPassMessage = true;
          } else if (res === 204) {
            this.loginLoading = false;
            this.formHasErrors = true;
            this.formErrors.passReset = "User does not exist.";
          }
        });
      }
    },
    resendVerification() {
      this.formHasErrors = false;
      this.formErrors = {};
      const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
      if(!this.email.trim().match(emailRegex)) {this.formErrors.email = 'Email is invalid.'; this.formHasErrors = true}

      if(!this.formHasErrors) {
        this.$store.dispatch('resendVerification', this.email).then(() => {
          this.formHasErrors = false;
          this.formErrors = {};
        });
      }
    }
  }
}
</script>

<style>
  .login-error-fade-enter-active, .login-error-fade-leave-active {
    transition: all .3s ease;
  }

  .login-error-fade-enter, .login-error-fade-leave-to {
    opacity: 0;
    transform: translateY(-15px);
  }

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 1rem;
    height: 1rem;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 1rem;
    height: 1rem;
    border: 2px solid #718096;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #718096 transparent transparent transparent;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>