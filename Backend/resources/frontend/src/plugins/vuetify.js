import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                success: '#4caf54',
                primary: '#6A1B9A',
            },
            dark: {
                success: '#4caf54',
                primary: '#6A1B9A',
            },
        },
    },
});

