<template>
    <div class="bh-p-10">
        <div class="bh-mb-2">
            <input
                type="text"
                v-model="params.search"
                placeholder="Search..."
                class="bh-border bh-border-solid bh-bg-white bh-p-2 bh-outline-0 bh-border-gray-200 focus:bh-border-gray-200 bh-rounded"
            />
            <button type="button" class="btn mb-4 bh-p-2" @click="datatable.reset()">Reset</button> <br />
        </div>
        <TableCustomized
            ref="datatable"
            :loading="loading"
            :rows="rows"
            :columns="cols"
            :sortable="true"
            :sortColumn="params.sort_column"
            :sortDirection="params.sort_direction"
            :search="params.search"
            :hasCheckbox="true"
            :columnFilter="true"
            fieldVerify="deleted_at"
        >
        </TableCustomized>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import TableCustomized from './components/custom-table.vue';
import '../dist/style.css';

onMounted(() => {
    getUsers();
});

const datatable: any = ref(null);
const loading: any = ref(true);
const total_rows = ref(0);
const rows: any = ref(null);
const cols =
    ref([
        { field: "status", title: "Estatus", filter: true },
        { field: "code", title: "Código", filter: true },
        { field: "created_at", title: "Creado", filter: false, type: "date", width: "8%" },
        { field: "service_name", title: "Servicio", filter: true, width: "20%" },
        { field: "travel_dates", title: "Fechas", filter: true, type: "date", range: true, formatDate: "YYYY-MM-DD" },
        { field: "amount", title: "Tarifas", filter: false, type: "number" },
        { field: "operators", title: "Operadoras", filter: true },
        { field: "date_limit_pay", title: "Límite de pago", filter: true, type: "date", formatDate: "D MMM, YYYY" },
        { field: "agent_name", title: "Agente", filter: true },
        { field: "actions", title: "Acciones", filter: false },
    ]) || [];

const changeServer = (data: any) => {
    params.current_page = data.current_page;
    params.pagesize = data.pagesize;
    params.sort_column = data.sort_column;
    params.sort_direction = data.sort_direction;
    params.column_filters = data.column_filters;
    params.search = data.search;

    filterUsers();
};

const params = reactive({
    current_page: 1,
    pagesize: 5,
    sort_column: 'id',
    sort_direction: 'desc',
    column_filters: [],
    search: '',
});

let controller: any;
let timer: any;
const filterUsers = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        getUsers();
    }, 300);
};
const getUsers = async () => {
    // cancel request if previous request still pending before next request fire
    // if (controller) {
    //     controller.abort();
    // }
    // controller = new AbortController();
    // const signal = controller.signal;

    // try {
    //     loading.value = true;

    //     const response = await fetch('https://vue3-datatable-document.vercel.app/api/user', {
    //         method: 'POST',
    //         body: JSON.stringify(params),
    //         signal: signal, // Assign the signal to the fetch request
    //     });

    //     const data = await response.json();

    //     rows.value = data?.data;
    //     total_rows.value = data?.meta?.total;
    // } catch {}

    rows.value = [
    {
        "id": 11,
        "code": "S1-11",
        "reservation_status": {
            "id": 1,
            "title": "OR",
            "name": "On Request",
            "color": "#fb3"
        },
        "amount": 15000,
        "amount_paid": null,
        "divisa": "mxn",
        "date_start": "2025-01-28",
        "date_end": "2025-02-28",
        "date_limit_pay": "30 ene, 2025",
        "operators": null,
        "customer_id": 2,
        "customer_name": "Luis Gonzalez Balam",
        "service_id": 5,
        "service_name": "OCEAN CORAL Y TURQUESA",
        "service_type_id": 1,
        "service_type_name": "Hoteles",
        "service_exit_place_id": null,
        "service_exit_place_name": null,
        "service_travel_date_id": null,
        "service_travel_date_name": null,
        "service_exit_place_price_id": null,
        "agent_id": 14,
        "agent_name": "Administrador",
        "agency_id": 11,
        "agency_name": "NEXTRAVEL",
        "branch_office_id": 4,
        "branch_office_name": "OAXACA",
        "registered_id": 1,
        "registered_name": "JESUS ALBERTO MEDINA MEDINA",
        "agency_metadata": null,
        "aliht_metadata": null,
        "deleted_at": null,
        "created_at": "2025-01-29T04:46:22.000000Z",
        "updated_at": "2025-01-29T04:46:22.000000Z"
    },
    {
        "id": 10,
        "code": "S1-10",
        "reservation_status": {
            "id": 1,
            "title": "OR",
            "name": "On Request",
            "color": "#fb3"
        },
        "amount": 10000,
        "amount_paid": 100,
        "divisa": "mxn",
        "date_start": "2025-01-28",
        "date_end": "2025-02-28",
        "date_limit_pay": "28 ene, 2025",
        "operators": null,
        "customer_id": 2,
        "customer_name": "Luis Gonzalez",
        "service_id": 3,
        "service_name": "HOTEL CLAUDIA",
        "service_type_id": 1,
        "service_type_name": "Hoteles",
        "service_exit_place_id": null,
        "service_exit_place_name": null,
        "service_travel_date_id": null,
        "service_travel_date_name": null,
        "service_exit_place_price_id": null,
        "agent_id": 14,
        "agent_name": "Administrador",
        "agency_id": 11,
        "agency_name": "NEXTRAVEL",
        "branch_office_id": 4,
        "branch_office_name": "OAXACA",
        "registered_id": 1,
        "registered_name": "JESUS ALBERTO MEDINA MEDINA",
        "agency_metadata": null,
        "aliht_metadata": null,
        "deleted_at": "2025-01-29T04:45:14.000000Z",
        "created_at": "2025-01-29T04:45:14.000000Z",
        "updated_at": "2025-01-29T05:15:25.000000Z"
    },
    {
        "id": 7,
        "code": "S1-7",
        "reservation_status": {
            "id": 2,
            "title": "CO",
            "name": "Reservación Confirmada",
            "color": "#00c851"
        },
        "amount": 1500,
        "amount_paid": 18,
        "divisa": "mxn",
        "date_start": "2025-02-07",
        "date_end": "2025-02-14",
        "date_limit_pay": "29 ene, 2025",
        "operators": ", NUEVO",
        "customer_id": 10,
        "customer_name": "JESUS MEDINA",
        "service_id": 3,
        "service_name": "HOTEL CLAUDIA",
        "service_type_id": 1,
        "service_type_name": "Hoteles",
        "service_exit_place_id": null,
        "service_exit_place_name": null,
        "service_travel_date_id": null,
        "service_travel_date_name": null,
        "service_exit_place_price_id": null,
        "agent_id": 14,
        "agent_name": "Administrador",
        "agency_id": 11,
        "agency_name": "NEXTRAVEL",
        "branch_office_id": 4,
        "branch_office_name": "OAXACA",
        "registered_id": 1,
        "registered_name": "JESUS ALBERTO MEDINA MEDINA",
        "agency_metadata": [
            {
                "total": 2250,
                "pass_id": 2,
                "total_commission": 250
            }
        ],
        "aliht_metadata": [
            {
                "total": 2250,
                "pass_id": 2,
                "total_commission": 250,
                "total_commission_gain": 0
            }
        ],
        "deleted_at": null,
        "created_at": "2025-01-27T16:38:00.000000Z",
        "updated_at": "2025-01-28T19:53:55.000000Z"
    },
    {
        "id": 1,
        "code": "S1-1",
        "reservation_status": {
            "id": 1,
            "title": "OR",
            "name": "On Request",
            "color": "#fb3"
        },
        "amount": 15000,
        "amount_paid": 5500,
        "divisa": "mxn",
        "date_start": "2025-02-26",
        "date_end": "2025-02-28",
        "date_limit_pay": "28 ene, 2025",
        "operators": null,
        "customer_id": 2,
        "customer_name": "Luis Gonzalez",
        "service_id": 3,
        "service_name": "HOTEL CLAUDIA",
        "service_type_id": 1,
        "service_type_name": "Hoteles",
        "service_exit_place_id": null,
        "service_exit_place_name": null,
        "service_travel_date_id": null,
        "service_travel_date_name": null,
        "service_exit_place_price_id": null,
        "agent_id": 14,
        "agent_name": "Administrador",
        "agency_id": 11,
        "agency_name": "NEXTRAVEL",
        "branch_office_id": 4,
        "branch_office_name": "OAXACA",
        "registered_id": 14,
        "registered_name": "Administrador",
        "agency_metadata": null,
        "aliht_metadata": null,
        "deleted_at": null,
        "created_at": "2025-01-21T04:19:01.000000Z",
        "updated_at": "2025-01-25T08:19:18.000000Z"
    }
];

    loading.value = false;
};
</script>
