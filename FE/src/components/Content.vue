<script setup>
import NavButtons from '../components/navButton.vue';
import { useStepStore } from '../store/piniaStore/step';

const stepStore = useStepStore();
</script>

<template>
    <div class="main-container">
        <div class="main-content">
            <slot />
        </div>
        <NavButtons v-if="stepStore.step < 4" />
    </div>
</template>

<style scoped>
.main-container {
    padding: 20px 100px;
    margin-left: 20px;
    width: calc(100% - 320px);
}

.main-content {
    height: 600px;
    width: 100%;
}
</style>