const routes = [
    { path: '/', component: Calendar, name: 'Calendar' },
    { path: '/create', component: CreateEvent, name: 'CreateEvent' },
    { path: '/manage', component: ManageEvents, name: 'ManageEvents' },
];

const router = new VueRouter({
    routes: routes,
});

const app = new Vue({
    el: '#app',
    router: router,

    // methods: {
    //     changeLanguage: function(language) {
    //         switch (language) {
    //             case 'en':
    //                 ELEMENT.locale(ELEMENT.lang.en)
    //                 break;
    //             case 'ru':
    //                 ELEMENT.locale(ELEMENT.lang.ruRU)
    //                 break;
    //             case 'kz':
    //                 ELEMENT.locale(ELEMENT.lang.kz)
    //                 break;
    //             case 'de':
    //                 ELEMENT.locale(ELEMENT.lang.de)
    //                 break;
    //         }
    //     },
    // },

    mounted() {
        ELEMENT.locale(ELEMENT.lang.en)
    }
});