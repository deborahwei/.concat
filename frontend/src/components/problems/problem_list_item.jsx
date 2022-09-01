import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import closeDropdown from "../util/close_dropdown";

const ProblemListItem = props => {
    const { problem, seed=false, query, openModal, currentRoom, problemsListClassName,
    patchComplete, patchIncomplete, rerenderRooms } = props;
    
    const openRef = useRef(null);
    const [open, setOpen] = closeDropdown(openRef, false);
    const handleDropdown = () => {setOpen(!open)};

    const handleEdit = (problem) => {
        openModal("editproblem", {room: props.currentRoom, problem: problem});
    };

    const show = (problem, searchQuery) => {
        return problem?.title?.toLowerCase().includes(searchQuery?.toLowerCase());
    };

    const [state, setState] = useState({
        completedQuestions: currentRoom.problems.complete,
        incompleteQuestions: currentRoom.problems.incomplete
    });

    const checked = (state.completedQuestions)?.includes(problem._id) || false;

    const handleChecks = (e) => {
        e.preventDefault();

        if (checked){
            patchIncomplete(currentRoom.id, problem._id).then(() => {
                const newCompletedQuestions = (state.completedQuestions).filter(problemId => problemId !== problem._id);
                const newIncompleteQuestions = state.incompleteQuestions.concat([problem._id]);
                setState({
                    completedQuestions: newCompletedQuestions,
                    incompleteQuestions: newIncompleteQuestions
                })
            });
            
        } else{
            patchComplete(currentRoom.id, problem._id).then(() => {
                const newCompletedQuestions = (state.completedQuestions).filter(problemId => problemId !== problem._id);
                const newIncompleteQuestions = state.incompleteQuestions.concat([problem._id]);
                setState({
                    completedQuestions: newCompletedQuestions,
                    incompleteQuestions: newIncompleteQuestions
                });
            });
        };
        rerenderRooms();
    };

    return(
        <div className={`${show(problem, query) ? "" : "hide"} ${problemsListClassName}`}>
            <div className={`individual-problem`}>
                <input type="checkbox" className="problems-checkbox" onChange={handleChecks} checked={checked} />
                <Link to={`/rooms/${currentRoom.id}/problems/${problem._id}`}>
                    <p>{problem.title}</p>
                </Link>
            </div>
            <div onClick={handleDropdown} className={`${seed ? "hide" : "" } problem options-trigger`}>
                <div>
                    ...
                </div>
                <div ref={openRef} className={`problem options-menu ${open ? "open" : "hide"}`}>
                    <div >
                        <p onClick={() => handleEdit(problem)}>Edit problem</p>
                    </div>
                </div>
            </div>
            <div></div>
            <hr />
        </div>
    );
};

export default ProblemListItem;