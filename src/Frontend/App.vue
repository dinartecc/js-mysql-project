


<template>

    <div id="container">
        <div id="sidebar" v-show="this.$store.state.IsLogged">
            <Sidebar></Sidebar> 
        </div>
        <div id="content">
            <transition name="slide-fade">
            <router-view></router-view>
            </transition>
        </div>


    </div>
    
</template>


<script>


import Sidebar from './Components/Layout/Sidebar.vue'

export default {
    
    data: () => {
        return {
        }
    },
    components: {
        Sidebar
    }

}
</script>




<style scoped>
    #container{
        display: flex;

        width: 100%;
        font-family: 'Raleway', sans-serif;
    }
    #content{
        width: 100%;
        min-width: 90%;
        max-width: 100%;
        background-color: #232730;
    }
    Sidebar{
        width: 10%;
        min-width: 170px;
        height: auto;
    }

   
</style>
