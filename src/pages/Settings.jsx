import { Bell, Shield, Palette, Globe } from "lucide-react";

export default function Settings() {
  const settings = [
    { title: "Notifiche", icon: Bell, description: "Gestisci le notifiche push" },
    { title: "Privacy", icon: Shield, description: "Impostazioni privacy e sicurezza" },
    { title: "Tema", icon: Palette, description: "Personalizza l'aspetto dell'app" },
    { title: "Lingua", icon: Globe, description: "Cambia lingua dell'interfaccia" }
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>
      <p className="text-gray-300 mb-8">Gestisci le impostazioni del tuo account</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map((setting, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <setting.icon className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-lg font-semibold">{setting.title}</h3>
                <p className="text-gray-400">{setting.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
