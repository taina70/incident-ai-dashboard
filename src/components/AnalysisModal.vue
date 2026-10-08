<script setup lang="ts">
import type { Analysis } from '../types';
defineProps<{ analysis: Analysis | null }>();
defineEmits(['close']);
</script>
<template>
  <div 
    v-if="analysis" 
    class="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50 transition-all duration-300"
  >
    <div class="glass-card max-w-2xl w-full p-6 space-y-6 rounded-2xl shadow-2xl border border-white/30 animate-in fade-in zoom-in duration-200">
      
      <!-- Modal Header -->
      <div class="flex justify-between items-center border-b border-white/20 pb-4">
        <h3 class="text-base font-bold text-white flex items-center gap-2 drop-shadow">
          <span>📌</span> Diagnóstico Técnico (Gemini AI)
        </h3>
        <button 
          @click="$emit('close')" 
          class="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Modal Body -->
      <div class="space-y-4 text-xs">
        <div>
          <span class="text-[10px] text-white/70 uppercase tracking-wider font-bold">Microsserviço</span>
          <p class="text-white font-mono font-medium text-sm mt-0.5">{{ analysis.serviceName }}</p>
        </div>

        <div>
          <span class="text-[10px] text-cyan-200 uppercase tracking-wider font-bold">Causa Raiz Identificada</span>
          <p class="text-white bg-white/10 p-3.5 rounded-xl border border-white/20 mt-1 font-medium leading-relaxed">
            {{ analysis.rootCause }}
          </p>
        </div>

        <div>
          <span class="text-[10px] text-emerald-200 uppercase tracking-wider font-bold">Solução Sugerida</span>
          <p class="text-white bg-white/10 p-3.5 rounded-xl border border-white/20 mt-1 font-mono whitespace-pre-wrap leading-relaxed">
            {{ analysis.suggestedFix }}
          </p>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end pt-2 border-t border-white/10">
        <button 
          @click="$emit('close')" 
          class="px-5 py-2 bg-white text-indigo-950 hover:bg-white/90 font-bold rounded-xl text-xs transition shadow-md cursor-pointer"
        >
          Fechar
        </button>
      </div>

    </div>
  </div>
</template>