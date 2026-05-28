<script setup>
import { computed } from 'vue';
import { calculateOverallConversionRate, findBiggestDropoffStep } from '../../composables/useCampaignAnalysis';
import FunnelStep from '../FunnelStep/FunnelStep.vue';
import InsightPanel from '../InsightPanel/InsightPanel.vue';

const props = defineProps({
  campaign: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['back']);

const overallConversion = computed(() => {
  return calculateOverallConversionRate(props.campaign);
});

const biggestDropoffStepId = computed(() => {
  const worstStep = findBiggestDropoffStep(props.campaign);
  return worstStep ? worstStep.id : null;
});

function handleBack() {
  emit('back');
}
</script>

<template>
  <div class="animate-fade-in-up">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <button 
          @click="handleBack" 
          class="text-dusty-grape hover:text-space-indigo font-medium text-sm mb-2 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <i class="fa-solid fa-arrow-left"></i> Back to Campaigns
        </button>
        <h2 class="text-3xl font-bold text-space-indigo">{{ campaign.name }}</h2>
        <span class="inline-flex items-center gap-2 text-sm text-dusty-grape-600 mt-2 bg-white px-3 py-1 rounded-full border border-lilac-ash-200 shadow-sm">
          <i class="fa-solid" :class="campaign.device === 'mobile' ? 'fa-mobile-screen-button' : 'fa-desktop'"></i>
          {{ campaign.device.charAt(0).toUpperCase() + campaign.device.slice(1) }} Campaign
        </span>
      </div>
      
      <div class="bg-white p-4 rounded-xl border border-lilac-ash-200 shadow-sm flex flex-col items-center md:items-end min-w-[200px]">
        <span class="text-sm font-medium text-dusty-grape">Overall Conversion Rate</span>
        <span class="text-3xl font-bold text-space-indigo">{{ overallConversion }}%</span>
      </div>
    </div>

    <!-- Funnel Steps -->
    <div class="relative">
      <!-- Connecting Line for larger screens -->
      <div class="hidden md:block absolute left-12 top-10 bottom-10 w-0.5 bg-lilac-ash-300 z-0"></div>
      
      <div class="relative z-10">
        <FunnelStep 
          v-for="(step, index) in campaign.steps" 
          :key="step.id"
          :step="step"
          :index="index"
          :isBiggestDropoff="step.id === biggestDropoffStepId"
        />
      </div>
    </div>

    <!-- Insights Section -->
    <InsightPanel :campaign="campaign" />
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
