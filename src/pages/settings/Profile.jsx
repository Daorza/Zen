import { useState } from "react";
import { Save, Trash2 } from "lucide-react";

const Field = ({ label, required, ...inputProps }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold dark:text-white/80 text-gray-800">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
            {...inputProps}
            className="w-full px-3.5 py-2.5 rounded-lg text-sm
                dark:bg-white/5 bg-gray-100
                dark:border-white/10 border-gray-200 border
                dark:text-white text-gray-900
                dark:placeholder:text-white/20 placeholder:text-gray-400
                focus:outline-none dark:focus:border-indigo-500/60 focus:border-indigo-400
                transition-all duration-150"
        />
    </div>
);

const SectionHeader = ({ title, description }) => (
    <div className="flex flex-col gap-1 pb-4 border-b dark:border-white/10 border-gray-200">
        <h2 className="text-base font-bold dark:text-white text-gray-900">{title}</h2>
        <p className="text-sm dark:text-white/40 text-gray-500">{description}</p>
    </div>
);

const ProfilePage = ({ data }) => {
    const [name, setName] = useState(data?.name ?? "");
    const [email, setEmail] = useState(data?.email ?? "");

    return (
        <div className="flex flex-col gap-8 max-w-lg">
            {/* Profile section */}
            <div className="flex flex-col gap-5">
                <SectionHeader
                    title="Profile"
                    description="Update your name and email address"
                />
                <Field
                    label="Name"
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                />
                <Field
                    label="Email"
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
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

            {/* Delete account section */}
            <div className="flex flex-col gap-5">
                <SectionHeader
                    title="Delete account"
                    description="Delete your account and all of its resources"
                />
                <div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                        bg-red-500 hover:bg-red-600 text-white
                        transition-all duration-150 cursor-pointer">
                        <Trash2 size={14} strokeWidth={2.5} />
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;