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
  <div class="min-h-screen pb-12">
    <!-- Header Translúcido -->
    <header class="border-b border-white/20 bg-white/10 backdrop-blur-md sticky top-0 z-40">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-white/20 rounded-xl border border-white/30 shadow-sm">
            <span class="text-xl">📊</span>
          </div>
          <div>
            <h1 class="text-lg font-bold text-white tracking-wide drop-shadow">INCIDENT AI DASHBOARD</h1>
            <p class="text-xs text-white/80">Painel do Administrador • Monitorização de Erros</p>
          </div>
        </div>

        <button 
          @click="loadData" 
          :disabled="loading"
          class="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-xl text-xs font-semibold backdrop-blur-md transition shadow-md cursor-pointer disabled:opacity-50"
        >
          <span :class="{ 'animate-spin': loading }">🔄</span>
          <span>{{ loading ? 'A carregar...' : 'Atualizar' }}</span>
        </button>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="max-w-6xl mx-auto px-6 pt-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <!-- Formulário -->
        <LogForm @log-sent="loadData" />

        <!-- Feed de Incidentes -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-xs font-bold text-white uppercase tracking-wider drop-shadow">
              Análises de Incidentes
            </h2>
            <span class="px-2.5 py-0.5 text-xs font-semibold bg-white/20 text-white rounded-full border border-white/30 backdrop-blur-sm">
              {{ analyses.length }} Registo(s)
            </span>
          </div>

          <!-- State: Loading -->
          <div v-if="loading" class="glass-card p-10 text-center rounded-2xl space-y-2">
            <p class="text-sm font-medium text-white/90">A procurar diagnósticos...</p>
          </div>

          <!-- State: Vazio -->
          <div v-else-if="analyses.length === 0" class="glass-card p-10 text-center rounded-2xl space-y-1">
            <p class="text-base font-semibold text-white">Nenhum incidente registado</p>
            <p class="text-xs text-white/70">Dispare um log pelo formulário para simular um evento.</p>
          </div>

          <!-- Cards de Incidentes com Efeito Glass -->
          <div v-else class="space-y-3">
            <div 
              v-for="item in analyses" 
              :key="item.id" 
              @click="selectedAnalysis = item"
              class="glass-card hover:bg-white/25 p-5 rounded-2xl cursor-pointer transition duration-200 space-y-2 shadow-lg hover:shadow-xl"
            >
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-xs font-bold font-mono bg-white/20 text-white border border-white/30 rounded-lg">
                  {{ item.serviceName }}
                </span>
                <span class="text-xs font-medium text-white/70">
                  {{ new Date(item.createdAt).toLocaleString('pt-PT') }}
                </span>
              </div>

              <div>
                <span class="text-xs font-semibold text-cyan-200 uppercase tracking-wider">Causa Raiz</span>
                <p class="text-sm text-white font-medium line-clamp-2 mt-0.5">
                  {{ item.rootCause }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <AnalysisModal :analysis="selectedAnalysis" @close="selectedAnalysis = null" />
  </div>
</template>