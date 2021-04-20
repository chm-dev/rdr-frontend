<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    if (!localStorage.jwt) this.$router.push("/login");
  }
};
</script>

<style lang="scss" scoped></style>
