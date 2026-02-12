import React from "react";
import { useRef } from "react";
function Description() {
    const modalRef = useRef(null);
    return (
        <div>
            <dialog ref={modalRef} id="my_modal_description" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-2xl">Add an expense</h3>
                </div>
            </dialog>
        </div>
    );
}

export default Description;
