<script setup>

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
    <div class="sidebar-step-container">
        <span class="sidebar-step-number" :class="{ active: active }">{{ step.number }}</span>
        <div class="sidebar-step">
            <span>STEP {{ step.number }}</span>
            <span>{{ step.label }}</span>
        </div>
    </div>
</template>

<style scoped>
.sidebar-step-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: white;
    margin-bottom: 40px;
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
    background-color: lightblue;
    color: purple;
}

.sidebar-step {
    margin-left: 20px;
}

.sidebar-step span {
    display: block;
    text-align: left;
}

.sidebar-step span:first-child {
    font-size: 14px;
    color: lightblue;
}

.sidebar-step span:last-child {
    font-size: 16px;
    font-weight: 600;
}
</style>