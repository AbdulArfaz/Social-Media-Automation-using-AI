import {
  CheckCircleIcon,
  PlusCircleIcon,
  ExternalLinkIcon,
  XIcon,
} from "lucide-react";
import { PLATFORMS } from "../../assets/assets";

const PlatformPickerModel = ({
  connectedIds,
  connecting,
  onClose,
  onConnect,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl p-px rounded-3xl bg-linear-to-b from-white/20 via-white/5 to-transparent shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="relative w-full bg-[#0b0f19]/90 backdrop-blur-2xl rounded-[23px] p-6 sm:p-8 text-white flex flex-col max-h-[85vh] overflow-hidden">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <h3 className="text-xl font-semibold tracking-tight text-white">
              Choose a Platform
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              title="Close modal"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            {PLATFORMS.map((p) => {
              const isConnected = connectedIds.includes(p.id);
              const isConnecting = connecting === p.id;

              return (
                <button
                  key={p.id}
                  onClick={() =>
                    !isConnected && !isConnecting && onConnect(p.id)
                  }
                  disabled={isConnected || isConnecting}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 group ${
                    isConnected
                      ? "bg-emerald-950/25 border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(16,185,129,0.1)]"
                      : "bg-white/3 border-white/10 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] cursor-pointer"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-xl p-2.5 transition-colors border ${
                        isConnected
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-white/5 border-white/10 text-white group-hover:border-white/20"
                      }`}
                    >
                      <p.icon className="w-full h-full object-contain" />
                    </div>

                    <div>
                      <div className="text-sm font-medium text-white tracking-wide">
                        {p.name}
                      </div>
                      <div
                        className={`text-xs mt-0.5 ${isConnected ? "text-emerald-400/90 font-medium" : "text-white/50"}`}
                      >
                        {isConnected ? "Already Connected" : p.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center pl-3">
                    {isConnected ? (
                      <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/20">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Connected</span>
                      </div>
                    ) : isConnecting ? (
                      <div className="flex items-center space-x-1.5 text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full text-xs font-medium border border-indigo-500/20">
                        <Loader2Icon className="w-4 h-4 animate-spin" />
                        <span>Connecting</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1.5 text-white/80 group-hover:text-white bg-white/5 group-hover:bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 transition-all">
                        <span>Connect</span>
                        <PlusCircleIcon className="w-4 h-4 text-white/60 group-hover:text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformPickerModel;
