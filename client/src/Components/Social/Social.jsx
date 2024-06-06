import { useContext } from 'react';
import google from '../../assets/google.png'
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Social = () => {
    const { googleLogIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"
    const handleGoogle = () => {
        googleLogIn()
            .then(result => {
                const userInfo = result.user;
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: userInfo.displayName,
                        email: userInfo.email,
                        photoURL: userInfo.photoURL
                    })
                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="flex justify-center gap-4 align-middle items-center">
            <Link><img onClick={handleGoogle} className="w-10" src={google} alt="" /></Link>
        </div>
    );
};

export default Social;