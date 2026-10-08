<script setup lang="ts">
import { ref } from 'vue';
import { sendLog } from '../services/api';
import type { NewLog } from '../types';

const emit = defineEmits<{
  (e: 'log-sent'): void;
}>();

const form = ref<NewLog>({
  serviceName: 'order-service',
  severity: 'ERROR',
  message: '',
  stackTrace: '',
});

const sending = ref(false);

const handleSubmit = async () => {
  if (!form.value.message.trim()) return;
  
  sending.value = true;
  try {
    // Garante que enviamos apenas os campos necessários limpos
    const payload: NewLog = {
      serviceName: form.value.serviceName,
      severity: form.value.severity,
      message: form.value.message.trim(),
      ...(form.value.stackTrace?.trim() ? { stackTrace: form.value.stackTrace.trim() } : {}),
    };

    await sendLog(payload);

    // Reseta o formulário
    form.value.message = '';
    form.value.stackTrace = '';
    
    // Notifica o App.vue para atualizar a lista após 2 segundos (tempo do Worker processar o RabbitMQ)
    setTimeout(() => {
      emit('log-sent');
    }, 2000);

  } catch (err) {
    console.error('Erro ao enviar log:', err);
  } finally {
    sending.value = false;
  }
};
</script>

<template>
  <div class="glass-card rounded-2xl p-6 space-y-5 shadow-xl">
    <div class="border-b border-white/20 pb-3">
      <h2 class="text-sm font-bold text-white uppercase tracking-wider drop-shadow">
        Disparar Log de Teste
      </h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-white/90 mb-1">Serviço de Origem</label>
        <input 
          v-model="form.serviceName" 
          type="text" 
          class="glass-input w-full rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-white/50 transition" 
          required 
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-white/90 mb-1">Severidade</label>
        <select 
          v-model="form.severity" 
          class="glass-input w-full rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-white/50 transition [&>option]:text-zinc-900"
        >
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-semibold text-white/90 mb-1">Mensagem do Erro</label>
        <textarea 
          v-model="form.message" 
          rows="3" 
          placeholder="Ex: ConnectionTimeout: Failed to connect to Redis cache on 10.0.0.12:6379 after 3000ms" 
          class="glass-input w-full rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-white/50 transition" 
          required
        ></textarea>
      </div>

      <div>
        <label class="block text-xs font-semibold text-white/90 mb-1">Stack Trace (Opcional)</label>
        <textarea 
          v-model="form.stackTrace" 
          rows="2" 
          placeholder="Ex: Error: connect ETIMEDOUT at TCPConnectWrap.afterConnect" 
          class="glass-input w-full rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-white/50 transition" 
        ></textarea>
      </div>

      <button 
        type="submit" 
        :disabled="sending" 
        class="w-full bg-white hover:bg-white/90 text-indigo-900 font-bold py-2.5 rounded-xl text-xs transition duration-150 shadow-md cursor-pointer disabled:opacity-50"
      >
        {{ sending ? 'Enviando ao RabbitMQ...' : 'Enviar Evento' }}
      </button>
    </form>
  </div>
</template>