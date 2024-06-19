import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Social from "../Social/Social";
const Signup = () => {
    const {createUser, updateInfo} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"
    const handleRegister = (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            updateInfo(name);
            const saveUser = {name, email: loggedUser.email};
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(saveUser)
            })
            navigate(from, { replace: true });
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    return (
        <>
        <div className="w-10/12 mx-auto text-center flex justify-center mb-10 mt-10">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-lg bg-base-100">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-black text-center">Register Now</h1>
                    <form onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text ">Name</span>
                        </label>
                        <input type="text" placeholder="Name"
                        required 
                        name="name"
                        className="input input-bordered " />
                    </div>
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
                            <span className="">Already have an account? Please <Link to="/signin" className="text-[#D9042B]">Sign In</Link></span>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#D9042B] text-[#fff] hover:text-[#D9042B] hover:bg-[#000]">Sign Up</button>
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

export default Signup;