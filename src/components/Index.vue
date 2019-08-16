<template>
    <div class="index">
        <ul class="cards-wrap">
            <li class="card" v-for="smoothie in smoothies" :key="smoothie.id">
                <span class="pbscoicon-delete" @click="deleteSmoothie(smoothie.id)"></span>
                <h2>{{ smoothie.title }}</h2>
                <ul class="ingredients-wrap">
                    <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                        <span class="tag">{{ ingredient }}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'Index',
    data() {
        return {
            smoothies: []
        }
    },
    methods: {
        deleteSmoothie(id) {
            db.collection('smoothies').doc(id).delete()
            .then(() => {
                this.smoothies = this.smoothies.filter(smoothie => {
                    return smoothie.id != id
                })
            })
            
        }
    },
    created() {
        db.collection('smoothies').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                // console.log(doc.data(), doc.id)
                let smoothie = doc.data()
                smoothie.id = doc.id
                this.smoothies.push(smoothie)
            })
        })
    }
}

</script>


<style>

</style>
