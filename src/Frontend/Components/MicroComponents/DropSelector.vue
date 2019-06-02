<template>
    <select @click="send" v-model="valor" name="" id="" place>
        <option  v-for="(title,index) in titles"  :key="title " :value="titles[index]">{{title}}</option>
    </select>
</template>



<script>
export default {
    props:{
        value: String,
        titles: Array,
        values: Array
    },
    data: function(){
        return{
            valor: this.titles[0]
        }
    },
    methods: {
        send: function(){
            this.$emit('input', this.valor)
        }
    },
    created() {
        this.send()
    }
}
</script>


<style scoped>
select, option{
    color: black;
}

select::placeholder{
    color: ;
}
</style>





