import Config from "@/Config";
import axios from "axios";

export const Registration = async (data) => {
    return axios
        .post(`${Config?.baseApi}/account/signup`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return [res?.data];
        })
        .catch((error) => {
            return [false, error];
        });
};
