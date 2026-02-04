import { useForm } from "@inertiajs/react";

export default function Create(){
    const {data, setData, post, errors, processing } = useForm({
        body: "",
    }) 
    function submit(e){
        e.preventDefault();
        post("/posts");
    }
    return (
    <>
        <h1 className="text-3xl font-bold">Create a form </h1>
        <div className="w-1/2 mx-auto flex justify-center items-center">
            <form onSubmit ={submit}>
                <textarea className = {errors.body ? 'ring ring-red-400' : 'border'}
                          value={data.body} 
                          rows = "10"
                          onChange={(e) => setData('body', e.target.value)}
                ></textarea>
                {errors.body && <p className="text-red-400 text-md"> {errors.body} </p>}
                <button 
                    className="btn btn-primary mt-4"
                    disabled = {processing}
                > 
                    Create Post
                </button>
            </form>
        </div>
    </>
    );
}