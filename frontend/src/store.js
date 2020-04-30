import {createStore} from 'redux';

export default createStore(function(state, action){
    if(state === undefined){
        return {imageSrc:null}
    }
    if(action.type === 'imgSrc'){
        return {...state, imageSrc:action.imageSrc}
    }else if(action.type === 'user'){
        return {...state, userInfo:action.userInfo}
    }else if(action.type === 'items'){
        return {...state, items:action.items}
    }else if(action.type === 'clear'){
        state = undefined;
    }else if(action.type === 'usersList'){
        return {...state, usersList:action.usersList}
    }


    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
