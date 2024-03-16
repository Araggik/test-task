import { Ref } from "vue";

interface TextList {
    value: string,
    next: TextList | null
}

class NotificationService {
    #currentText: Ref<string> | null = null;

    #head: TextList | null = null;
    #tail: TextList | null = null;

    #notificationInterval = 2200;

    #addNotificationToQueue(text: string) {
        const textNode = {
            value: text,
            next: null
        };

        if (this.#head) {
            this.#tail!.next = textNode;

            this.#tail = textNode;
        } else {
            this.#head = textNode;

            this.#tail = textNode;

            this.#sendNotifications();
        }
    }

    async #sendNotifications() {
        while (this.#head) {
            this.#currentText!.value = this.#head.value;

            await new Promise((resolve)=>setTimeout(resolve, this.#notificationInterval));

            this.#head = this.#head.next;
        }
    }

    get notificationInterval() {
        return this.#notificationInterval;
    }

    linkComponent(currentText: Ref<string>) {
        this.#currentText = currentText;
    }

    showNotification(text: string) {
        if (this.#currentText) {
            this.#addNotificationToQueue(text);
        }
    }
}

export const notificationService = new NotificationService();