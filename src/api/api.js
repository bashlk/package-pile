import frameworks from './frameworks.json';

export const getFrameworkById = (id) => {
    return Promise.resolve(frameworks.find(item => item.id === id));
}