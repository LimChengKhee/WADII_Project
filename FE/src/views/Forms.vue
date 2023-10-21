<template>
    <hotelForm></hotelForm>
    <flightForm></flightForm>
</template>

<script>
import hotelForm from '../components/hotelform.vue';
import flightForm from '../components/flightform.vue'
import axios from 'axios';


export default {
    name: 'Forms',
    data() {
        return {};
    },
    methods: {
        getInfo(){
            var url = "http://127.0.0.1:8000/api/location/?format=json"
            axios
            .get(url,{
                headers:{
                    Authorization:  `Token ${localStorage.token}`
                }
            }).then((resp)=>
            {
                console.log(resp.data)
            }).catch((err)=>{
                console.log(err.message)
                console.log(err)
            })
        },

    },
    components: { hotelForm,flightForm },

    mounted(){
        console.log(localStorage.userid)
        this.getInfo();
    }
}

</script>