// context creation
// provider
// consumer lengthy remove useContext Hook
// useContext hook
// 
import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./Reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isloading :true,
    query : "HTML",
    nbPages : 0,
    page : 0,
    hits :[],
};

const AppContext = React.createContext();

// to create a provider function

const AppProvider = ({children}) =>{

    const [state , dispatch] = useReducer (reducer, initialState);

   


    const fetchApiData =async (url) =>{

        dispatch({type:"SET_LOADING"});

        try{
            const res = await fetch(url);
            const data = await res.json()
            console.log(data)

            dispatch({type:"GET_STORIES",
            payload: {
                hits: data.hits,
                nbPages: data.nbPages,
            }
        })
            // isloading = false;
        } 
        catch (error){
            console.log(error);

        }
    };

    // to remove the post
    const removePost = (post_ID) => {
        dispatch({ type: "REMOVE_POST", payload: post_ID});
    };

    // search section
    const searchPost = (searchQuery) =>{
        dispatch({
            type: "SEARCH_QUERY",
            thapa:searchQuery,
    });
    };

    // pagination
    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE",
        });
    };

    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE",
        });
    };



    useEffect(() =>{
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    },[state.query, state.page]);

    return (
        <AppContext.Provider value={{...state, removePost, searchPost, getNextPage, getPrevPage}}>{children}</AppContext.Provider>
    )
};

// custom hook

const useGlobalContext =() => {
    return useContext(AppContext);
}; 

export {AppContext , AppProvider , useGlobalContext};