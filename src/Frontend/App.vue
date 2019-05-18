


<template>

    <div id="container">
        <div id="sidebar">
            <Sidebar></Sidebar> 
        </div>
        <div id="content">
            <router-view></router-view>
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
        width: 90%;
        background-color: #232730;
    }
    #sidebar{
        width: 10%;
        min-width: 160px ;
    }
</style>
