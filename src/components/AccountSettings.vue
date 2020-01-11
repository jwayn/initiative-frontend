// eslint-disable no-console
<template>
  <div v-if="!loading" class="flex flex-col justify-center w-full max-w-3xl">
    
    <!-- Display account information -->
    <div class="max-w-small flex flex-col justify-center overflow-x-scroll rounded bg-white mt-8 mx-2 shadow">
      <div class="flex flex-row flex-wrap justify-between p-2 bg-gray-300">
        <div>
          <span class="my-1 mr-4 text-gray-600">Username: </span>
        </div>
        <div class="w-1/2">
          <span class="my-1">{{user.username}}</span>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-between p-2 bg-gray-200 wrap-all">
        <div>
          <span class="my-1 mr-4 text-gray-600">Email: </span>
        </div>
        <div class="w-1/2">
          <!-- <span>{{user.email}}</span> -->
          <span>{{user.email}}</span>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-between p-2 bg-gray-300">
        <div>
          <span class="my-1 mr-4 text-gray-600">Account Created:</span>
        </div>
        <div class="w-1/2">
          <span class="my-1">{{accountCreated}}</span>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-between p-2 bg-gray-200">
        <div>
          <span class="my-1 mr-4 text-gray-600">Last Login:</span>
        </div>
        <div class="w-1/2">
          <span class="my-1">{{lastLogin}}</span>
        </div>
      </div>


    </div>
    
    <div class="flex flex-wrap justify-around my-8 w-sm">
      <button @click.prevent="showDeleteAccountModal = true" class="rounded shadow bg-gray-500 text-white px-4 py-2 my-2">Delete Account</button>
      <button @click.prevent="showResetPass = true" class="rounded shadow bg-green-700 text-white px-4 py-2 my-2">Reset Password</button>
    </div>


    <div class="flex justify-center">
      <div v-if="showResetPass" class="w-full max-w-sm md:max-w-md mx-4">
        <form>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="currentPass">
              Current Password
            </label>
            <input
              @change="validatePasswordFields"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="passwordsNotEmpty ? '' : 'border-red-700 bg-red-200'"
              id="currentPass" 
              type="password" 
              placeholder="******************" 
              v-model="currentPass">
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="newPass">
              New Password
            </label>
            <input 
              @change="validatePasswordFields"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="passwordsMatch && passwordsNotEmpty ? '' : 'border-red-700 bg-red-200'"
              id="newPass" 
              type="password" 
              placeholder="******************" 
              v-model="newPass">
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="newPassVerification">
              Verify Password
            </label>
            <input
              @change="validatePasswordFields"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="passwordsMatch && passwordsNotEmpty ? '' : 'border-red-700 bg-red-200'"
              id="newPassVerification" 
              type="password" 
              placeholder="******************" 
              v-model="newPassVerification">
          </div>

          <div class="flex justify-end">

            <button type="submit" @click.prevent="resetPassword" class="rounded text-white py-2 px-8" :class="(!passwordsMatch || !passwordsNotEmpty) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700'" :disabled="!passwordsMatch || !passwordsNotEmpty">
              Save
            </button>
          
          </div>

          <p v-if="errorMessage" class="text-red-500 text-center my-8">{{errorMessage}}</p>

        </form>
      </div>
    </div>

    <Modal v-if="showDeleteAccountModal" v-on:cancel="showDeleteAccountModal = false" title="Warning" v-on:gray="showDeleteAccountModal = false" v-on:red="deleteAccount" gray="Cancel" red="Delete">
      <p>Are you sure you want to delete your account? This is irreversable and will delete all stored data associated with your account.</p>
    </Modal>

  </div>
  <Loader v-else class="mt-8" />
</template>

<script>
import moment from 'moment';
import Loader from './Loader';
import Modal from './Modal';

export default {
  data() {
    return {
      user: {},
      loading: false,
      showDeleteAccountModal: false,
      showResetPass: false,
      currentPass: '',
      newPass: '',
      newPassVerification: '',
      passwordsMatch: true,
      passwordsNotEmpty: true,
      errorMessage: '',
    }
  },
  components: {
    Loader,
    Modal,
  },
  computed: {
    lastLogin: function() {return moment.utc(this.user.last_login).local().format('MMMM Do, YYYY @ h:mm:ss a')},
    accountCreated: function() {return moment.utc(this.user.created).local().format('MMMM Do, YYYY @ h:mm:ss a')},
    
  },
  methods: {
    deleteAccount() {
      this.$store.dispatch('deleteAccount');
    },
    resetPassword() {
      this.validatePasswordFields();
      if(this.passwordsMatch && this.passwordsNotEmpty) {
          this.$store.dispatch('updatePassword', {currentPass: this.currentPass, newPass: this.newPass}).then(res => {
            //eslint-disable-next-line
            console.log(res);
            if(res === 200) {
              this.currentPass = '';
              this.newPass = '';
              this.newPassVerification = '';
              this.errorMessage = 'New password saved.';
            } else {
              this.errorMessage = 'Could not update password. Please try again.'
            }
          });
      }
    },
    validatePasswordFields() {
      this.passwordsMatch = true;
      this.passwordsNotEmpty = true;
      if(!(this.currentPass.trim().length > 5 && this.newPass.trim().length > 5 && this.newPassVerification.trim().length > 5)) {
        this.passwordsNotEmpty = false;
      }

      if(this.newPass.trim() !== this.newPassVerification.trim()) {
        this.passwordsMatch = false;
      }
    }
  },
  async mounted() {
    this.loading = true;
    this.$store.dispatch('getUserData').then(res => {
      this.user = res;
    }).then(() => {
      this.loading = false;
    });
  }
}
</script>

<style>
  td {
    word-break:break-all;
  }

  .wrap-all {
    word-break: break-all;
  }
</style>