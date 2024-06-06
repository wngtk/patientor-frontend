import axios from "axios";
import {apiBaseUrl} from "../constants.ts";
import {Diagnosis} from "../types.ts";

const getAll = async () => {
    const response = await axios.get(`${apiBaseUrl}/diagnoses`);
    return response.data as Diagnosis[];
};

export default {
    getAll
};
