import { Link, useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function ShowAddModal({ expenses }) {
    const modalRef = useRef(null);
    console.log("here's the expense: ", { expenses });

    const { data, setData, post } = useForm({
        name: "",
        amount: "",
    });

    function submit(e) {
        e.preventDefault();
        post("/expenses", {
            onSuccess: () => {
                modalRef.current?.close();
                setData({ name: "", amount: "" });
            },
        });
    }

    return (
        <>
            <div className="p-4">
                <Link
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("my_modal_3").showModal();
                    }}
                    className="btn btn-soft p-5"
                >
                    ADD EXPENSE
                </Link>
            </div>

            <dialog ref={modalRef} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-2xl">Add an expense</h3>
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

                        <Category expenses={expenses} />
                        <p className="validator-hint">Enter the amount</p>
                        <div className="flex justify-center items-center mt-4">
                            <button
                                type="submit"
                                className="btn btn-wide p-6 rounded-lg bg-white text-black"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export function formatAmountInModal(value) {
    if (!value) return "";
    const stringValue = String(value);
    const numValue = stringValue.replace(/[^\d.]/g, "");
    const [whole, decimal] = numValue.split(".");
    const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimal ? `${withCommas}.${decimal.slice(0, 2)}` : withCommas;
}

export function formatAmountInDisplay(value) {
    if (!value) return "0.00";
    const num = parseFloat(value);
    return num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function Category({ expenses }) {
    return (
        <>
            <legend className="fieldset-legend text-lg mt-4 mb-1">
                Category:{" "}
            </legend>
            <select defaultValue="Select a category" className="select">
                <option disabled={true}>Select a category</option>
                {expenses.map((expense) => (
                    <option key={expense.id}>{expense.category}</option>
                ))}
            </select>
        </>
    );
}
