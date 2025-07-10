import { TrendingUp, Users, Activity, BarChart3 } from "lucide-react";
import { useSelector } from "react-redux";

export default function Home() {
  const { followers, engagementRate, postViews, reach } = useSelector((state) => state.social);
  
  const stats = [
    { title: "Follower Totali", value: `${(followers / 1000).toFixed(1)}K`, icon: Users, change: "+12%" },
    { title: "Engagement Rate", value: `${engagementRate}%`, icon: Activity, change: "+5%" },
    { title: "Post Views", value: `${(postViews / 1000).toFixed(1)}K`, icon: TrendingUp, change: "+18%" },
    { title: "Reach", value: `${(reach / 1000).toFixed(1)}K`, icon: BarChart3, change: "+22%" }
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard Home</h1>
      <p className="text-gray-300 mb-8">Benvenuto nel tuo pannello di controllo social media</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-green-400 text-sm">{stat.change}</p>
              </div>
              <stat.icon className="w-8 h-8 text-green-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  