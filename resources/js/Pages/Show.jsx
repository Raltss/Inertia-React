import { useForm } from '@inertiajs/react'

export default function Show({post}){
    const { delete: destroy } = useForm();

    function submit(e){
        e.preventDefault();
        destroy(route('posts.destroy', post));
    }
    return (
        <>
            <div className="flex p-2 border-b justify-between gap-2"> 
                <div className="text-sm text-slate-600 px-4 pt-3">
                    <span> Posted on: </span>
                    <span>{new Date(post.created_at).toLocaleTimeString() }</span>
                    <p className="list-row pt-4 font-medium text-base-content hover:bg-base-200 cursor-pointer">
                        {post.body} 
                    </p>
                </div>

                <div className = "mt-4">
                    <form onSubmit={submit}>
                        <button className="btn bg-red-500"> DELETE </button>
                    </form>
                </div>
            </div>
        </>
    );
}