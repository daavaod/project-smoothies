<template>
    <div class="add-smoothie">
        <div class="center-wrap">
            <h2>Add Smoothie</h2>
            <form @submit.prevent="AddSmoothie" class="add-smoothie-form-wrap">
                <ul>
                    <li>
                        <label for="title">Smoothie Title</label>
                        <input type="text" name="title" v-model="title">
                    </li>
                    <li v-for="(ing, index) in ingredients" :key="index">
                        <label for="ingredient">Ingredient</label>
                        <input type="text" name="ingredient" v-model="ingredients[index]">
                    </li>
                    <li>
                        <label for="add-ingredient">Add an ingredient</label>
                        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
                    </li>
                </ul>
                <p v-if="feedback" class="feedback">{{ feedback }}</p>
                <div class="btn-wrap">
                    <button class="btn-add-smoothie">Add Smoothie</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'AddSmoothie',
  data() {
      return {
          title: null,
          another: null,
          ingredients: [],
          feedback: null,
          slug: null
      }
  },
    methods: {
        AddSmoothie() {
            if(this.title) {
                this.feedback = null
                // create slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                // console.log(this.slug)
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
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
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
                console.log(this.ingredients);
            } else {
                this.feedback = 'You must add ingredient first'
            }
        }
    }

}
</script>

<style>

</style>