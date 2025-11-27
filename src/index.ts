// import TableCuztomized from './custom-table.vue';
// export default TableCuztomized;
import TableCustomized from "./components/custom-table.vue";
import "./assets/css/tailwind.css"; // opcional si deseas incluir CSS

export { TableCustomized };

export default {
    install(app) {
        app.component("TableCustomized", TableCustomized);
    },
};
