<template>
    <form autocomplete="off" @submit="onSubmit" novalidate>
        <table>
            <tr class="line">
                <td class=" edit-id" />
                <td class="edit-category">
                    <select class="form-control" v-model="formValues.category">
                        <option v-for="option of category" :value="option.id">{{option.name}}</option>
                    </select>
                </td>
                <td class="edit-value">
                    <input class="form-control" type="text" v-model="formValues.value">
                </td>
                <td>
                    <ActionButtons
                        :on-submit="true"
                        :on-clear="onClear"
                    />
                </td>
            </tr>
        </table>

    </form>
</template>

<script>
    import ActionButtons from "../ActionButtons";

    export default {
        name: "FormEditDebet",
        props: ['data', 'show', 'reload'],
        data(){
            return {
                resource: null,
                category: [],
                formValues: null,
            }
        },
        components: {
            ActionButtons,
        },
        methods: {
            onSubmit(event) {
                event.preventDefault();
                if (this.formValues.id) {
                    this.resource.update({id: this.formValues.id}, this.formValues)
                        .then(this.save);
                } else {
                    this.resource.save(this.formValues)
                        .then(this.save)
                }
            },
            save() {
                this.$emit('update:show', false);
                this.reload();
            },
            initializeForm() {
                this.category = this.$store.getters.computedDebetCategory;
                this.formValues = {...this.data};
            },
            onClear(event) {
                event.preventDefault();
                this.$emit('update:show', false)
            }
        },
        created() {
            this.resource = this.$resource('debets{/id}');
            this.initializeForm();
        }
    }
</script>

<style scoped lang="less">
    @media screen and (min-width: 1200px) {
        .edit-id {
            width: 70px;
            padding-right: 20px;
        }
        .edit-category {
            padding-right: 20px;
            min-width: 260px;
        }
        .edit-value {
            padding-right: 20px;
            max-width: 200px;
        }
        .edit-comment {
            padding-right: 20px;
            min-width: 345px;
        }
    }

</style>