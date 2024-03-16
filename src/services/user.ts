export interface User {
    login: string,
    password: string
}

interface UserMap {
    [key: string]: User
}

class UserService {
    #userStorageKey = 'user';
    #userMapStorageKey = 'userMap';

    #user: User | null = this.#loadUser();
    #userMap: UserMap = this.#loadUserMap();

    #checkUserRegistration(user: User): boolean {
        let isRegister = false;

        if (user.login in this.#userMap) {
            const foundUser = this.#userMap[user.login];

            if (foundUser.password == user.password) {
                isRegister = true;
            }
        }

        return isRegister;
    }

    #loadUser(): User | null {
        let loadedUser: User | null = null;

        const userStr = localStorage.getItem(this.#userStorageKey);

        if (userStr != null) {
            const obj = JSON.parse(userStr);

            if (('login' in obj) && ('password' in obj)) {
                loadedUser = obj;
            }
        }

        return loadedUser;
    }

    #loadUserMap(): UserMap {
        let loadedUserMap: UserMap = {};

        const userMapStr = localStorage.getItem(this.#userMapStorageKey);

        if (userMapStr != null) {
            loadedUserMap = JSON.parse(userMapStr) as UserMap;
        }

        return loadedUserMap;
    }

    #saveUser(): void {
        if (this.#user) {
            localStorage.setItem(this.#userStorageKey, JSON.stringify(this.#user));
        }  
    }

    #saveUserMap(): void {
        localStorage.setItem(this.#userMapStorageKey, JSON.stringify(this.#userMap));
    }

    get isUser() {
        return this.#user != null;
    }

    get userLogin() {
        return this.#user?.login ?? '';
    }

    loginUser(user: User): boolean {
        let isSuccessLogin = false;

        if (this.#checkUserRegistration(user)) {
            this.#user = user;

            this.#saveUser();

            isSuccessLogin = true;
        }

        return isSuccessLogin;
    }

    logout() {
        if (this.#user) {
            localStorage.removeItem(this.#userStorageKey);

            this.#user = null;
        }
    }

    registerUser(user: User): boolean {
        if (user.login in this.#userMap) {
            return false;
        } else {
            this.#userMap[user.login] = user;

            this.#saveUserMap();

            return true;
        } 
    }

    validateLogin(login: any): boolean {
        let isValid = false;

        if (typeof login == 'string') {
            if (login.length > 1) {
                isValid = true;
            }
        }

        return isValid;
    }

    validatePassword(password: any): boolean {
        let isValid = false;

        if (typeof password == 'string') {
            if (password.length > 5) {
                isValid = true;
            }
        }

        return isValid;
    } 
}

export const userService = new UserService();