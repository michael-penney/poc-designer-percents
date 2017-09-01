declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare var process : {
    env: {
      NODE_ENV: string
    }
  }