<script setup>
import { computed } from 'vue';
import { generateInsights } from '../../composables/useCampaignAnalysis';

const props = defineProps({
  campaign: {
    type: Object,
    required: true
  }
});

const insights = computed(() => {
  return generateInsights(props.campaign);
});
</script>

<template>
  <div class="bg-gradient-to-br from-space-indigo-50 to-space-indigo-100 p-6 rounded-2xl border border-space-indigo-200 shadow-sm mt-8">
    <h3 class="text-xl font-bold text-space-indigo flex items-center gap-2 mb-4">
      <i class="fa-solid fa-lightbulb text-yellow-500"></i>
      Actionable Insights & Recommendations
    </h3>
    
    <ul class="space-y-3">
      <li 
        v-for="(insight, index) in insights" 
        :key="index"
        class="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-lilac-ash-200"
      >
        <i class="fa-solid fa-arrow-right text-space-indigo-500 mt-1"></i>
        <span class="text-space-indigo-100 font-medium leading-relaxed">{{ insight }}</span>
      </li>
    </ul>
  </div>
</template>
