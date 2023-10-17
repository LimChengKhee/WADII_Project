<script setup>
import { computed } from 'vue';
import { useItineraryStore } from '../store/piniaStore/itinerary';
import Datepicker from '@vuepic/vue-datepicker';


const itineraryStore = useItineraryStore();

const duration = computed(() => {
    return itineraryStore.yearly ? 'yr' : 'mo';
})


</script>

<template>
    <div>
        <h2 class="title">Select your flight</h2>
        <p class="subtitle">You have the option of monthly or yearly billing.</p>

        <div class="form-group">
            <div class="form-group-label">
                <label for="name">Flight Number</label>
                <span v-if="itineraryStore.errors.date">{{ itineraryStore.errors.date }}</span>
            </div>
            <input type="text" id="name" placeholder="e.g. Stephen King" autofocus v-model="itineraryStore.name" />
            
        </div>

        <div class="form-group">
            <div class="form-group-label">
                <label for="name">Departure</label>
                <span v-if="itineraryStore.errors.departure_date">{{ itineraryStore.errors.departure_date }}</span>
            </div>
            <div class="row">
                <div class="col"><Datepicker v-model="itineraryStore.departure_date" placeholder="test" :enable-time-picker="true" :text-input="true"/></div>
                <div class="col"><input type="text" id="name" placeholder="SIN" autofocus v-model="itineraryStore.departure_country" /></div>
            </div>
            
        </div>
        <div class="form-group">
            <div class="form-group-label">
                <label for="name">Arrival</label>
                <span v-if="itineraryStore.errors.arrival_date">{{ itineraryStore.errors.arrival_date }}</span>
            </div>
            <div class="row">
                <div class="col"><Datepicker v-model="itineraryStore.arrival_date" placeholder="test" :enable-time-picker="true" :text-input="true"/></div>
                <div class="col"><input type="text" id="name" placeholder="SIN" autofocus v-model="itineraryStore.arrival_country" /></div>
            </div>
            
        </div>

        <div class="form-group">
            <div class="form-group-label">
                <label for="name">Cost</label>
                <span v-if="itineraryStore.errors.flight_cost">{{ itineraryStore.errors.flight_cost }}</span>
            </div>
            <div class="row">
                
                <div class="col"><input type="Number" id="name" placeholder="" autofocus v-model="itineraryStore.flight_cost" /></div>
            </div>
            
        </div>
        
    </div>
</template>

<style scoped>
h2 {
    font-size: 2.5rem;
    font-weight: 600;
    padding: 20px 0;
}

p {
    font-size: 18px;
    margin-bottom: 60px;
    color: var(--cool-gray);
}

.form-group {
    margin-bottom: 40px;
}

.form-group label {
    display: block;
    font-size: 18px;
    margin-bottom: 10px;
}

.form-group input {
    width: 100%;
    height: 50px;
    border: 1px solid var(--cool-gray);
    border-radius: 8px;
    padding: 0 20px;
    font-size: 18px;
    padding: 24px 16px;
}

.form-group input:focus {
    outline: none;
    border: 1px solid var(--purplish-blue);
}

.form-group input::placeholder {
    color: var(--cool-gray);
}

.form-group input[type="email"] {
    text-transform: lowercase;
}

.form-group input[type="email"]:focus {
    text-transform: lowercase;
}

.form-group-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-group-label span {
    color: var(--strawberry-red);
    font-size: 14px;
}
</style>