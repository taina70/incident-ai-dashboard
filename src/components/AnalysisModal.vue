<script setup lang="ts">
import type { Analysis } from '../types';
defineProps<{ analysis: Analysis | null }>();
defineEmits(['close']);
</script>

<template>
  <div v-if="analysis" class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full p-6 space-y-6 shadow-2xl">
      <div class="flex justify-between items-center border-b border-slate-700 pb-3">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">📌 Diagnóstico Técnico (Gemini AI)</h3>
        <button @click="$emit('close')" class="text-slate-400 hover:text-white">✕</button>
      </div>

      <div class="space-y-4 text-sm">
        <div>
          <span class="text-xs text-slate-500 uppercase font-semibold">Microsserviço</span>
          <p class="text-slate-200 font-mono">{{ analysis.serviceName }}</p>
        </div>

        <div>
          <span class="text-xs text-rose-400 uppercase font-semibold">Causa Raiz Identificada</span>
          <p class="text-slate-200 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50 mt-1">{{ analysis.rootCause }}</p>
        </div>

        <div>
          <span class="text-xs text-emerald-400 uppercase font-semibold">Solução Sugerida</span>
          <p class="text-slate-200 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50 mt-1 font-mono whitespace-pre-wrap">{{ analysis.suggestedFix }}</p>
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button @click="$emit('close')" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm">Fechar</button>
      </div>
    </div>
  </div>
</template>