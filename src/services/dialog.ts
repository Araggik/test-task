import { Ref, ShallowRef } from 'vue';

class DialogService {
    #isVisible: Ref<boolean> | null = null;
    #innerComponent: ShallowRef<any> | null = null;
    #innerComponentProps: Ref<any> | null = null;

    linkComponent(
        isVisible: Ref<boolean>, 
        innerComponent: ShallowRef<any>,
        innerComponentProps: Ref<any>
    ) {
        this.#isVisible = isVisible;
        this.#innerComponent = innerComponent;
        this.#innerComponentProps = innerComponentProps;
    }

    showDialog(component: any, props: any) {
        if (this.#isVisible && this.#innerComponent && this.#innerComponentProps) {
            this.#isVisible.value = true;
            this.#innerComponent.value = component;
            this.#innerComponentProps.value = props;
        }
    }

    hideDialog() {
        if (this.#isVisible) {
            this.#isVisible.value = false;
        }
    }
}

export const dialogService = new DialogService();