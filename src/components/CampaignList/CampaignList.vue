<script setup>
import CampaignCard from '../CampaignCard/CampaignCard.vue';

defineProps({
  campaigns: {
    type: Array,
    required: true
  },
  selectedCampaignId: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['select-campaign']);

function onSelect(campaign) {
  emit('select-campaign', campaign);
}
</script>

<template>
  <div class="mb-10">
    <h2 class="text-2xl font-bold text-space-indigo mb-6">Your Campaigns</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CampaignCard 
        v-for="campaign in campaigns" 
        :key="campaign.id" 
        :campaign="campaign"
        :isSelected="campaign.id === selectedCampaignId"
        @select="onSelect"
      />
    </div>
  </div>
</template>
