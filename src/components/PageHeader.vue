<script setup>
import IconLanguage from './icons/IconLanguage.vue'

function switchLanguage(lang) {
  localStorage.setItem('locale', lang)
  window.location.reload()
}
</script>

<template>
  <div class="navbar bg-base-300">
    <div class="navbar-start">
      <a class="btn btn-ghost text-xl" href="https://www.unifr.ch">
        <img alt="Unifr logo" width="45" src="../assets/logo.svg" />
      </a>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl">{{ $t('header.title') }}</a>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <IconLanguage />
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-16"
        >
          <li><a @click="() => switchLanguage('de')">DE</a></li>
          <li><a @click="() => switchLanguage('en')">EN</a></li>
          <li><a @click="() => switchLanguage('fr')">FR</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div className="text-sm breadcrumbs mx-4 font-bold">
    <ul>
      <li>
        <a href="https://www.unifr.ch/centredelangues">{{ $t('header.language_center') }}</a>
      </li>
      <li>
        <a href="https://www3.unifr.ch/centredelangues/fr/autoapprentissage/">{{
          $t('header.self_access')
        }}</a>
      </li>
    </ul>
  </div>

  <hr class="h-px border-0 bg-gray-300" />
</template>
