<script setup>
import { computed } from 'vue';
import { calculateOverallConversionRate } from '../../composables/useCampaignAnalysis';

const props = defineProps({
  campaign: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select']);

const overallConversion = computed(() => {
  return calculateOverallConversionRate(props.campaign);
});

const deviceIcon = computed(() => {
  return props.campaign.device === 'mobile' ? 'fa-mobile-screen-button' : 'fa-desktop';
});

function handleCardClick() {
  emit('select', props.campaign);
}
</script>

<template>
  <div 
    class="relative p-6 bg-white rounded-2xl shadow-sm border transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-md group"
    :class="isSelected ? 'border-space-indigo bg-parchment-500 shadow-md ring-2 ring-space-indigo ring-opacity-50' : 'border-lilac-ash-200 hover:border-space-indigo-400'"
    @click="handleCardClick"
  >
    <!-- Device Icon -->
    <div class="absolute top-6 right-6 text-dusty-grape-400 group-hover:text-space-indigo transition-colors duration-300">
      <i class="fa-solid" :class="deviceIcon"></i>
    </div>

    <!-- Campaign Info -->
    <h3 class="text-lg font-semibold text-space-indigo mb-2 pr-8">{{ campaign.name }}</h3>
    
    <div class="flex flex-col mt-4">
      <span class="text-sm font-medium text-dusty-grape mb-1">Overall Conversion</span>
      <div class="flex items-end gap-2">
        <span class="text-3xl font-bold text-space-indigo">{{ overallConversion }}%</span>
      </div>
    </div>
  </div>
</template>
