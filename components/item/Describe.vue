<template>
    <div class="item-describe">
        <p>{{item.describe}}</p>
    </div>
</template>

<style>
    .item-describe{
        min-height: 400px;
    }
</style>



<script>
export default {
    props:['item'],
    data(){
        return {}
    }
}
</script>
