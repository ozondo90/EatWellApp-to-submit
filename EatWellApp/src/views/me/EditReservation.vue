<template>
  <div class="container w-11/12 h-screen mx-auto relative">
    <div
      class="flex justify-center items-center shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg w-10/12 h-[75%]"
    >
      <RouterLink
        :to="`/restaurant-details/${id}`"
        class="block h-full w-1/2 overflow-hidden relative rounded-l-lg"
      >
        <img
          class="w-full h-full object-cover"
          :src="
            restaurant.profilPicture
              ? `http://localhost:3000/${restaurant.profilPicture}`
              : '../../../public/pexels-on-shot-2788792.jpg'
          "
          alt=""
          title=""
        />
        <div
          class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
        ></div>
      </RouterLink>
      <div class="h-full w-1/2 text-center py-6 px-3 space-y-2 overflow-hidden">
        <h1 class="text-center text-xl font-bold leading-5 text-purple-400">
          {{ restaurant.restaurantName }}
        </h1>
        <form
          action=""
          class="space-y-4 overflow-y-scroll h-full py-5"
          @submit.prevent="submitFormData"
        >
          <div
            class="form__block flex justify-between items-center flex-wrap sm:gap-y-3 md:gap-x-5 border-b-2 pb-5 border-neutral-200 mx-3 shadow-sm"
          >
            <p
              class="md:w-[30%] sm:w-full overflow-hidden space-y-2 text-left flex-grow p-2"
            >
              <label
                for="numberOfSeat"
                class="text-sm font-semibold text-neutral-500 pb-3"
                >Nombre de place</label
              >
              <input
                type="number"
                name="numberOfSeat"
                id="numberOfSeat"
                placeholder="0"
                required
                class="w-full h-[40px] bg-white rounded-md border-0 ring-1 ring-neutral-300 drop-shadow-md hover:ring-purple-400 focus:ring-purple-400 focus:outline-none transition duration-200 pl-2"
                v-model = "formData.numberOfSeat"
              />
            </p>
            <p
              class="md:w-[30%] sm:w-full overflow-hidden space-y-2 text-left flex-grow p-2"
            >
              <label
                for="numberOfSeat"
                class="text-sm font-semibold text-neutral-500 pb-3"
                >Date</label
              >
              <input
                type="date"
                name="reservationDate"
                id="reservationDate"
                required
                class="w-full h-[40px] bg-white rounded-md border-0 ring-1 ring-neutral-300 drop-shadow-md hover:ring-purple-400 focus:ring-purple-400 focus:outline-none transition duration-200 pl-2"
                v-model="formData.reservationDate"
              />
            </p>
            <p
              class="md:w-[30%] sm:w-full overflow-hidden space-y-2 text-left flex-grow p-2"
            >
              <label
                for="numberOfSeat"
                class="text-sm font-semibold text-neutral-500 pb-3"
                >Type de place</label
              >
              <select
                name="typeSeat"
                id="typeSeat"
                class="w-full h-[40px] rounded-md border-0 ring-1 ring-neutral-300 drop-shadow-md bg-white hover:ring-purple-400 focus:ring-purple-400 focus:outline-none transition duration-200 pl-2"
                v-model="formData.typeOfSeat"
              >
                <option value="bar interieur">Bar inrerieur</option>
                <option value="bar exterieur">Bar exterieur</option>
                <option value="place dinner interieur">Place dinner int</option>
                <option value="place dinner exterieur">PLace dinner ext</option>
                <option value="place piscine">PLace piscine</option>
              </select>
            </p>
          </div>
          <fieldset
            class="form__block border-2 border-neutral-50 shadow-md p-3 mx-3 h-full"
          >
            <legend class="text-sm font-semibold capitalize text-neutral-500">
              Heure de reservation
            </legend>
            <div
              class="grid grid-cols-4 grid-flow-row justify-center items-center h-full" 
            >

              <p
                class="flex justify-center items-center relative text-neutral-700 text-sm font-light"
                v-for="(reservationTime , index) in reservationTimes" :key="index"
              >
                <input
                  type="radio"
                  :id="`resTime${index}`"
                  name ="resTime"
                  :value="reservationTime"
                  v-model ="formData.selectedReservationTimes"
                  class="peer hidden"
                />

                <label
                  :for="`resTime${index}`"
                  class="absolute rounded-full border-neutral-100 bg-gray-50 px-4 py-2 border-2 hover:border-purple-100 hover:bg-purple-200 cursor-pointer peer-checked:bg-purple-200 peer-checked:border-purple-100"
                  >{{ reservationTime }}</label
                >
              </p>

            </div>
          </fieldset>
          <div class="form__block p-3 space-y-4">
            <p
              class="text-neutral-700 text-base font-semibold text-left leading-3"
            >
              Term et condition du restaurant
            </p>
            <p class="text-neutrale-400 text-sm font-light p-4">
              Termes et conditions: *Veuillez noter que votre table est réservée
              2 heures avant le prochain service, veuillez nous informer si vous
              avez besoin de plus de temps. *Nous pourrons garder votre table
              pendant un maximum de 15 minutes au-delà de votre heure de
              réservation. *Une politique d'âge de 21 ans et plus s'applique
              après 20h00 dans les espaces bar. *Code vestimentaire après 18h00
              : chic et décontracté. Pour les hommes élégants, les shorts
              jusqu'aux genoux sont autorisés, mais pas de gilets ni de
              sandales.
            </p>
          </div>
          <button
            type="submit"
            class="btn block w-10/12 mx-auto text-center rounded-lg p-4 text-white bg-purple-700 hover:bg-neutral-900 border-none hover:ring-1 hover:ring-neutral-700"
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute , useRouter } from "vue-router";
import { useAxios } from "@/lib/composables/useAxios";
import { onMounted, ref } from "vue";
import type { Restaurants } from "@/types/Restaurants";

const { id } = useRoute().params;
const Router = useRouter();
const restaurant = ref<Restaurants>({
  restaurantName: "",
  emailContact: "",
  phone: "",
  country: "",
  town: "",
  professionnalAddress: "",
  openingTime: "",
  closingTime: "",
  openingDays: [],
  profilPicture: "",
  userId: "",
  longitude: "",
  latitude: "",
  CarteGastro: [],
});


const formData = ref<{
  restaurantId : string,
  selectedReservationTimes: string,
  numberOfSeat : number,
  reservationDate : Date | null,
  typeOfSeat : string
}>({
  restaurantId : `${id}`,
  selectedReservationTimes: "",
  numberOfSeat : 0,
  reservationDate : null,
  typeOfSeat : ""
});

const reservationTimes = [
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

onMounted(async () => {
  try {
    const { data } = await useAxios.get(`restaurants/${id}`);
    data.profilPicture = data.profilPicture.replace("upload", "uploads");
    restaurant.value = data;
  } catch (err) {
    console.log(err);
  }
});

async function submitFormData(){
  console.log(formData.value)
  try{
    const { data , status } = await useAxios.post("reservations" , formData.value);
    if(status != 201){
      return console.log("err message" , data)
    }

    return Router.replace("/profil")
  }catch(err){
    console.log(err)
  }
}
</script>

<style scoped>
.overflow-y-scroll::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-scroll::-webkit-scrollbar-thumb {
  background-color: rgb(189, 189, 189); /* Red thumb color */
  border-radius: 6px;
}

.overflow-y-scroll::-webkit-scrollbar-track {
  background-color: #e9e7e7; /* Purple track color */
}
</style>
