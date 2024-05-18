const CreateEmployee = () => {
    return (
        <div className="border md:mx-10 bg-white rounded-sm pb-10 md:mb-10 pt-10">
            <div className="grid md:grid-cols-2 gap-4 w-10/12 mx-auto">
                <div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Name: </h3>
                        <input type="text" placeholder="Type here" className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Email: </h3>
                        <input type="email" placeholder="Type here" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Password: </h3>
                        <input type="password" placeholder="Type here" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Placeholder: </h3>
                        <input type="text" placeholder="Placeholder" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Text area: </h3>
                        <textarea name="" id="" cols="" rows="" className="border rounded-md w-full h-32"></textarea>
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Randomly: </h3>
                        <input type="number" placeholder="Randonly value"
                            className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Disabled: </h3>
                        <input type="text" placeholder="Disabled" className="input input-sm input-bordered w-full "
                            disabled />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Static control: </h3>
                        <input type="text" placeholder="email@example.com"
                            readOnly
                            className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Helping text: </h3>
                        <input type="text" placeholder="Placeholder" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Select input: </h3>
                        <select className="select select-bordered w-full">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Default file input: </h3>
                        <input type="file" placeholder="Type here" className="w-full border" />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Date: </h3>
                        <input type="date" placeholder="Type here" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Month: </h3>
                        <input type="month" placeholder="Type here" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Time: </h3>
                        <input type="time" placeholder="Placeholder" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Week: </h3>
                        <input type="week" placeholder="d" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Number: </h3>
                        <input type="number" placeholder="" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">URL: </h3>
                        <input type="url" placeholder="" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Search: </h3>
                        <input type="search" placeholder="" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Tel: </h3>
                        <input type="tel" placeholder="" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Color: </h3>
                        <input type="color" placeholder="" className="input input-sm input-bordered w-full " />
                    </div>
                    <div className="md:flex items-center gap-3 mt-7">
                        <h3 className="font-bold text-[14px] text-[#4B4B5A] w-[20%]">Range: </h3>
                        <input type="range"
                            placeholder="" className="input input-sm w-full bg-[#f2f2f2] h-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;