<template>
  <v-app>
    <ErrorAlert />

    <v-navigation-drawer permanent>
      <CarFilter />
    </v-navigation-drawer>

    <v-app-bar color="primary" dark>
      <v-toolbar-title>Автомобили</v-toolbar-title>
      <v-spacer />
      <div class="search-container">
        <Search />
      </div>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
