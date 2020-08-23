import { API_URL } from '../../config';

const fetchLevels = async ({ levels, answers }) => {
    const response = await fetch(`${API_URL}/birds?levels=${levels}&answers=${answers}`);
    return await response.json();
}

export default {
    fetchLevels
};