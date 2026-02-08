import { Link, useForm } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';

export default function ShowAddModal({ editingExpense = null, onClose }){
    const modalRef = useRef(null);
    const isEditMode = editingExpense !== null;
    
    const {data, setData, post, put, errors, processing } = useForm({
        name: "",
        amount: "",
    });

    useEffect(() => {
        if (editingExpense) {
            setData({
                name: editingExpense.name,
                amount: editingExpense.amount
            });
        } else {
            setData({name: "", amount: ""});
        }
    }, [editingExpense]);

    function submit(e){
        e.preventDefault();
        
        if (editingExpense) {
            put(route('expenses.update', editingExpense.id), {
                onSuccess: () => {
                    modalRef.current?.close();
                    onClose();
                }
            });
        } else {
            post("/expenses", {
                onSuccess: () => {
                    modalRef.current?.close();
                }
            });
        }
    }      
    
    return(
        <>  
            {!editingExpense && (
                <div className="p-4 border-b">
                    <Link 
                        href="#" 
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('my_modal_3').showModal();
                        }}
                        className="btn btn-primary"
                    >
                        Add Expense
                    </Link>
                </div>
            )}

            <dialog ref={modalRef} id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl">
                        {editingExpense ? "Edit Expense" : "Add an expense"}
                    </h3>
                    <form onSubmit={submit}>
                        <fieldset className="fieldset mt-4">
                            <legend className="fieldset-legend text-lg">Description: </legend>
                            <textarea className="textarea h-32" 
                                    placeholder="Enter your expense"
                                    value={data.name} 
                                    onChange={(e) => setData('name', e.target.value)}
                                    ></textarea>
                        </fieldset>
                        
                        <legend className="fieldset-legend text-lg">Amount: </legend>
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
                                onChange={(e) => setData('amount', e.target.value.replace(/,/g, ''))}
                            />
                        </div>
                        <p className="validator-hint">Enter the amount</p>

                        <div className="flex justify-center items-center mt-4">
                            <button type="submit" className="btn btn-wide p-6 rounded-lg bg-white text-black">
                                {editingExpense ? "Update" : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export function formatAmountInModal(value) {
    if (!value) return '';
    // Convert to string first
    const stringValue = String(value);
    // Remove any non-numeric characters except decimal point
    const numValue = stringValue.replace(/[^\d.]/g, '');
    // Split into whole and decimal parts
    const [whole, decimal] = numValue.split('.');
    // Add commas to whole part
    const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Return with up to 2 decimal places
    return decimal ? `${withCommas}.${decimal.slice(0, 2)}` : withCommas;
}

export function formatAmountInDisplay(value) {
    if (!value) return '0.00';
    const num = parseFloat(value);
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}