<script setup>
import { computed } from 'vue';
import { calculateStepConversionRate, calculateStepDropoffRate } from '../../composables/useCampaignAnalysis';

const props = defineProps({
  step: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  isBiggestDropoff: {
    type: Boolean,
    default: false
  }
});

const conversionRate = computed(() => {
  return calculateStepConversionRate(props.step);
});

const dropoffRate = computed(() => {
  return calculateStepDropoffRate(props.step);
});

const stepIcon = computed(() => {
  switch (props.step.type) {
    case 'teaser': return 'fa-comment-dots';
    case 'email': return 'fa-envelope-open-text';
    case 'success': return 'fa-circle-check';
    case 'exit-intent': return 'fa-person-walking-arrow-right';
    case 'coupon': return 'fa-ticket';
    default: return 'fa-layer-group';
  }
});
</script>

<template>
  <div class="relative flex flex-col md:flex-row items-center md:items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border transition-all duration-500 mb-6"
       :class="isBiggestDropoff ? 'border-red-400 ring-2 ring-red-100 shadow-md' : 'border-lilac-ash-200'">
    
    <!-- Step Number Indicator -->
    <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-sm"
         :class="isBiggestDropoff ? 'bg-red-500' : 'bg-space-indigo'">
      {{ index + 1 }}
    </div>

    <!-- Content -->
    <div class="flex-grow w-full">
      <div class="flex items-center gap-3 mb-2">
        <i class="fa-solid text-dusty-grape-500" :class="stepIcon"></i>
        <h4 class="text-xl font-bold text-space-indigo">{{ step.name }}</h4>
        <span v-if="isBiggestDropoff" class="ml-auto bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          <i class="fa-solid fa-triangle-exclamation mr-1"></i> Biggest Drop-off
        </span>
      </div>
      
      <p class="text-dusty-grape mb-4 text-sm">{{ step.description }}</p>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-parchment p-4 rounded-xl">
        <div class="flex flex-col">
          <span class="text-xs text-dusty-grape-600 font-medium uppercase mb-1">Visitors (Views)</span>
          <span class="text-lg font-semibold text-space-indigo">{{ step.views.toLocaleString() }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-dusty-grape-600 font-medium uppercase mb-1">Proceeded</span>
          <span class="text-lg font-semibold text-space-indigo">{{ step.proceeds.toLocaleString() }}</span>
        </div>
        <div class="flex flex-col border-l-0 lg:border-l border-lilac-ash-300 lg:pl-4">
          <span class="text-xs text-dusty-grape-600 font-medium uppercase mb-1">Step Conversion</span>
          <span class="text-lg font-semibold text-green-600">{{ conversionRate }}%</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-dusty-grape-600 font-medium uppercase mb-1">Drop-off Rate</span>
          <span class="text-lg font-semibold" :class="isBiggestDropoff ? 'text-red-600' : 'text-dusty-grape-600'">
            {{ dropoffRate }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
