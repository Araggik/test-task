<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { notificationService } from '../services/notification';
import { userService } from '../services/user';


const router = useRouter();


const props = withDefaults(defineProps<{
    isLoginForm?: boolean
}>(), {
    isLoginForm: true
});


const userLogin = ref('');

const userPassword = ref('');

const headerText = props.isLoginForm ? 'Вход' : 'Регистрация';

const firstButtonText = props.isLoginForm ? 'Войти' : 'Зарегистрироваться';

const secondButtonText = props.isLoginForm ? 'Регистрация' : 'Назад';

const loginErrorText = ref('');

const passwordErrorText = ref('');

const loginErrorStr = 'Логин должен содержать 2 символа';

const passwordErrorStr = 'Пароль должен содержать 6 символов';

function onSubmit(event: Event) {
    event.preventDefault();

    if (props.isLoginForm) {
        loginUser();
    } else {
        registerUser();
    }
}

function onSecondButtonClick() {
    if (props.isLoginForm) {
        goToRegistration();
    } else {
        goToLogin();
    }
}

function validateAndCallUserService(callFunction: () => void) {
    const isValidLogin = userService.validateLogin(userLogin.value);

    const isValidPassword = userService.validatePassword(userPassword.value);

    if (isValidLogin && isValidPassword) {
        callFunction();
    } else {
        showErrors(isValidLogin, isValidPassword);
    }
}

function loginUser() {
    validateAndCallUserService(callLoginUser);
}

function registerUser() {
    validateAndCallUserService(callRegisterUser);
}

function callLoginUser() {
    const isSuccessLogin = userService.loginUser({
        login: userLogin.value,
        password: userPassword.value
    });

    if (isSuccessLogin) {
        router.push('/');
    } else {
        notificationService.showNotification('Неправильный логин или пароль');
    }
}

function callRegisterUser() {
    const isSuccessRegister = userService.registerUser({
        login: userLogin.value,
        password: userPassword.value
    });

    if (isSuccessRegister) {
        router.push('/login');
        notificationService.showNotification('Вы зарегистрированы');
    } else {
        notificationService.showNotification('Логин уже используется');
    }
}

function showErrors(isValidLogin: boolean, isValidPassword: boolean) {
    if (!isValidLogin) {
        loginErrorText.value = loginErrorStr;
    }

    if (!isValidPassword) {
        passwordErrorText.value = passwordErrorStr;
    }
}

function goToRegistration() {
    router.push('/register');
}

function goToLogin() {
    router.push('/login');
}

function clearLoginErrorText() {
    loginErrorText.value = '';
}

function clearPasswordErrorText() {
    passwordErrorText.value = '';
}
</script>

<template>
    <form @submit="onSubmit" class="user-form">
        <div class="form-element form-header">
            <strong>{{ headerText }}</strong>
        </div>
        <fieldset class="form-element form-fieldset">
            <label for="userLoginInput" class="form-label">Логин:</label>
            <input id="userLoginInput" v-model="userLogin" @input="clearLoginErrorText"
                class="form-input" :class="{'form-input-error': loginErrorText}"
            >
            <div class="form-error">{{ loginErrorText }}</div>
        </fieldset> 
        <fieldset class="form-element form-fieldset">
            <label for="userPasswordInput" class="form-label">Пароль:</label>
            <input ref="passwordInput" id="userPasswordInput" v-model="userPassword" 
                @input="clearPasswordErrorText" type="password" class="form-input" 
                :class="{'form-input-error': passwordErrorText}"
            >
            <div class="form-error">{{ passwordErrorText }}</div>
        </fieldset>
        <input id="userFirstButton" type="submit" :value="firstButtonText" 
            class="form-element form-button"
        >
        <input id="userSecondbutton" type="button" :value="secondButtonText" @click="onSecondButtonClick" 
            class="form-element form-button form-last-element"
        >
    </form>
</template>

<style scoped>
.user-form {
    --form-ident: 0.5rem;

    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: 20rem;

    padding: var(--form-ident);

    border: 2px solid black;
    border-radius: 0.5rem;
}

.form-header {
    font-size: 1.5rem;
    text-align: center;
}

.form-fieldset {
    border: none;
    padding: 0;
    margin: 0;
}

.form-label {
    display: block;
    font-size: 1.2rem;
}

.form-input {
    width: 100%;
    height: 2rem;
}

.form-input-error {
    border: 1px solid brown;
}

.form-error {
    height: 1rem;
    font-size: 0.9rem;
    color: brown;
}

.form-button {
    padding: var(--form-ident);
}

.form-element {
    margin-bottom: var(--form-ident);
}

.form-last-element {
    margin-bottom: 0;
}
</style>

