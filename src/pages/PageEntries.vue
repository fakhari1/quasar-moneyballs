<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item @left="onLeft" @right="onEntrySlideRight($event, entry)" v-for="entry in entries" :key="entry.id"
                      left-color="positive" right-color="negative">
          <template v-slot:left>
            <q-icon name="done"></q-icon>
          </template>
          <template v-slot:right>
            <q-icon name="delete"></q-icon>
          </template>
          <q-item>
            <q-item-section :class="amountColorClass(entry.amount)">
              {{ entry.name }}
            </q-item-section>
            <q-item-section
              side
              :class="amountColorClass(entry.amount)"
              class="text-weight-bold"
            >
              {{ currencify(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>

      </q-list>
    </div>

    <q-footer class="bg-transparent overflow-hidden shadow-up-2">
      <div class="row q-mb-sm q-px-md q-py-sm q-col-gutter-sm">
        <div class="col text-grey-7 text-h6">Balance</div>
        <div class="col text-h6 text-right" :class="amountColorClass(balance)">
          {{ currencify(balance) }}
        </div>
      </div>
      <q-form class="row q-px-sm q-col-gutter-sm text-h6 bg-primary q-pb-sm" @submit="addEntry">
        <div class="col">
          <q-input
            v-model="addEntryForm.name"
            ref="nameRef"
            placeholder="Name"
            bg-color="white"
            outlined
            dense
          />
        </div>
        <div class="col">
          <q-input
            v-model.number="addEntryForm.amount"
            input-class="text-right"
            placeholder="Amount"
            bg-color="white"
            type="number"
            step="0.01"
            outlined
            dense
          />
        </div>
        <div class="col col-auto">
          <q-btn
            type="submit"
            round
            color="primary"
            icon="add"
          />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
/*
imports
*/
import { ref, computed, reactive } from 'vue'
import { currencify, amountColorClass } from 'src/utils/useUtils'
import { uid, useQuasar } from 'quasar'
/*
Entries
*/
const nameRef = ref(null)
const entries = ref([
  {
    id: '1',
    name: 'Salary',
    amount: 4999.99
  },
  {
    id: '2',
    name: 'Rent',
    amount: -999
  },
  {
    id: '3',
    name: 'Phone',
    amount: -14.99
  },
  {
    id: '4',
    name: 'Unknown',
    amount: 0
  }
])
const balance = computed(() => {
  return entries.value.reduce((accumulator, { amount }) => {
    return accumulator + amount
  }, 0)
})
const addEntryFormDefault = reactive({
  name: '',
  amount: null
})
const addEntryForm = reactive({
  ...addEntryFormDefault
})
const resetEntryForm = () => {
  Object.assign(addEntryForm, addEntryFormDefault)
  nameRef.value.focus()
}
const addEntry = () => {
  const newEntry = Object.assign({}, addEntryForm, { id: uid() })
  entries.value.push(newEntry)
  resetEntryForm()
}

const $q = useQuasar()
const onEntrySlideRight = ({ reset }, entry) => {
  $q.dialog({
    title: 'Delete Entry',
    message: `
    Delete this entry?
    <div class="q-mt-md text-weight-bold">
        ${entry.name}: ${currencify(entry.amount)}
    </div>`,
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true
    },
    cancel: {
      label: 'No',
      color: 'positive',
      noCaps: true
    }
  }).onOk(() => {
    deleteEntry(entry.id)
  }).onCancel(() => {
    reset()
  })
}
const deleteEntry = entryId => {
  entries.value.splice(entries.value.findIndex(entry => entry.id === entryId), 1)
}
const onLeft = () => {
}
</script>
