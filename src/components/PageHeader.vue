<script setup>
import IconLanguage from './icons/IconLanguage.vue'
import IconUser from './icons/IconUser.vue'
</script>

<template>
  <div class="navbar bg-base-300">
    <div class="navbar-start">
      <a class="btn btn-ghost text-xl" href="https://www.unifr.ch">
        <img alt="Unifr logo" class="h-8" src="../assets/logo.svg" />
      </a>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl">Research Material</a>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <IconUser />
        </div>
        <div
          tabindex="0"
          class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div class="card-body">
            <div class="card-actions">
              <button class="btn btn-primary btn-block">Registration</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <IconLanguage />
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-16"
        >
          <li><a>FR</a></li>
          <li><a>DE</a></li>
          <li><a>EN</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div className="text-sm breadcrumbs mx-4 font-bold">
    <ul>
      <li>Language Center</li>
      <li>Self-access center for language learning (SAC)</li>
    </ul>
  </div>

  <hr class="h-px border-0 bg-gray-300" />
</template>
