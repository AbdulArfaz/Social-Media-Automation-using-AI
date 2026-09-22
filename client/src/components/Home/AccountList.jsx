import { AlertCircleIcon, CheckCircleIcon, PlusIcon, UnplugIcon } from "lucide-react";
import { PLATFORMS } from "../../assets/assets";


const AccountList = ({ accounts, onDisconnect }) => {

  const handleDisconnect = async (accountId) => {
    const confirm = window.confirm(
      "Are you sure you want to disconnect this account?"
    );

    if (!confirm) return;

    await onDisconnect(accountId);
  };

   if (accounts.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border  border-white/20 bg-white/10 backdrop-blur-xl p-8 sm:p-12 text-center shadow-2xl hover:shadow-xl transition-all duration-300">
      
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg mb-6">
        <PlusIcon size={36} />
      </div>

      <p className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
        No accounts connected
      </p>

      <p className="max-w-md text-sm sm:text-base text-slate-500 leading-relaxed">
        Connect your first social platform to start scheduling and
        automating your content.
      </p>
      
    </div>
  );
}

  return (
 <div className="max-w-4xl mx-auto p-4 space-y-4">
      {accounts.map((account, index) => {
        const meta = PLATFORMS.find((p) => p.id === account.platform);
        if (!meta) return null;

        const isConnected = account.status === 'connected';

        return (
          <div 
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow gap-4"
          >
          
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 p-2 text-gray-700">
                <meta.icon className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{account.handle}</div>
                <div className="text-sm text-gray-800">{meta.name}</div>
              </div>
            </div>

           
            <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
              {isConnected ? (
                <div className="flex items-center space-x-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-medium">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-xs font-medium">
                  <AlertCircleIcon className="w-4 h-4" />
                  <span>Disconnected</span>
                </div>
              )}

              <button 
                onClick={() => handleDisconnect(account._id)}
                title="Disconnect account"
                className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <UnplugIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccountList
