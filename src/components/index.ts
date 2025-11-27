// import TableCustomized from './custom-table.vue';
// export default TableCustomized;
import { App } from "vue";
import TableCustomized from "./custom-table.vue";

export default {
    install(app: App) {
        app.component("TableCustomized", TableCustomized);
    }
};

export { TableCustomized };
