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
      <button @click.prevent="showResetPasswordModal = true" class="rounded shadow bg-green-700 text-white px-4 py-2 my-2">Reset Password</button>
    </div>

    <Modal v-if="showResetPasswordModal" v-on:cancel="showResetPasswordModal = false" v-on:green="showResetPasswordModal = false" green="Ok" title="Hey, listen!">
      <p>A reset password link has been sent to <span class="font-bold">{{user.email}}</span>. Please follow the link to reset your password.</p>
    </Modal>

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
      showResetPasswordModal: false,
      showDeleteAccountModal: false,
    }
  },
  components: {
    Loader,
    Modal,
  },
  computed: {
    accountCreated: function() {return moment(this.user.created).format('MMM Do YYYY h:mm:ss a')},
    lastLogin: function() {return moment(this.user.last_login).format('MMM Do YYYY h:mm:ss a')},
    
  },
  methods: {
    deleteAccount() {
      this.$store.dispatch('deleteAccount');
    },
    resetPassword() {
      /* TODO */
      //Show a reset password form
      //Create backend route for resetting password with original
    },
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