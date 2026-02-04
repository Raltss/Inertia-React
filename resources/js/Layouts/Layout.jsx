import { Link } from "@inertiajs/react";

export default function Layout({children}){
    return (
        <>
            <header>
                <nav className = "navbar bg-base-100 shadow-sm">
                    <div className="flex-1">
                        <Link className = "btn btn-ghost text-xl" href = "/"> Home </Link>
                    </div>
                    <div className="flex-none">
                        <Link className = "btn btn-ghost text-xl" href = "/posts/create"> Create </Link>
                    </div>
                </nav>
            </header>

            <main>{children}</main>
        </>
    );
}