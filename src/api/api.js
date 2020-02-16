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

const apiObject = {
    getFrameworkById: id => (
        fetchData('framework', id)
    ),
    getGithubById: id => (
        fetchData('github', id)
    ),
    getNpmById: id => (
        fetchData('npm', id)
    ),
    getBundlephobiaById: id => (
        fetchData('bundlephobia', id)
    ),
}

export default apiObject;
