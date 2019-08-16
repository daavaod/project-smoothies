<template>
    <div v-if="smoothie" class="edit-smoothie">
        <div class="center-wrap">
            <h2>Edit Smoothie: {{ smoothie.title }}</h2>
            <form @submit.prevent="UpdateSmoothie" class="add-smoothie-form-wrap">
                <ul>
                    <li>
                        <label for="title">Smoothie Title</label>
                        <input type="text" name="title" v-model="smoothie.title">
                    </li>
                    <li v-for="(ing, index) in smoothie.ingredients" :key="index">
                        <label for="ingredient">Ingredient</label>
                        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                        <span class="pbscoicon-delete" @click="deleteIngredient(ing)"></span>
                    </li>
                    <li>
                        <label for="add-ingredient">Add an ingredient</label>
                        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
                    </li>
                </ul>
                <p v-if="feedback" class="feedback">{{ feedback }}</p>
                <div class="btn-wrap">
                    <button class="btn-add-smoothie">Update Smoothie</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null,
        }
    },
    methods: {
        UpdateSmoothie() {
            if(this.smoothie.title) {
                this.feedback = null
                // create slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                // console.log(this.slug)
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                }).then(() => {
                    this.$router.push({name: 'Home'})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = 'You must enter title'
            }
        },
        addIng() {
            if(this.another) {
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must add ingredient first'
            }
        },
        deleteIngredient(ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        },
    },
    created() {
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }

}
</script>

<style>

</style>