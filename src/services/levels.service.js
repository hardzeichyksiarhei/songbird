import { API_URL } from './../config';

const fetchLevels = async (levels = 1, answers = 2) => {
    try {
        const response = await fetch(`${API_URL}/birds?levels=${levels}&answers=${answers}`);
        return await response.json();
    } catch(err) {
        console.error(err);
    }
}

export default {
    fetchLevels
}