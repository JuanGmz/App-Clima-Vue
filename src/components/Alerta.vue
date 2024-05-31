<template>
    <div class="alerta">
        <slot></slot>
    </div>
</template>

<style>
    .alerta {
        text-align: center;
        margin-bottom: 2rem;
        color: var(--blanco);
        text-transform: uppercase;
        font-weight: 900;
        font-size: 1.8rem;
        padding: .5rem
    }
</style>