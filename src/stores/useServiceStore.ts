import type { Service } from '@/types';
import { defineStore } from 'pinia';
import haarImage1 from '../assets/images/haar1.jpg';
import haarImage2 from '../assets/images/haar2.jpg';
import haarImage3 from '../assets/images/haar3.jpg';
import haarImage4 from '../assets/images/haar4.jpg';

interface ServiceState {
  services: Service[];
}

export const useServiceStore = defineStore('serviceStore', {
  state: (): ServiceState => ({
    services: [
      {
        id: 1,
        image: haarImage1,
        name: 'Trocken schneiden & Styling / Cutting & Styling',
        price: '€ 20.00',
        icon: '',
        path: '/service1',
      },
      {
        id: 2,
        image: haarImage2,
        name: 'Basis Paket / Basic Package',
        price: '€ 15.00',
        icon: '',
        path: '/service2',
      },
      {
        id: 3,
        image: haarImage3,
        name: 'Kinderhaarschnitt / Children Haircut',
        price: '€ 10.00',
        icon: '',
        path: '/service3',
      },
      {
        id: 4,
        image: haarImage4,
        name: 'Augenbrauen zupfen(Faden) / Eyebrow plucking(thread)',
        price: '€ 10.00',
        icon: '',
        path: '/service4',
      },
      {
        id: 5,
        image: haarImage4,
        name: 'Bartschnitt  & Kontur(Maschine) / Beard Cut & Contour(Machine)',
        price: '€ 15.00',
        icon: '',
        path: '/service5',
      },
      {
        id: 6,
        image: haarImage1,
        name: 'Bartpflege Classic / Classic Beard Care',
        price: '€ 15.00',
        icon: '',
        path: '/service6',
      },
      {
        id: 7,
        image: haarImage2,
        name: 'Deluxe Paket / Deluxe Package',
        price: '€ 40.00',
        icon: '',
        path: '/service7',
      },
      {
        id: 8,
        image: haarImage1,
        name: 'Premium Paket / Deluxe Package',
        price: '€ 40.00',
        icon: '',
        path: '/service8',
      },
      {
        id: 9,
        image: haarImage2,
        name: 'Nassrasur Model / Wet Shave model',
        price: '€ 15.00',
        icon: '',
        path: '/service9',
      },
    ],
  }),
  getters: {},

  actions: {},
});
