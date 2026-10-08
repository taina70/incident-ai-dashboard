<script setup lang="ts">
import { ref } from 'vue';
import { sendLog } from '../services/api';
import type { NewLog } from '../types';

const emit = defineEmits(['log-sent']);

const form = ref<NewLog>({
  serviceName: 'order-service',
  severity: 'ERROR',
  message: '',
  stackTrace: '',
});

const sending = ref(false);

const handleSubmit = async () => {
  if (!form.value.message) return;
  sending.value = true;
  try {
    await sendLog(form.value);
    form.value.message = '';
    form.value.stackTrace = '';
    
    // Notifica o componente pai para atualizar a lista após o delay do Gemini
    setTimeout(() => emit('log-sent'), 3500);
  } catch (err) {
    console.error('Erro ao enviar log:', err);
  } finally {
    sending.value = false;
  }
};
</script>

<template>
  <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700/60 h-fit space-y-4">
    <h2 class="text-lg font-semibold text-slate-200">Disparar Log de Teste</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-xs text-slate-400 mb-1">Serviço Origem</label>
        <input v-model="form.serviceName" type="text" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" required />
      </div>

      <div>
        <label class="block text-xs text-slate-400 mb-1">Severidade</label>
        <select v-model="form.severity" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500">
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
      </div>

      <div>
        <label class="block text-xs text-slate-400 mb-1">Mensagem do Erro</label>
        <textarea v-model="form.message" rows="3" placeholder="Ex: ConnectionTimeout: Failed to connect to Redis" class="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" required></textarea>
      </div>

      <button type="submit" :disabled="sending" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition disabled:opacity-50 text-sm">
        {{ sending ? 'Enviando ao RabbitMQ...' : 'Enviar para Fila' }}
      </button>
    </form>
  </div>
</template>