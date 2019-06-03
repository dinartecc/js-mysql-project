<template>
    <div id="container">
        
        <ProductEditor></ProductEditor>
    </div>

</template>



<script>

import ProductEditor from '../Components/ProductEditor.vue'
export default {
    components: {
        ProductEditor
    }
}
</script>


<style scoped>
#container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
</style>
