import { Head, Link, usePage } from "@inertiajs/react";
import Toast from '@/Components/Toast'


export default function Home({posts}){
    console.log(usePage());
    const {component} = usePage();
    return (
        <> 
            <Head title = {component} />
            <Toast />
            <h1 className="text-3xl sm:text-5xl font-bold text-primary text-center my-8">
                Hello user!
            </h1>
            {posts.data.length > 0 ? <Data posts={posts} /> : <Fallback />}
            <Pagination posts = {posts} />
        </>
    );
}

function Pagination ({posts}){
    return (
        <>
            <div className="py-12 px-4 flex justify-center items-center">
                {posts.links.map(link => (
                    link.url ? (
                    <Link
                        key={link.label}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`p-1 mx-1 ${
                        link.active ? "text-blue-500 font-bold" : ""
                        }`}
                    />
                    ) : (
                    <span
                        key={link.label}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className="px-1 mx-1 text-base-content/40"
                    ></span>
                    )
                ))}
            </div>
        </>
    );

}

export function Data ({posts}){
    return(
        <>
        <div>
                {posts.data.map(post =>(
                    <div key={post.id} className="p-2 border-b"> 
                        <div className="text-sm text-slate-600 px-4 pt-3">
                            <span> Posted on: </span>
                            <span>{new Date(post.created_at).toLocaleTimeString() }</span>
                        </div>
                        <p className="list-row p-4 font-medium text-base-content hover:bg-base-200 cursor-pointer">
                            {post.body} 
                        </p>
                        <Link href = {route('posts.show', post)}className="text-blue-500 px-4 text-link"> Read more...</Link>
                    </div>
                ))}
            </div>
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