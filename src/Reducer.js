const reducer = (state, action) =>{

    switch (action.type){
        case "SET_LOADING":
            return{
                ...state,
                isloading: true,
            }
        case "GET_STORIES":

            return {
                ...state,
                isloading: false,
                hits : action.payload.hits,
                nbPages : action.payload.nbPages,
            };
            case "REMOVE_POST":
                return{
                    ...state,
                    hits: state.hits.filter((curElem) => 
                        curElem.objectID !== action.payload
                    )
                };
                case "SEARCH_QUERY":
                    return {
                        ...state,
                        query: action.thapa,
                    };

                    case "NEXT_PAGE":
                        let pageNumInc = state.page + 1;

                        if (pageNumInc >= state.nbPages) {
                            pageNumInc = 0;
                        }
                        return{
                            ...state,
                            page: pageNumInc,
                        }

                        case "PREV_PAGE":
                            let pageNum = state.page -1;
                            
                                
                            if (pageNum <= -1){
                                pageNum = 0;
                            }
                            else
                           
                        return{
                            ...state,
                            page: pageNum,
                        }
    }
    return state;
};

export default reducer; 