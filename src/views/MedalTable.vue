<template>
  <div class="medal-table p-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold text-center text-blue-700 mb-6">Olympic Medal Table</h1>
    <div class="overflow-x-auto">
      <table class="table-auto w-full bg-white shadow-md rounded-lg">
        <thead class="bg-blue-700 text-white">
          <tr>
            <th class="px-4 py-2 text-left">Rank</th>
            <th class="px-4 py-2 text-left">Country</th>
            <th class="px-4 py-2 text-left">Gold</th>
            <th class="px-4 py-2 text-left">Silver</th>
            <th class="px-4 py-2 text-left">Bronze</th>
            <th class="px-4 py-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(country, index) in paginatedCountries"
            :key="index"
            class="hover:bg-gray-100 transition"
          >
            <td class="border px-4 py-2">{{ startIndex + index + 1 }}</td>
            <td class="border px-4 py-2">
              <router-link
                :to="`/detail/${country.country}`"
                class="text-blue-500 hover:underline"
              >
                {{ country.country }}
              </router-link>
            </td>
            <td class="border px-4 py-2 text-yellow-600 font-bold">{{ country.gold }}</td>
            <td class="border px-4 py-2 text-gray-500">{{ country.silver }}</td>
            <td class="border px-4 py-2 text-orange-600">{{ country.bronze }}</td>
            <td class="border px-4 py-2">{{ country.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination flex justify-between items-center mt-6">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import CountryService from '@/services/CountryService';
import type { country } from '@/type';

export default defineComponent({
  name: 'MedalTable',
  setup() {
    const countries = ref<country[]>([]);
    const countriesPerPage = ref(5);
    const currentPage = ref(1);

    const totalPages = computed(() =>
      Math.ceil(countries.value.length / countriesPerPage.value)
    );

    const startIndex = computed(() =>
      (currentPage.value - 1) * countriesPerPage.value
    );

    const paginatedCountries = computed(() =>
      countries.value.slice(
        startIndex.value,
        startIndex.value + countriesPerPage.value
      )
    );

    const fetchCountries = async () => {
      try {
        const response = await CountryService.getCountries();
        countries.value = response.data;
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    onMounted(fetchCountries);

    return {
      countries,
      countriesPerPage,
      currentPage,
      totalPages,
      startIndex,
      paginatedCountries,
      prevPage,
      nextPage,
    };
  },
});
</script>
