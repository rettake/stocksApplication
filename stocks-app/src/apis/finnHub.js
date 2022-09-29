import axios from "axios";

const TOKEN = 'ccqqfq2ad3ic1tekt89gccqqfq2ad3ic1tekt8a0';

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: { token: TOKEN }
});