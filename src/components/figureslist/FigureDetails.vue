<template>
    <div id="figure-details">
        <div class="figure-details-header">{{ figure.id }}</div>
        <div class="figure-details-prop-group" :Key="idx" v-for="(group, idx) in figurePropGroups">
            <div class="figure-details-prop-row" :key="key" v-for="key in group">
                <span class="figure-prop-name">{{ getFigureName(key) }}</span>
                <div class="figure-prop-input-field">
                    <input style="width: 100%" type="text" v-model="formValues[key]"/>
                </div>
            </div>
        </div>
        <button v-if="isChanged" @click="commitChanges()">Commit Changes</button>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import { Watch } from 'vue-property-decorator';

    import Figure, { FigureValues } from '../../store/model/figure';

    import store from '../../store/index';
    import { SetFigurePropValuesPayload } from '../../store/mutations';
    import { figurePropGroups, figureProps } from '../../data/FigureProps';

    @Component({
        props: ['figure']
    })
    export default class FigureDetails extends Vue {
        figure: Figure
        
        formValues = this.getInitialFormValues(this.figure.propValues);

        @Watch("figure.propValues", { deep: true })
        figureValuesChanged(propValues: FigureValues) {
            this.formValues = this.getInitialFormValues(propValues);
        }

        commitChanges() {
            store.commit(new SetFigurePropValuesPayload(
                this.figure,
                this.formValues));
        }

        getFigureName(figureKey: string): string {
            const figureProp = figureProps.get(figureKey);
            return figureProp != null ? figureProp.name : '';
        }

        get isChanged() {
            return Object.entries(this.formValues).some(([key, value]) => {
                const figureValue = this.figure.propValues[key];
                return figureValue == null || figureValue !== value;
            })
        }

        get figurePropGroups() {
            return figurePropGroups;
        }

        getInitialFormValues(figureValues: FigureValues) {
            const result: { [key: string]: string } = {};
            for(let [key, v] of figureProps.entries()) {
                const propVal = figureValues[key];
                result[key] = propVal != null ? propVal : v.defaultValue;
            }
            return result;
        }
    }
</script>

<style lang="scss">
    #figure-details {
        padding: 5px;
    }

    .figure-details-header {
        text-align: center;
        font-weight: 700;
    }

    .figure-details-prop-row {
        display: flex;

        .figure-prop-name {
            padding-right: 5px;
            min-width: 70px;
            overflow: hidden;
            text-align: right;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .figure-prop-input-field {
            flex-grow: 1;
        }
    }

    .figure-details-prop-group {
        margin-bottom: 5px;
        padding: 3px;
    }
</style>


