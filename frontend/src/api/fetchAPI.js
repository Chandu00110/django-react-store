import api from "./axios";

const fetchAPI = async (url) => {
    try{
        const res = await api.get(`${url}`);
        if(res.status == 200){
            return res;
        }
        else {
            console.error("Error fetching details:", res.status, res.statusText);
        }
    }catch (err) {
        console.error("Network or server error while fetching details:", err);
    }
}

export const postAPI = async (url, data) => {
    try {
        const res = await api.post(`${url}`, data);
        if(res.status === 201 || res.status === 200){ 
            return res;
        }
        else {
            console.error("Error posting details:", res.status, res.statusText);
        }
    }catch (err) {
        console.error("Network or server error while posting details:", err);
    }
};

export default fetchAPI;