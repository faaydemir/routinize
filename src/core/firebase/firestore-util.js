export const getDataFromResponse = (response) => {

    if (response) {
        const data = response.docs.map(d => ({ id: d.id, ...d.data() }));
        return data;
    }
}

export default getDataFromResponse;