const DashboardHeader = ({ name }) => {
    return (
        <div className="flex flex-col gap-0.5">
            <p className="font-bold text-slate-600 dark:text-white/40">
                Sunday, March 1
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-500 dark:text-indigo-100">
                Selamat pagi, {name.split(' ')[0]}!
            </h1>
        </div>
    )
}
export default DashboardHeader;