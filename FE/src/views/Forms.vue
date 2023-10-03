<template>
    <hotelForm></hotelForm>
    <flightForm></flightForm>
</template>

<script>
import hotelForm from '../components/hotelform.vue';
import flightForm from '../components/flightform.vue'


export default {
    name: 'Forms',
    data() {
        return {};
    },
    methods: {},
    components: { hotelForm,flightForm }
}

</script>