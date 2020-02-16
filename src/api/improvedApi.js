import frameworks from './frameworks.json';
import get from 'lodash/fp/get';

const API_RESPONSE_DELAY = 2000;

const improvedFetchData = entity => {
    let status = {};
    let result = {};
    let suspender = {};

    return {
      getById(id) {
        const key = `${entity}-${id}`;
        if(!suspender[key]){
            status[key] = 'pending';
            console.log(`Starting to fetch ${entity}`);
            suspender[key] = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.warn(`Finished fetching ${entity}`)
                    status[key] = 'success';
                    result[key] = get([id, entity], frameworks);
                    resolve(result[key]);
                }, API_RESPONSE_DELAY);
            })
        }
        if (status[key] === 'pending') {
          throw suspender[key];
        } else if (status[key] === 'success') {
          return result[key];
        }
      }
    };
  }

const apiObject = {
    framework: improvedFetchData('framework'),
    github: improvedFetchData('github'),
    npm: improvedFetchData('npm'),
    bundlephobia: improvedFetchData('bundlephobia'),
}

export default apiObject;
