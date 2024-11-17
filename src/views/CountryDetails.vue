<template>
  <div class="country-details flex flex-col items-center p-6 bg-gray-50 min-h-screen">
    <div class="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
      <h1 class="text-3xl font-bold text-blue-700 text-center mb-6">
        Country Details
      </h1>

      <div v-if="countryData" class="space-y-4">
        <p class="text-xl font-semibold text-gray-700">
          <strong>Country Name:</strong> {{ countryData.country }}
        </p>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-lg text-yellow-600 font-semibold">
              Gold Medals: {{ countryData.gold }}
            </p>
            <p class="text-lg text-gray-500 font-semibold">
              Silver Medals: {{ countryData.silver }}
            </p>
            <p class="text-lg text-orange-600 font-semibold">
              Bronze Medals: {{ countryData.bronze }}
            </p>
          </div>
          <div class="flex items-center justify-center">
            <div
              class="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center text-blue-700 text-xl font-bold"
            >
              Total: {{ countryData.total }}
            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-gray-500 text-center">Loading country data...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CountryService from '@/services/CountryService';

// 定义国家类型
interface Country {
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export default defineComponent({
  name: 'CountryDetails',
  props: {
    countryName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const countryData = ref<Country | null>(null);
    const route = useRoute();

    const fetchCountryData = async () => {
      try {
        const response = await CountryService.getCountries();
        const countries: Country[] = response.data;
        countryData.value = countries.find(
          (country) => country.country === route.params.countryName
        ) || null;
      } catch (error) {
        console.error('Failed to fetch country data:', error);
      }
    };

    onMounted(fetchCountryData);

    return {
      countryData,
    };
  },
});
</script>

<style scoped>
.country-details {
  background-color: #f9fafb;
}
</style>
