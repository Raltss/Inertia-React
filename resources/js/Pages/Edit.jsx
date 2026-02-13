import { Link, useForm } from "@inertiajs/react";
import { useRef, useEffect } from "react";
import { formatAmountInModal, formatAmountInDisplay } from "./Add.jsx";

export default function ShowEditModal({ editingExpense = null, onClose }) {
    const modalRef = useRef(null);
    console.log("editing expense: ", editingExpense);
    const { data, setData, put } = useForm({
        name: "",
        amount: "",
        category_id: "",
    });

    useEffect(() => {
        if (editingExpense) {
            setData({
                name: editingExpense.name,
                amount: editingExpense.amount,
                category_id: editingExpense.category_id,
            });
        }
    }, [editingExpense?.id]);

    function submit(e) {
        e.preventDefault();

        if (editingExpense) {
            put(route("expenses.update", editingExpense.id), {
                onSuccess: () => {
                    modalRef.current?.close();
                    onClose();
                },
            });
        }
    }

    return (
        <>
            <dialog ref={modalRef} id="my_modal_edit" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-2xl">Edit Expense</h3>
                    <form onSubmit={submit}>
                        <fieldset className="fieldset mt-4">
                            <legend className="fieldset-legend text-lg mb-1">
                                Description:{" "}
                            </legend>
                            <textarea
                                className="textarea h-32"
                                placeholder="Enter your expense"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            ></textarea>
                        </fieldset>

                        <legend className="fieldset-legend text-lg mb-1">
                            Amount:{" "}
                        </legend>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white z-10">
                                Php
                            </span>
                            <input
                                type="text"
                                className="input validator pl-12"
                                required
                                placeholder="0.00"
                                max="9999999"
                                value={formatAmountInModal(data.amount)}
                                onChange={(e) =>
                                    setData(
                                        "amount",
                                        e.target.value.replace(/,/g, ""),
                                    )
                                }
                            />
                        </div>
                        <Category
                            categories={categories}
                            selectedCategory={data.category_id}
                            onChange={(value) => setData("category_id", value)}
                        />
                        <p className="validator-hint">Enter the amount</p>

                        <div className="flex justify-center items-center mt-4">
                            <button
                                type="submit"
                                className="btn btn-wide p-6 rounded-lg bg-white text-black"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
