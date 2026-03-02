import GlassCard from "../../components/ui/GlassCard";
import CircularProgress from "../../components/ui/CircularProgress";
export default function DashboardPage () {
    return <>
        <div className="w-full flex flex-col gap-6 p-8">
            {/* glassy card */}
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className="font-bold text-slate-600">
                        Sunday, March 1
                    </p>
                    <h1 className="text-3xl font-extrabold text-indigo-500">
                        Selamat pagi, Nugroho Nur Cahyo!
                    </h1>
                </div>
            </div>

            {/* stats card */}
            <div className="flex gap-6 items-center justify-start">
                 <div className="h-56 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-start gap-2 p-6 border border-indigo-300 shadow shadow-indigo-400">
                    <CircularProgress percentage={60} size={100}  />
                    <div className="ml-8 hidden sm:block">
                        <p className="text-[10px] font-black uppercase tracking-widest dark:text-white/30 text-gray-600 mb-1">Status</p>
                        <p className="text-lg dark:text-white uppercase font-extrabold text-indigo-500">
                        {60 >= 80 ? "Excellent!" : 60 >= 50 ? "On Track" : "Getting Started"}
                        </p>
                        <p className="text-xs dark:text-white/40 tracking-tight font-semibold text-gray-500">
                        {4} / {4} tasks done
                        </p>
                    </div>
                </div>
                <div className=" flex-wrap h-56 bg-white/80">

                </div>
                <div className=" h-56 bg-indigo-700/10 backdrop-blur-liquid">

                </div>
                <div className=" h-56 bg-indigo-700/10 backdrop-blur-liquid">

                </div>
            </div>
           
            {/* activities */}
            <div className="grid grid-cols-3 gap-6 col-span-4">
                <div className="col-span-1 h-56 bg-black/10 backdrop-blur-liquid">

                </div>
                <div className="col-span-1 h-56 bg-indigo-700/10 backdrop-blur-liquid">

                </div>
                <div className="col-span-1 h-56 bg-indigo-700/10 backdrop-blur-liquid">

                </div>
            </div>
        </div>
    </>
}