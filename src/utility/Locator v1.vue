<template>
    <div> This is a locator</div>
   <div>
    <button>search on map</button>
    <span>{{location}}</span>    
    <button @click.prevent="increase()">+</button>
    <span>{{ count }}</span>
    <button @click.prevent="decrease()">-</button>
   </div>

</template>

<script setup>
        let count= ref(0)
        function increase(){
            console.log('execute ++')
            count.value++
        }
        function decrease(){
            count.value--
        }
        return{
            count,
            increase,
            decrease
        } 
</script>

<style scope>
.text-center{
    text-align: center;
}
</style>