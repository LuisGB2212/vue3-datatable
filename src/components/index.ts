import { App } from "vue";
import TableCustomized from "./custom-table.vue";

// Plugin for app.use()
export const TableCustomizablePlugin = {
    install(app: App) {
        app.component("TableCustomized", TableCustomized);
    }
};

// Export component as default for direct import
export default TableCustomized;

// Also export as named export for flexibility
export { TableCustomized };
