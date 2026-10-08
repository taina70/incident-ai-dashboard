<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchAnalyses } from './services/api';
import type { Analysis } from './types';
import LogForm from './components/LogForm.vue';
import AnalysisModal from './components/AnalysisModal.vue';

const analyses = ref<Analysis[]>([]);
const loading = ref(false);
const selectedAnalysis = ref<Analysis | null>(null);

const loadData = async () => {
  loading.value = true;
  try {
    analyses.value = await fetchAnalyses();
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <header class="flex justify-between items-center border-b border-slate-800 pb-4">
      <div>
        <h1 class="text-2xl font-bold text-white">🤖 Incident AI Monitor</h1>
        <p class="text-slate-400 text-sm">Análise em tempo real via NestJS, RabbitMQ e Gemini AI</p>
      </div>
      <button @click="loadData" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm border border-slate-700 transition">
        🔄 Atualizar Feed
      </button>
    </header>

    <!-- Grid Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <LogForm @log-sent="loadData" />

      <!-- Feed de Incidentes -->
      <div class="lg:col-span-2 space-y-4">
        <h2 class="text-lg font-semibold text-slate-200">Análises de Incidentes (IA)</h2>

        <div v-if="loading" class="text-center py-12 text-slate-500">Carregando incidentes...</div>

        <div v-else-if="analyses.length === 0" class="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-800 text-slate-500">
          Nenhum incidente registrado até o momento.
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="item in analyses" 
            :key="item.id" 
            @click="selectedAnalysis = item"
            class="p-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 rounded-xl cursor-pointer transition space-y-2"
          >
            <div class="flex justify-between items-start">
              <span class="px-2 py-0.5 text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">
                {{ item.serviceName }}
              </span>
              <span class="text-xs text-slate-500">{{ new Date(item.createdAt).toLocaleString() }}</span>
            </div>
            <p class="text-sm font-medium text-slate-200 line-clamp-2">
              <strong class="text-rose-400">Causa Raiz:</strong> {{ item.rootCause }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Separado -->
    <AnalysisModal :analysis="selectedAnalysis" @close="selectedAnalysis = null" />
  </div>
</template>