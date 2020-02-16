import frameworks from './frameworks.json';
import get from 'lodash/fp/get';

const API_RESPONSE_DELAY = 2000;

const improvedFetchData = entity => {
    let status = 'pending';
    let result;
    let suspender;

    return {
      getById(id) {
        if(!suspender){
            console.log(`Starting to fetch ${entity}`);
            suspender = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.warn(`Finished fetching ${entity}`)
                    status = 'success';
                    result = get([id, entity], frameworks);
                    resolve(result);
                }, API_RESPONSE_DELAY);
            })
        }
        if (status === 'pending') {
          throw suspender;
        } else if (status === 'success') {
          return result;
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
