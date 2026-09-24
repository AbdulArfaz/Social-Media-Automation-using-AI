import { useEffect, useState } from "react";
import { dummyPostsData, PLATFORMS } from "../assets/assets";
import {
  ArrowRightIcon,
  CalculatorIcon,
  CalendarDaysIcon,
  ClockIcon,
  SendIcon,
  XIcon,
} from "lucide-react";
import { toast } from 'sonner'
import api from "../api/axios.js";

const Scheduler = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [mediaFile, setMediaFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts',{
         headers: {
          'Content-Type': 'multipart/form-data'
        }
        })
      const postsArray = response.data?.data || response.data
      setPosts(Array.isArray(postsArray) ? postsArray : [])
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  };

  useEffect(() => {
    (async () => await fetchPosts())();
    const interval = setInterval(async () => await fetchPosts(), 5000);
    return () => clearInterval(interval);
  }, []);

  const scheduled = posts.filter((p) => p.status === "scheduled");
  const published = posts.filter((p) => p.status === "published");

  const togglePlatform = (id) =>
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  const handleSchedule = async (e) => {
    e.preventDefault();
    if(selectedPlatforms.length === 0){
      toast.error('Select atleast one platform')
      return;
    }
    if(!scheduledDate || !scheduledTime){
      toast.error('Select date and time')
      return;
    }
    if(selectedPlatforms.includes('instagram') && !mediaFile){
      toast.error('Requires an Image or Video for Instagram')
      return;
    }

    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
    const formData = new FormData();
    formData.append('content', content)
    formData.append('scheduledFor', scheduledFor)
    formData.append('status', 'scheduled')
    formData.append('platforms', JSON.stringify(selectedPlatforms))
    if(mediaFile){
      formData.append('media', mediaFile)
    }
    setLoading(true)

    try {
      await api.post('/api/posts', formData)
      toast.success('Post Scheduled')
      setContent('')
      setScheduledDate('')
      setScheduledTime('')
      setSelectedPlatforms([])
      setMediaFile(null)
      fetchPosts()
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a1128] via-[#0b2b26] to-[#041c18] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white/4 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Compose Post</h2>
            </div>

            <form onSubmit={handleSchedule} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white">
                  Platforms
                </label>
                <div className="flex flex-wrap gap-3">
                  {PLATFORMS.map((p) => {
                    const active = selectedPlatforms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePlatform(p.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-semibold text-sm ${
                          active
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-900/20"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <p.icon />
                        <span>{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white">
                  Content
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="What you want to share today?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
                <div
                  className={`text-xs text-right font-semibold ${content.length > 270 ? "text-red-400" : "text-slate-400"}`}
                >
                  {content.length}/280
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white">
                  Media (optional)
                </label>
                {mediaFile ? (
                  <div className="relative bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-4">
                    {mediaFile.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(mediaFile)}
                        alt="preview"
                        className="max-h-48 rounded-lg object-contain"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(mediaFile)}
                        controls
                        className="max-h-48 rounded-lg"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setMediaFile(null)}
                      className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-white/10 hover:border-emerald-500/50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-black/20 transition-all group">
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white text-center">
                      Click to upload image or video
                    </span>
                    <input
                      type="file"
                      accept="image/,video/"
                      onChange={(e) =>
                        e.target.files?.[0] && setMediaFile(e.target.files[0])
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">
                    Date
                  </label>
                  <div className="flex items-center bg-black/30 border border-white/10 rounded-xl px-4 py-3 gap-3 focus-within:border-emerald-500 transition-colors">
                    <input
                      type="date"
                      required
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-transparent text-white font-semibold focus:outline-none scheme:dark"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">
                    Time
                  </label>
                  <div className="flex items-center bg-black/30 border border-white/10 rounded-xl px-4 py-3 gap-3 focus-within:border-emerald-500 transition-colors">
                    <input
                      type="time"
                      required
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full bg-transparent text-white font-semibold focus:outline-none scheme:dark"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Scheduling...</span>
                ) : (
                  <>
                    <span>Schedule Post</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/4 backdrop-blur-xl p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <h3 className="font-semibold">Upcoming</h3>
                </div>

                <span className="bg-blue-500/40 border border-blue-500/30 text-blue-400 text-sm px-2.5 py-0.5 rounded-full font-semibold">
                  {scheduled.length}
                </span>
              </div>

              <div className="space-y-3 max-h-87.5 overflow-y-auto pr-1">
                {scheduled.length === 0 ? (
                  <p className="text-sm font-semibold text-slate-400 text-center py-6">
                    No posts scheduled yet
                  </p>
                ) : (
                  scheduled.map((post) => (
                    <div
                      key={post._id}
                      className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <div className="flex gap-1.5">
                          {post.platforms?.map((plat) => {
                            const meta = PLATFORMS.find((p) => p.id === plat);
                            return meta ? <meta.icon key={plat} /> : null;
                          })}
                        </div>
                        <span>
                          {new Date(post.scheduledFor).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-200 line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white/4 backdrop-blur-xl p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <h3 className="font-semibold">Published</h3>
                </div>

                <span className="bg-purple-500/40 border border-purple-500/30 text-purple-300 text-sm px-2.5 py-0.5 rounded-full font-semibold">
                  {published.length}
                </span>
              </div>

              <div className="space-y-3 max-h-87.5 overflow-y-auto pr-1">
                {published.length === 0 ? (
                  <p className="text-sm font-semibold text-slate-400 text-center py-6">
                    No Published posts yet
                  </p>
                ) : (
                  published.map((post) => (
                    <div
                      key={post._id}
                      className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-2 opacity-90"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <div className="flex gap-1.5">
                          {post.platforms.map((plat) => {
                            const meta = PLATFORMS.find((p) => p.id === plat);
                            return meta ? <meta.icon key={plat} /> : null;
                          })}
                        </div>
                        <span className="text-emerald-400 font-semibold">
                          Published
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-300 line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
