import frameworks from './frameworks.json';
import get from 'lodash/fp/get';

const API_RESPONSE_DELAY = 2000;

const fetchData = (entity, id) => {
    console.log(`Starting to fetch ${entity}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.warn(`Finished fetching ${entity}`)
            resolve(
                get([id, entity], frameworks)
            )
        }, API_RESPONSE_DELAY)
    });
}

export const getFrameworkById = (id) => {
    return fetchData('framework', id);
}

export const getGithubById = (id) => {
    return fetchData('github', id);
}

export const getNpmById = (id) => {
    return fetchData('npm', id);
}

export const getBundlephobiaById = (id) => {
    return fetchData('bundlephobia', id)
}