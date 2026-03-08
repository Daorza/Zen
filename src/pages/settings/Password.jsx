import { useState } from "react";
import { Save, Eye, EyeOff } from "lucide-react";

const PasswordField = ({ label, required, value, onChange }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold dark:text-white/80 text-gray-800">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3.5 py-2.5 pr-10 rounded-lg text-sm
                        dark:bg-white/5 bg-gray-100
                        dark:border-white/10 border-gray-200 border
                        dark:text-white text-gray-900
                        dark:placeholder:text-white/20 placeholder:text-gray-400
                        focus:outline-none dark:focus:border-indigo-500/60 focus:border-indigo-400
                        transition-all duration-150"
                />
                <button
                    type="button"
                    onClick={() => setShow(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-white/30 text-gray-400 hover:dark:text-white/60 hover:text-gray-600 transition-colors duration-150"
                >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
            </div>
        </div>
    );
};

const PasswordPage = () => {
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <div className="flex flex-col gap-5 max-w-lg">
            <div className="flex flex-col gap-1 pb-4 border-b dark:border-white/10 border-gray-200">
                <h2 className="text-base font-bold dark:text-white text-gray-900">Update password</h2>
                <p className="text-sm dark:text-white/40 text-gray-500">
                    Ensure your account is using a long, random password to stay secure
                </p>
            </div>

            <PasswordField
                label="Current password"
                value={current}
                onChange={e => setCurrent(e.target.value)}
            />
            <PasswordField
                label="New password"
                required
                value={next}
                onChange={e => setNext(e.target.value)}
            />
            <PasswordField
                label="Confirm password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
            />

            <div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                    bg-indigo-500 hover:bg-indigo-600 text-white
                    transition-all duration-150 cursor-pointer">
                    <Save size={14} strokeWidth={2.5} />
                    Save
                </button>
            </div>
        </div>
    );
};
export default PasswordPage