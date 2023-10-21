import Vue from 'vue'

export default {
  getUser: state => {
    console.log('Retrieving user...')
    return state.user;
  }
}
