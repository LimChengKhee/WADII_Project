<script setup>
import { defineProps } from "vue";

const props = defineProps({
    step: {
        type: Object,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    }
});

</script>

<template>
    <div class="sidebar-step-container mb-3 me-auto">
        <span class="sidebar-step-number " :class="{ active: active }">{{ step.number }}</span>
        <div class="sidebar-step ms-2 ">
            <span>STEP {{ step.number }}</span>
            <span>{{ step.label }}</span>
        </div>
    </div>
</template>

<style scoped>

.sidebar-step-span{
    font-size: 5px;
}
.sidebar-step-container {
    display: flex;
    align-items: center;
    color: white;
}

.sidebar-step-number {
    width: 40px;
    height: 40px;
    border: 1px solid lightblue;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
}


.sidebar-step-number.active {
    background: white;
    color: black;
}

.sidebar-step span {
    display: block;
    text-align: left;
}

.sidebar-step span:first-child {
    font-size: 10px;
    color: lightblue;
}

.sidebar-step span:last-child {
    font-size: 10px;
    font-weight: 600;
}

@media only screen and (min-width: 768px) {
    .sidebar-step-container {
    display: flex;
    align-items: center;
    color: var(--white);
    margin-bottom: 40px !important;
    
}

.sidebar-step-number {
    width: 40px;
    height: 40px;
    border: 1px solid var(--light-blue);
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
}

.sidebar-step span:first-child {
    font-size: 14px;
    color: var(--light-blue);
}

.sidebar-step span:last-child {
    font-size: 16px;
    font-weight: 600;
}
}
</style>