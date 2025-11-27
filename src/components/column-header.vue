<template>
    <tr key="hdrrow">
        <th
            v-if="props.all.hasCheckbox"
            :key="'chkall'"
            class="bh-w-px"
            :class="{
                'bh-sticky bh-bg-blue-light bh-z-[1]': props.all.stickyHeader || props.all.stickyFirstColumn,
                'bh-top-0': props.all.stickyHeader,
                'bh-left-0': props.all.stickyFirstColumn,
            }"
        >
            <div class="bh-checkbox">
                <input ref="selectedAll" type="checkbox" @click.stop="emit('selectAll', $event.target.checked)" />
                <div>
                    <icon-check class="check" />
                    <icon-dash class="intermediate" />
                </div>
            </div>
        </th>
        <template v-for="(col, j) in props.all.columns">
            <th
                v-if="!col.hide"
                :key="col.field"
                class="bh-select-none bh-z-[1]"
                :class="[
                    props.all.sortable && col.sort ? 'bh-cursor-pointer' : '',
                    j === 0 && props.all.stickyFirstColumn ? 'bh-sticky bh-left-0 bh-bg-blue-light' : '',
                    props.all.hasCheckbox && j === 0 && props.all.stickyFirstColumn ? 'bh-left-[52px]' : '',
                ]"
                :style="{
                    width: col.width,
                    'min-width': col.minWidth,
                    'max-width': col.maxWidth,
                }"
            >
                <div class="bh-flex bh-items-center" :class="[col.headerClass ? col.headerClass : '']" @click="props.all.sortable && col.sort && emit('sortChange', col.field)">
                    {{ col.title }}
                    <span v-if="props.all.sortable && col.sort" class="bh-ml-3 bh-sort bh-flex bh-items-center" :class="[props.currentSortColumn, props.currentSortDirection]">
                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                            <polygon
                                points="3.11,6.25 10.89,6.25 7,1.75 "
                                fill="currentColor"
                                class="bh-text-black/20"
                                :class="[currentSortColumn === col.field && currentSortDirection === 'asc' ? '!bh-text-primary' : '']"
                            ></polygon>
                            <polygon
                                points="7,12.25 10.89,7.75 3.11,7.75 "
                                fill="currentColor"
                                class="bh-text-black/20"
                                :class="[currentSortColumn === col.field && currentSortDirection === 'desc' ? '!bh-text-primary' : '']"
                            ></polygon>
                        </svg>
                    </span>
                </div>

                <template v-if="props.all.columnFilter && !props.isFooter">
                    <div v-if="col.filter" class="bh-filter bh-relative">
                        <!-- Input de busqueda string -->
                        <input v-if="col.type === 'string' && !col.options"
                            v-model.trim="col.value" 
                            type="text" 
                            class="bh-form-control" autocomplete="off"
                            @keyup="emit('filterChange')" />
                        
                        <!-- Input de busqueda numerico -->
                        <input v-if="col.type === 'number'" v-model.number.trim="col.value"
                            type="number" 
                            class="bh-form-control" autocomplete="off"
                            @keyup="emit('filterChange')" />

                        <!-- Input de busqueda de fecha -->
                        <input v-if="col.type === 'date' && !col.range"
                            :ref="col.field"
                            :id="col.field"
                            v-model="col.value" type="text" autocomplete="off" placeholder="Fecha"
                            class="bh-form-control" />

                        <!-- Rango de fechas en un solo input -->
                        <input v-if="col.type === 'date' && (typeof col.range == 'boolean' && col.range == true)"
                            :ref="col.field"
                            :id="col.field"
                            v-model="col.value"
                            type="text"
                            class="bh-form-control"
                            placeholder="Selecciona rango de fechas"
                            autocomplete="off"
                        />
                        <!-- <input v-else-if="col.type === 'date'" v-model="col.value" type="date" class="bh-form-control" @change="emit('filterChange')" /> -->
                        
                        <!-- Input de busqueda de selector de true o false -->
                        <select v-if="col.type === 'bool'" v-model="col.value" class="bh-form-control" @change="emit('filterChange')">
                            <option :value="undefined">All</option>
                            <option :value="true">True</option>
                            <option :value="false">False</option>
                        </select>
                        
                        <!-- Input de busqueda en selector -->
                        <select class="bh-form-control" v-if="col.type === 'string' && col.options" v-model="col.value" @change="emit('filterChange')">
                            <option :value="undefined">Todos</option>
                            <option v-for="opt in col.options" :key="'opt'+opt" :value="opt">{{ opt }}</option>
                        </select>
                        
                        <button v-if="col.type != 'date' && (col.type != 'bool' && !col.options)" type="button" @click.stop="emit('toggleFilterMenu', col)">
                            <icon-filter class="bh-w-4" />
                        </button>

                        <column-filter
                            v-show="props.isOpenFilter === col.field"
                            :column="col"
                            :type="col.type"
                            :columnFilterLang="props.columnFilterLang"
                            @close="emit('toggleFilterMenu', null)"
                            @filterChange="emit('filterChange')"
                        />
                    </div>
                </template>
            </th>
        </template>
    </tr>
</template>
<script setup lang="ts">
import { watch, ref, onMounted, nextTick } from 'vue';
import Litepicker from 'litepicker';
import columnFilter from './column-filter.vue';
import iconCheck from './icon-check.vue';
import iconDash from './icon-dash.vue';
import iconFilter from './icon-filter.vue';
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

const selectedAll: any = ref(null);

const props = defineProps(['all', 'currentSortColumn', 'currentSortDirection', 'isOpenFilter', 'isFooter', 'checkAll', 'columnFilterLang']);

const emit = defineEmits(['selectAll', 'sortChange', 'filterChange', 'toggleFilterMenu']);
const checkboxChange = () => {
    if (selectedAll.value) {
        selectedAll.value.indeterminate = props.checkAll !== 0 ? !props.checkAll : false;
        selectedAll.value.checked = props.checkAll;
    }
};

watch(() => props.checkAll, checkboxChange);

const initializeDatePicker = (column: any) => {
    nextTick(() => {
        const input = document.getElementById(column.field);
        if (input) {
            new Litepicker({
                element: input,
                singleMode: true,
                lang: "es-MX",
                tooltipNumber: (totalDays) => {
                    return totalDays - 1;
                },
                setup: (picker) => {
                    picker.on('selected', (startDate, endDate) => {
                        let date = dayjs(startDate.dateInstance).format("YYYY-MM-DD");
                        date += endDate !== undefined && endDate !== null ? " - " + dayjs(endDate.dateInstance).format("YYYY-MM-DD") : "";
                        column.value = date;
                        emit('filterChange');
                    });
                    picker.on('clear:selection', () => {
                        column.value = null;
                        emit('filterChange');
                    });
                },
                resetButton: () => {
                    let btn = document.createElement('button');
                    btn.innerText = 'Limpiar';
                    btn.addEventListener('click', (evt) => {
                        evt.preventDefault();
                    });

                    return btn;
                },
            });
        }
    });
}

// Inicializa el picker para el rango de fechas en un solo input
const initializeRangePicker = (column: any) => {
    nextTick(() => {
        const input = document.getElementById(column.field);

        if (input) {
            new Litepicker({
                element: input,
                singleMode: false,
                lang: "es-MX",
                tooltipNumber: (totalDays) => totalDays - 1,
                setup: (picker) => {
                    picker.on('selected', (startDate, endDate) => {
                        let date = dayjs(startDate.dateInstance).format("YYYY-MM-DD");
                        date += endDate !== undefined && endDate !== null ? " - " + dayjs(endDate.dateInstance).format("YYYY-MM-DD") : "";
                        column.value = date;
                        emit('filterChange');
                    });
                    picker.on('clear:selection', () => {
                        column.value = null;
                        emit('filterChange');
                    });
                },
                resetButton: () => {
                    let btn = document.createElement('button');
                    btn.innerText = 'Limpiar';
                    btn.addEventListener('click', (evt) => {
                        evt.preventDefault();
                    });
                    return btn;
                },
            });
        }
    });
};

// Ejecuta la inicialización del range picker cuando la columna es de tipo 'date' y tiene un rango
onMounted(() => {
    props.all.columns.forEach(col => {
        if (col.type === 'date' && (typeof col.range == "boolean" && col.range == true)) {
            initializeRangePicker(col);
        } else if (col.type === 'date') {
            initializeDatePicker(col);
        }
    });
});

const getFormatDate = (column: any):string => {
    return column.formatDate ?? 'YYYY-MM-DD';
}

</script>
