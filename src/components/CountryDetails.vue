<template>
  <div class="country-details">
    <h1>Details for {{ countryDetails?.country }}</h1>
    <div>
      <p><strong>Gold:</strong> {{ countryDetails?.gold }}</p>
      <p><strong>Silver:</strong> {{ countryDetails?.silver }}</p>
      <p><strong>Bronze:</strong> {{ countryDetails?.bronze }}</p>
      <p><strong>Total:</strong> {{ countryDetails?.total }}</p>
    </div>

    <h2>Sports Achievements</h2>
    <SportList :sports="sportsDetails" />

    <h2>Cheer for Athletes</h2>
    <CommentSection :Code="countryCode" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import SportList from '@/components/SportList.vue';
import CommentSection from '@/components/CommentionSection.vue';
import CountryService from '@/services/CountryService';
import type { country } from '@/type';
import SportService from '@/services/SportService';

export default defineComponent({
  name: 'CountryDetails',
  components: { SportList, CommentSection },
  setup() {
    const countryCode = ref<string | null>(null);
    const countryDetails = ref<country | null>(null);
    const sportsDetails = ref<{ sport: string; medals: { gold: number; silver: number; bronze: number } }[]>([]);

    // 获取路由参数并加载数据
    onMounted(async () => {
      const routeParams = new URLSearchParams(window.location.search);
      countryCode.value = routeParams.get('code');

      if (countryCode.value) {
        // 获取国家详情
        const response = await CountryService.getCountries();
        countryDetails.value = response.data.find(
          (c: country) => c.code === countryCode.value
        );

        // 获取运动项目详情
        const sportsResponse = await SportService.getSports();
        sportsDetails.value = sportsResponse.data
          .filter((sport: any) =>
            sport.results.some((result: any) => result.code === countryCode.value)
          )
          .map((sport: any) => ({
            sport: sport.sport,
            medals: sport.results.find(
              (result: any) => result.code === countryCode.value
            ).medals,
          }));
      }
    });

    return {
      countryDetails,
      sportsDetails,
      countryCode,
    };
  },
});
</script>

<style scoped>
.country-details {
  padding: 20px;
}
</style>
