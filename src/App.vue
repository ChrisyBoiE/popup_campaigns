<script setup>
import { ref } from 'vue';
import campaignData from './data/campaigns.json';
import CampaignList from './components/CampaignList/CampaignList.vue';
import CampaignDetail from './components/CampaignDetail/CampaignDetail.vue';

const campaigns = ref(campaignData.campaigns);
const selectedCampaign = ref(null);

function handleSelectCampaign(campaign) {
  selectedCampaign.value = campaign;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleBackToList() {
  selectedCampaign.value = null;
}
</script>

<template>
  <div class="min-h-screen bg-parchment font-sans py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
    <div class="max-w-5xl mx-auto">
      
      <!-- App Header -->
      <header class="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 class="text-4xl font-extrabold text-space-indigo tracking-tight mb-2">
            Funnel Analyzer
          </h1>
          <p class="text-dusty-grape text-lg">Understand your popup campaign drop-offs.</p>
        </div>
      </header>

      <!-- Main Content Area -->
      <main>
        <transition name="fade" mode="out-in">
          <CampaignDetail 
            v-if="selectedCampaign" 
            :campaign="selectedCampaign" 
            @back="handleBackToList"
          />
          <CampaignList 
            v-else 
            :campaigns="campaigns" 
            @select-campaign="handleSelectCampaign" 
          />
        </transition>
      </main>

      <!-- Footer -->
      <footer class="mt-20 pt-8 text-center text-dusty-grape-600 text-sm">
      </footer>
    </div>
  </div>
</template>

<style>
/* Global Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
