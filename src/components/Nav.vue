<!-- Navbar -->
<template>
    <nav class="bg-white dark:bg-gray-900">
        <div class="px-6 py-4 mx-auto flex justify-between items-center ">
            <div class="flex items-center justify-between">
                <div>
                    <a class="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300" href="#">Codoc</a>
                </div>
            </div>

            <div class="flex justify-center lg:flex lg:mt-0 lg:-mx-2">
            <!-- Dark/Light Mode Toggling -->
                <a class="mx-2 relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300" href="#" @click.prevent="toggleDark()">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="isDark" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </a>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { useDarkGlobal } from '../utils'

const isDark = useDarkGlobal()
const toggleDark = useToggle(isDark)
</script>

<style>
nav {
    height: var(--nav-height)
}
</style>