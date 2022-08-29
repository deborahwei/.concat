import { RECEIVE_ALL_PROBLEMS } from "../actions/problem_actions";

const problemsReducer = (state={}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_PROBLEMS:
            const problems = action.problems?.data
            problems.forEach(problem => {
                nextState[problem._id] = problem
            });
            return nextState;
        default:
            return state;
    };
};

export default problemsReducer