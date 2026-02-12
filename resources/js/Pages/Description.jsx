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
                    <div className="flex flex-col">
                        {" "}
                        <h1 className="font-bold text-2xl mb-4">Details</h1>
                        <h2 className="font-bold text-lg mb-4 ">
                            {" "}
                            Expense Name:{" "}
                        </h2>
                        <h2 className="font-bold text-lg mb-4">
                            {" "}
                            Expense Amount:{" "}
                        </h2>
                        <h2 className="font-bold text-lg"> Category: </h2>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Description;
