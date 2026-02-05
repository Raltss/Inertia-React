import { Head, useForm } from "@inertiajs/react";

export default function Edit({post}){
    const {data, setData, put, errors, processing } = useForm({
        body: post.body,
    }) 
    function submit(e){
        e.preventDefault();
        put(route('posts.update', post));
    }
    return (
    <>
        <Head title="Edit Post" />
        <div className="min-h-screen bg-base-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-base-content mb-2">Create a Post</h1>
                    <p className="text-base-content/60">Share your thoughts with the community</p>
                </div>

                {/* Form Card */}
                <div className="card bg-base-200 shadow-lg flex items-center justify-center">
                    <form onSubmit={submit} className="card-body gap-6">
                        {/* Textarea Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Your Post</span>
                            </label>
                            <textarea 
                                className={`textarea textarea-bordered resize-none focus:outline-none focus:textarea-primary ${errors.body ? 'textarea-error' : ''}`}
                                placeholder="What's on your mind?"
                                value={data.body} 
                                rows="10"
                                onChange={(e) => setData('body', e.target.value)}
                            />
                            {errors.body && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.body}</span>
                                </label>
                            )}
                        </div>

                        {/* Button */}
                        <div className="card-actions items-center flex justify-center mt-4">
                            <button 
                                type="submit"
                                className={`btn btn-primary w-full sm:w-auto ${processing ? 'loading' : ''}`}
                                disabled={processing}
                            > 
                                {processing ? 'Creating...' : 'Create Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
}