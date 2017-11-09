import FirebaseClient from "firebase-client";
import { toUriSafeString } from "../../lib/stringHelpers";

export default class FirebaseTestResultsPoster {
    constructor() {
        this.firebase = new FirebaseClient({
            url: "https://testing-challenge.firebaseio.com/"
        })
    }

    writeAsync(author, data) {
        const safeAuthor = toUriSafeString(author);

        const postData = {
            implementations: data.data,
            time: new Date().toISOString(),
            lang: 'js',
        };

        return this.firebase.set(
            `word-statistics/${this.buildDateKey()}/${safeAuthor}`,
            postData
        );
    }

    buildDateKey() {
        const now = new Date();
        const day = ("0" + now.getDate()).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        const year = now.getFullYear();
        return year + month + day;
    }
}