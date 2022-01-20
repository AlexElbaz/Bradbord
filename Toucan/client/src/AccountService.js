import axios from 'axios';

const url = 'api/accounts/';

class AccountService {
    // Get Accounts
    static async getAccounts() {
        const res = await axios.get(url);
        const data = res.data;

        return data.map(account => ({
            ...account,
            createdAt: new Date(account.createdAt)
        }));
    }

    // Get Account
    static async getAccount(id) {
        const res = await axios.get(`${url}${id}`);
        const data = res.data;

        let account = data.map(account => ({
            ...account,
            createdAt: new Date(account.createdAt)
        }));

        return account[0];
    }

    // Create Account
    static insertAccount(firstName, lastName, email, password, isAdmin) {
        return axios.post(url, {
            firstName,
            lastName,
            email,
            password,
            isAdmin
        });
    }

    // Delete Account
    static deleteAccount(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default AccountService;