import GlassCard from "../../components/ui/GlassCard";
import CircularProgress from "../../components/ui/CircularProgress";
import { ActivityIcon, Check, CloudLightning, LucideClock, LucideCloudLightning } from "lucide-react";
import BehaviourTracker, {DUMMY_BEHAVIOUR_DATA}  from "../../components/ui/BehaviourTracker";
export default function DashboardPage () {
    return (
    <>
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
            <div className="grid grid-cols-5 gap-6 items-center justify-start">
                 <div className="grid grid-cols-2 col-span-2 gap-4">
                    <GlassCard className="flex items-center justify-start gap-2 p-6 h-56 col-span-2">
                        <CircularProgress percentage={60} size={140}  />
                        <div className="ml-8 hidden sm:block">
                            <p className="text-[12px] font-black uppercase tracking-widest dark:text-white/30 text-gray-600 mb-1">Status</p>
                            <p className="text-2xl dark:text-white uppercase font-extrabold text-indigo-500">
                            {60 >= 80 ? "Excellent!" : 60 >= 50 ? "On Track" : "Getting Started"}
                            </p>
                            <p className="text-sm dark:text-white/40 tracking-tight font-semibold text-gray-500">
                            {4} / {4} tasks done
                            </p>
                        </div>
                    </GlassCard>
                    <GlassCard className="flex items-center justify-center gap-4 p-4 h-32 col-span-1 active:scale-95 duration-300 transition-all ease-in-out">
                        <div className="p-3 bg-indigo-600/10 rounded-xl">
                            <ActivityIcon size={32} className="text-indigo-600" />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <h1 className="text-[14px] text-gray-600 font-semibold ">
                                Activities
                            </h1>
                            <p className="text-xl font-bold text-gray-900">
                                0
                            </p>
                        </div>
                    </GlassCard>
                    <GlassCard className="flex items-center justify-center gap-4 p-4 h-32 col-span-1 active:scale-95 duration-300 transition-all ease-in-out" >
                        <div className="p-3 bg-indigo-600/10 rounded-xl">
                            <LucideClock size={32} className="text-indigo-600" />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <h1 className="text-[14px] text-gray-600 font-semibold ">
                                Focus Time
                            </h1>
                            <p className="text-xl font-bold text-gray-900">
                                0 h
                            </p>
                        </div>
                    </GlassCard>
                 </div>
                 {/* behaviour tracking disini */}
                <GlassCard className="flex items-center col-span-3 h-full justify-start gap-2 p-6">
                    <BehaviourTracker />
                </GlassCard>
            </div>
            
            <div className="flex gap-6 items-center justify-start">
                 <div className="h-56 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-start gap-2 p-6 border border-indigo-300 dark:border-indigo-400 shadow shadow-indigo-400">
                    <CircularProgress percentage={60} size={100}  />
                    <div className="ml-8 hidden sm:block">
                        <p className="text-[10px] font-black uppercase tracking-widest dark:text-white/70 text-gray-600 mb-1">Status</p>
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
               <GlassCard className="flex items-center justify-start gap-2 p-6 h-56 col-span-1">
                        
                </GlassCard>
               <GlassCard className="flex items-center justify-start gap-2 p-6 h-56 col-span-1">
                        
                </GlassCard>
               <GlassCard className="flex items-center justify-start gap-2 p-6 h-56 col-span-1">
                        
                </GlassCard>
                
            </div>
        </div>

    </>
    );
}