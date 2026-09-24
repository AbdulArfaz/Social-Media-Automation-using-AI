import { useState, useEffect } from "react";
import { PLATFORMS } from "../assets/assets";
import api from "../api/axios.js";
import { toast } from "sonner";
import {
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  HistoryIcon,
  Loader2Icon,
  TimerIcon,
  Wand2Icon,
  XIcon,
} from "lucide-react";

const AIComposer = () => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState([]);

  const [activeScheduler, setActiveScheduler] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduling, setScheduling] = useState(false);

  const fetchGenerations = async () => {
    try {
      const response = await api.get("/api/posts/generations");
      const postsArray = response.data?.data || response.data;
      setGenerations(postsArray);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchGenerations();
  }, []);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please Enter Prompt");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/posts/generate", {
        prompt,
        tone,
        generateImage,
      });
      setGenerations([response.data, ...generations]);
      setActiveScheduler(response.data);
      toast.success("Content generated");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!activeScheduler) return;
    if (selectedPlatforms.length === 0) {
      toast.error("Select atleast one Platform");
      return;
    }
    if (!scheduledDate || !scheduledTime) {
      toast.error("Select date and time");
      return;
    }

    const scheduledFor = new Date(
      `${scheduledDate}T${scheduledTime}`
    ).toISOString();
    setScheduling(true);

    const formData = new FormData();
    formData.append("content", activeScheduler.content);
    formData.append("scheduledFor", scheduledFor);
    formData.append("status", "scheduled");

    // Send platforms as a JSON string so your backend's parser (lines 173-177) can read it
    formData.append("platforms", JSON.stringify(selectedPlatforms));

    // If there is an optional media file attached, append it too
    if (activeScheduler.mediaFile) {
      formData.append("media", activeScheduler.mediaFile);
    }

    try {
      await api.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Ai Post scheduled");
      setActiveScheduler(null);
      setScheduledDate("");
      setScheduledTime("");
      setSelectedPlatforms([]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Schedule");
    } finally {
      setScheduling(false);
    }
  };

  const tones = ["Professional", "Creative", "Funny", "Minimalist", "Excited"];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a1128] via-[#0b2b26] to-[#041c18] text-white/50 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white/4 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What should we create today?
            </h1>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <textarea
                placeholder="Share your idea... (e.g., A post about your daily updates)"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 bg-black/30 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setGenerateImage(!generateImage)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                  AI Image
                </span>
                <div
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 shadow-inner p-0.5 ${generateImage ? "bg-linear-to-r from-blue-600 to-indigo-500" : "bg-white/10 border border-white/10"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${generateImage ? "translate-x-6" : "translate-x-0"}`}
                  />
                </div>
              </button>

              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${
                      tone === t
                        ? "bg-blue-600/30 text-blue-300 border-blue-500/60 shadow-lg shadow-blue-500/20"
                        : "bg-white/4 text-white/50 border-white/5 hover:bg-white/10 hover:text-white/80"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handleGenerate}
              className="w-full mt-4 py-4 px-6 rounded-2xl bg-linear-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white font-semibold shadow-xl shadow-blue-950/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>Generate Content</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/4 border border-white/10 text-blue-400">
                <HistoryIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Recent Generations
              </h2>
            </div>
            <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-white/4 border border-white/10 text-white/50 font-medium">
              {generations.length} total
            </span>
          </div>

          {generations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generations.map((gen, index) => (
                <div
                  key={gen._id || index}
                  className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all shadow-xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>
                        {new Date(gen.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                        {gen.tone}
                      </span>
                    </div>

                    <p className="text-white/50 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {gen.content}
                    </p>

                    {gen.mediaUrl && (
                      <div className="overflow-hidden rounded-2xl border border-white/10 aspect-video">
                        <img
                          src={gen.mediaUrl}
                          alt="Gen preview"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveScheduler(gen)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/4 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Schedule Post</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/3 backdrop-blur-md rounded-3xl border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/4 border border-white/10 flex items-center justify-center mx-auto text-white/40">
                <Wand2Icon className="w-6 h-6" />
              </div>
              <p className="text-white/50 text-sm sm:text-base max-w-sm mx-auto">
                No content generated yet. Try generating some content using the
                AI above.
              </p>
            </div>
          )}
        </div>

        {activeScheduler && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#0b1329] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Schedule Generation
                </h3>
                <button
                  onClick={() => setActiveScheduler(null)}
                  className="p-2 rounded-xl bg-white/4 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2 max-h-36 overflow-y-auto">
                <p className="text-xs text-white/40 font-medium">
                  Selected Prompt:{" "}
                  {activeScheduler.prompt || "AI Content Draft"}
                </p>
                <p className="text-white/50 text-sm">
                  {activeScheduler.content}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/50">
                  Select Channels
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PLATFORMS.map((p) => {
                    const active = selectedPlatforms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSelectedPlatforms((prev) =>
                            prev.includes(p.id)
                              ? prev.filter((x) => x !== p.id)
                              : [...prev, p.id]
                          );
                        }}
                        style={{
                          borderColor: active
                            ? p.color
                            : "rgba(255,255,255,0.1)",
                        }}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2.5 transition-all cursor-pointer ${
                          active
                            ? "bg-white/10 shadow-lg"
                            : "bg-white/4 hover:bg-white/10 opacity-70 hover:opacity-100"
                        }`}
                      >
                        {p.icon && <p.icon className="w-5 h-5 text-white" />}
                        <span className="text-xs font-medium text-white/70">
                          {p.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/30 border border-white/10">
                  <CalendarIcon className="w-5 h-5 text-white/40" />
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="bg-transparent text-white text-sm focus:outline-none w-full scheme:dark"
                  />
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/30 border border-white/10">
                  <ClockIcon className="w-5 h-5 text-white/40" />
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="bg-transparent text-white text-sm focus:outline-none w-full scheme:dark"
                  />
                </div>
              </div>

              <button
                onClick={handleSchedule}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {scheduling ? (
                  <Loader2Icon className="w-5 h-5 animate-spin" />
                ) : (
                  <TimerIcon className="w-5 h-5" />
                )}
                <span>Confirm Schedule</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIComposer;
