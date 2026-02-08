import { Head, Link, usePage, useForm } from "@inertiajs/react";
import Toast from '@/Components/Toast'
import ShowAddModal from "./Add.jsx";
import { formatAmountInDisplay } from './Add.jsx';
import { useState } from 'react';

export default function Home({posts, expenses, expense}){
    const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    console.log(usePage());
    const {component} = usePage();
    return (
        <> 
            <Head title = {component} />
            <Toast />


            <div className="text-2xl font-bold p-4">
                Total: ₱{formatAmountInDisplay(totalExpense)}
            </div>
            
            <ShowAddModal />
            {expenses.length > 0 ? <Expenses expenses = {expenses} expense = {expense} /> : <Fallback />}
        </>
    );
}

function Fallback(){
    return (
        <>
        <div className="p-2 border-b"> 
            <p className="list-row p-4 font-medium text-base-content hover:bg-base-200 cursor-pointer">
                Nothing to show
            </p>
        </div>
        </>
    );
}

function Expenses({expenses, expense}){
    const [editingExpense, setEditingExpense] = useState(null);
    const {delete: destroy} = useForm();
    
    function submit(e, currentExpense){
        e.preventDefault();
        destroy(route('expenses.destroy', currentExpense));
    }
    return(
        <div>
            <ShowAddModal editingExpense={editingExpense} onClose={() => setEditingExpense(null)} />
            {expenses.map(expense =>(
                <div key={expense.id} className="p-2 border-b"> 
                    <div className="flex justify-between">
                        <div className="px-4 pt-3">
                            <p className="list-row font-medium text-base-content hover:bg-base-200 cursor-pointer text-xl pb-1">
                                {expense.name} 
                            </p>
                            <span className="text-slate-400 text-md"> Amount:    
                                <span className="text-white text-lg"> ₱{formatAmountInDisplay(expense.amount)}</span>
                            </span>
                        </div>

                        <div className="flex justify-center items-center">
                            <Link href="#" 
                                 onClick={(e) => {
                                 e.preventDefault();
                                 setEditingExpense(expense);
                                 document.getElementById('my_modal_3').showModal();
                                 }} 
                                 className="btn bg-green-500 mr-4 rounded-md"> 
                                 EDIT 
                            </Link>
                            <form onSubmit={(e) => submit(e, expense)}>
                                <button className="btn bg-red-500 mr-4 rounded-md"> DELETE </button>
                            </form>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}



// export function Data ({posts}){
//     return(
//         <>
//             <div>
//                 {posts.data.map(post =>(
//                     <div key={post.id} className="p-2 border-b"> 
//                         <div className="text-sm text-slate-600 px-4 pt-3">
//                             <span> Posted on: </span>
//                             <span>{new Date(post.created_at).toLocaleTimeString() }</span>
//                         </div>
//                         <p className="list-row p-4 font-medium text-base-content hover:bg-base-200 cursor-pointer">
//                             {post.body} 
//                         </p>
//                         <Link href = {route('posts.show', post)}className="text-blue-500 px-4 text-link"> Read more...</Link>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }

// function Pagination ({posts}){
//     return (
//         <>
//             <div className="py-12 px-4 flex justify-center items-center">
//                 {posts.links.map(link => (
//                     link.url ? (
//                     <Link
//                         key={link.label}
//                         href={link.url}
//                         dangerouslySetInnerHTML={{ __html: link.label }}
//                         className={`p-1 mx-1 ${
//                         link.active ? "text-blue-500 font-bold" : ""
//                         }`}
//                     />
//                     ) : (
//                     <span
//                         key={link.label}
//                         dangerouslySetInnerHTML={{ __html: link.label }}
//                         className="px-1 mx-1 text-base-content/40"
//                     ></span>
//                     )
//                 ))}
//             </div>
//         </>
//     );

// }
