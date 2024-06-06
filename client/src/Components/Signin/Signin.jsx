import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Social from "../Social/Social";
import { AuthContext } from "../../Provider/AuthProvider";

const Signin = () => {
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"
    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
        .then(result => {
            result.user
            form.reset();
            navigate(from, { replace: true });
        })
        .catch(error =>{
            console.log(error.message);
        })
    }

    return (
        <>
            <div className="w-10/12 mx-auto text-center flex justify-center mb-10 mt-24">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-lg bg-base-100">
                    <div className="card-body">
                    <h1 className="text-2xl font-bold text-black text-center">Sign In Now</h1>
                        <form onSubmit={handleSignIn}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email"
                                    required
                                    name="email"
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password"
                                    required
                                    name="password"
                                    className="input input-bordered" />
                                <label className="label">
                                    <span className="">Are you new user? Please <Link to="/signup" className="text-[#D9042B]">Sign Up</Link></span>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-[#D9042B] text-[#fff] hover:text-[#D9042B] hover:bg-[#000]">Sign In</button>
                            </div>
                        </form>
                        <div className="divider">Or Sign In with </div>
                        <Social/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin;