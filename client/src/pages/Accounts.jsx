import { useEffect, useState } from "react";
import { dummyAccountsData, PLATFORMS } from "../assets/assets";
import { PlusIcon } from "lucide-react";
import AccountList from "../components/Home/AccountList";
import PlatformPickerModel from "../components/Home/PlatformPickerModel";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [connecting, setConnecting] = useState(null);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);

  const fetchAccounts = async (
    isSync = false,
    platform = null,
    successMessage = "",
  ) => {
    setAccounts(dummyAccountsData);
    console.log(isSync, platform, successMessage);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleConnect = async (platformId) => {
    setConnecting(platformId);
    setTimeout(() => {
      setConnecting(null);
      setAccounts((prev) => [...prev, dummyAccountsData[0]]);
      setShowPlatformPicker(false);
    }, 1000);
  };

  const handleDisconnect = async (accountId) => {
    setAccounts(accounts.filter((a) => a.id !== accountId));
  };

  const connectedIds = accounts.map((a) => a.platform);

  return (
   <div className="min-h-screen bg-linear-to-br from-[#0a1128] via-[#0b2b26] to-[#041c18] text-white p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-white/4 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Connected Accounts
            </h2>
            <p className="text-sm text-emerald-400/90 mt-1 font-medium">
              {accounts.length} of {PLATFORMS.length} platforms connected
            </p>
          </div>
          
          <button 
            onClick={() => setShowPlatformPicker(true)}
            className="inline-flex items-center justify-center space-x-2 bg-linear-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 active:scale-95 text-white font-medium px-6 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer border border-emerald-400/30"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Connect Account</span>
          </button>
        </div>

        {/* Platform Picker Modal */}
        {showPlatformPicker && (
          <PlatformPickerModel 
            connectedIds={connectedIds}
            connecting={connecting}
            onClose={() => setShowPlatformPicker(false)}
            onConnect={handleConnect}
          />
        )}

        {/* Connected Accounts List */}
        <div className="bg-white/2 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-xl">
          <AccountList 
            accounts={accounts} 
            onDisconnect={handleDisconnect} 
          />
        </div>

      </div>
    </div>
  );
};

export default Accounts;
