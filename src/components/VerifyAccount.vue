<template>
  <div>
      <p v-if="verified">Account verified! You are now being redirected.</p>
      <p v-else>Please wait while we verify your account.</p>
      {{$route.query.token}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            verified: false,
        }
    },
    async mounted() {
        if(this.$route.query.token) {
            // eslint-disable-next-line no-console
            console.log('hello!');
            this.$store.dispatch('verifyAccount', this.$route.query.token).then(() => {
                this.verified = true;
                setTimeout(() => {
                    this.$router.push('/tracker')
                }, 3000);
            });
        }
    }
}
</script>

<style>

</style>