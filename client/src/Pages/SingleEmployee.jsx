import { useLoaderData } from "react-router-dom";

const SingleEmployee = () => {
    const employee = useLoaderData();
    console.log(employee);
    return (
        <div>
            single
        </div>
    );
};

export default SingleEmployee;