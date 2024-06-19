import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Profile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div className="flex justify-center">
            <div className="card mt-10 pt-10 bg-base-100 shadow-xl">
                <figure><img className="rounded-full" src={user?.photoURL} alt="profile-img" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-center">{user?.displayName}</h2>
                    <p className="text-center">{user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;