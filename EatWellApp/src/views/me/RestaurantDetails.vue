<template>
  <div class="container w-11/12 mx-auto space-y-6">
    <div class="flex justify-between items-center mt-5">
      <h1 class="leading-5 font-bold text-xl"> {{ restaurant.restaurantName }} </h1>
      <p class="space-x-4 flex text-base font-semibold">
        <RouterLink to="" class="cursor-pointed hover:text-purple-700">
          <span class="text">Avis</span>
        </RouterLink>
        <button class="text-center space-x-2 flex cursor-pointed hover:text-purple-700">
          <IconHeartPusle class="w-[25px] h-[25px] text-purple-700 fill-purple-700 stroke-purple-700"/>
          <span>Enregister</span>
        </button>
      </p>
    </div>

    <div class="flex justify-start items-center space-x-8 leading-5">
      <p class="flex justify-start items-center gap-1">
        <span class="text-lg font-semibold">Note</span>
        <IconStar class="text-purple-700"/>
        <IconStar class="text-purple-700"/>
        <IconStar class="text-purple-700"/>
        <IconStar class="text-gray-700"/>
        <IconStar class="text-gray-700"/>
        </p>
      <p class="text-lg font-semibold">Ranking</p>
    </div>

    <div
      class="overflow-hidden h-[550px] relative rounded-lg shadow-lg drop-shadow-md"
    >
      <img
        :src="restaurant.profilPicture?`http://localhost:3000/${restaurant.profilPicture}`: '../../../public/pexels-on-shot-2788792.jpg'"
        alt=""
        class="w-full h-full object-cover"
      />
      <div
        class="absolute top-0 left-0 right-0 bottom-0 h-full bg-gray-900 opacity-25 transition duration-300 hover:bg-transparent"
      ></div>
      <button class="block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-5 bg-purple-700 hover:bg-neutral-800 text-lg font-semibold text-center text-white shadow-md shadow-transparent">Reserver maintenant</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-between items-center">
      
      <div
        class="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h2
          class="p-4 border-b-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white bg-gray-50"
        >
        Avis
        </h2>
        <p class="p-4 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>

      <div
        class="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h2
          class="p-4 border-b-2 bg-gray-50 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
        Details
        </h2>
        <p class=" p-4  font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>

      <div
        class="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h2
          class="p-4 border-b-2 bg-gray-50 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
        Emplacement et coordonnées
        </h2>
        <p class="p-4 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAxios } from '@/lib/composables/useAxios';
import { onMounted , ref } from 'vue';
import type { Restaurants } from '@/types/Restaurants';
import IconStar from '@/components/icons/IconStar.vue';
import IconHeartPusle from '@/components/icons/IconHeartPusle.vue';

const {id} = useRoute().params;
const restaurant = ref<Restaurants>({
  restaurantName  : "",
  emailContact : "",
  phone : "",
  country : "",
  town : "",
  professionnalAddress : "",
  openingTime : "",
  closingTime : "",
  openingDays : [],
  profilPicture : "",
  userId : "",
  longitude : "",
  latitude : "",
  CarteGastro : []
})
onMounted(async()=>{
  try{
    const { data } = await useAxios.get(`restaurants/${id}`);
    data.profilPicture = data.profilPicture.replace("upload" , "uploads");
    console.log(data.profilPicture);
    restaurant.value = data

  }catch(err){
    console.log(err)
  }
})
</script>

<style scoped></style>
