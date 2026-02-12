import { Head, Link, usePage, useForm } from "@inertiajs/react";
import ShowAddModal, { formatAmountInDisplay } from "./Add.jsx";
import { useState } from "react";
import ShowEditModal from "./Edit.jsx";
import Description from "./Description.jsx";

export default function Home({ expenses, expense }) {
    const { component } = usePage();
    console.log(usePage());

    const totalExpense = expenses.reduce(
        (sum, exp) => sum + parseFloat(exp.amount || 0),
        0,
    );

    return (
        <>
            <Head title={component} />
            <div className="w-1/2 rounded-lg ml-5 mt-5 border-t">
                <div className="text-2xl font-bold pl-4 pt-4">
                    Total: ₱{formatAmountInDisplay(totalExpense)}
                </div>
                {expenses.length > 0 ? (
                    <Expenses expenses={expenses} expense={expense} />
                ) : (
                    <>
                        <ShowAddModal />
                        <Fallback />
                    </>
                )}
            </div>
        </>
    );
}

function Fallback() {
    return (
        <>
            <div className="p-2 border-b">
                <p className="list-row p-4 font-medium text-base-content hover:bg-base-200 cursor-pointer">
                    NO EXPENSES TO SHOW
                </p>
            </div>
        </>
    );
}

function Expenses({ expenses }) {
    const [editingExpense, setEditingExpense] = useState(null);
    const { delete: destroy } = useForm();

    function submit(e, currentExpense) {
        e.preventDefault();
        destroy(route("expenses.destroy", currentExpense));
    }
    return (
        <div>
            <ShowAddModal expenses={expenses} />
            <Description />
            <ShowEditModal
                expenses={expenses}
                editingExpense={editingExpense}
                onClose={() => setEditingExpense(null)}
            />
            <ExpensesList
                expenses={expenses}
                onSubmit={submit}
                setEditingExpense={setEditingExpense}
            />
        </div>
    );
}

function ExpensesList({ expenses, onSubmit, setEditingExpense }) {
    return (
        <>
            {[...expenses].reverse().map((expense, index) => (
                <div key={expense.id} className="px-2 md:px-4">
                    <ul className="list bg-base-100 rounded-box shadow-md border-b">
                        <div className="cursor-pointer hover:bg-slate-500/20 rounded-lg">
                            <li
                                className="list-row mb-2 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 p-3 md:p-4"
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_description")
                                        .showModal()
                                }
                            >
                                <span className="text-2xl md:text-4xl font-thin opacity-30 tabular-nums">
                                    #{index + 1}
                                </span>

                                <div className="flex-1">
                                    <p className="font-medium text-base-content text-lg md:text-xl">
                                        {expense.name}
                                    </p>
                                    <p className="text-slate-400 text-sm md:text-md">
                                        Amount:
                                        <span className="text-white text-base md:text-lg ml-2">
                                            {" "}
                                            ₱
                                            {formatAmountInDisplay(
                                                expense.amount,
                                            )}
                                        </span>
                                    </p>
                                </div>

                                <div
                                    className="flex gap-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Link
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setEditingExpense(expense);
                                            document
                                                .getElementById("my_modal_edit")
                                                .showModal();
                                        }}
                                        className="btn btn-sm md:btn-md bg-green-500 rounded-md"
                                    >
                                        EDIT
                                    </Link>
                                    <form
                                        onSubmit={(e) => onSubmit(e, expense)}
                                    >
                                        <button className="btn btn-sm md:btn-md bg-red-500 rounded-md">
                                            {" "}
                                            DELETE{" "}
                                        </button>
                                    </form>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            ))}
        </>
    );
}
