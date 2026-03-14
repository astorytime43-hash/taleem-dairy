/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  BookOpen, 
  ClipboardList, 
  Camera, 
  Home, 
  Users, 
  ChevronLeft, 
  Star, 
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
type Screen = 'home' | 'add-activity' | 'view-records' | 'homework' | 'photos' | 'participation';

interface Activity {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
}

interface Homework {
  id: string;
  subject: string;
  task: string;
  dueDate: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', title: 'Morning Assembly', type: 'General', date: '2024-03-14', description: 'Students recited Hamd and Naat during the morning assembly.' },
    { id: '2', title: 'Classroom Activities', type: 'Academic', date: '2024-03-14', description: 'Students worked in groups to solve a science puzzle.' },
    { id: '3', title: 'Outdoor Activities', type: 'Sports', date: '2024-03-14', description: 'Physical training and sports in the school playground.' }
  ]);
  const [homeworks, setHomeworks] = useState<Homework[]>([
    { id: '1', subject: 'Urdu', task: 'Write an essay on "Mera Pyara Pakistan".', dueDate: '2024-03-15' },
    { id: '2', subject: 'English', task: 'Read the first chapter and write 5 difficult words.', dueDate: '2024-03-15' },
    { id: '3', subject: 'Math', task: 'Solve exercise 2.1 from the textbook.', dueDate: '2024-03-16' },
    { id: '4', subject: 'Science', task: 'Memorize the names of 5 domestic animals.', dueDate: '2024-03-16' }
  ]);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  // Components
  const Header = ({ title, showBack = true }: { title: string, showBack?: boolean }) => (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md px-6 py-4 flex items-center gap-4 border-b border-amber-100">
      {showBack && (
        <button 
          onClick={() => navigateTo('home')}
          className="p-2 rounded-full bg-amber-100 text-amber-600 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <h1 className="text-2xl font-bold text-slate-800 font-display">{title}</h1>
    </div>
  );

  const HomeScreen = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 space-y-8 pb-24"
    >
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-700 p-8 text-white shadow-xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Assalamu Alaikum, Teacher! 🌙</h2>
          <p className="opacity-90 text-lg">Ready for a wonderful day at school?</p>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
          <BookOpen size={120} />
        </div>
      </div>

      {/* Main Grid Actions */}
      <div className="grid grid-cols-2 gap-4">
        <ActionButton 
          icon={<PlusCircle size={32} />} 
          label="Add Activity" 
          color="bg-orange-500" 
          onClick={() => navigateTo('add-activity')}
        />
        <ActionButton 
          icon={<ClipboardList size={32} />} 
          label="View Record" 
          color="bg-green-600" 
          onClick={() => navigateTo('view-records')}
        />
        <ActionButton 
          icon={<BookOpen size={32} />} 
          label="Homework" 
          color="bg-blue-500" 
          onClick={() => navigateTo('homework')}
        />
        <ActionButton 
          icon={<Camera size={32} />} 
          label="Photos" 
          color="bg-yellow-500" 
          onClick={() => navigateTo('photos')}
        />
      </div>

      {/* Participation Quick Link */}
      <button 
        onClick={() => navigateTo('participation')}
        className="w-full bg-emerald-600 p-6 rounded-3xl text-white flex items-center justify-between shadow-lg active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl">
            <Users size={28} />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-xl">Student Participation</h3>
            <p className="text-sm opacity-80">Track who's shining today!</p>
          </div>
        </div>
        <Star className="text-yellow-300 fill-yellow-300" />
      </button>

      {/* Illustration Section */}
      <div className="rounded-3xl overflow-hidden shadow-md border-4 border-white">
        <img 
          src="https://picsum.photos/seed/pakistan-school/600/400" 
          alt="Happy Pakistani students" 
          className="w-full h-48 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="bg-white p-4 text-center">
          <p className="text-slate-600 italic font-medium">"Ilm hasil karna har musalman mard aur aurat par farz hai."</p>
        </div>
      </div>
    </motion.div>
  );

  const ActionButton = ({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`${color} p-6 rounded-3xl text-white flex flex-col items-center justify-center gap-3 shadow-lg active:scale-95 transition-all aspect-square`}
    >
      <div className="bg-white/20 p-3 rounded-2xl">
        {icon}
      </div>
      <span className="font-bold text-lg text-center leading-tight">{label}</span>
    </button>
  );

  const AddActivityScreen = () => (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pb-24"
    >
      <Header title="New Activity" />
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <label className="block text-lg font-bold text-slate-700">Activity Title</label>
          <input 
            type="text" 
            placeholder="e.g. Science Experiment" 
            className="w-full p-4 rounded-2xl border-2 border-amber-200 focus:border-orange-500 outline-none text-lg transition-colors"
          />
        </div>
        
        <div className="space-y-4">
          <label className="block text-lg font-bold text-slate-700">Category</label>
          <div className="flex flex-wrap gap-2">
            {['Academic', 'Sports', 'Art', 'Cultural', 'General'].map(cat => (
              <button key={cat} className="px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold hover:bg-orange-500 hover:text-white transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-bold text-slate-700">Details</label>
          <textarea 
            rows={4}
            placeholder="What did the students do?" 
            className="w-full p-4 rounded-2xl border-2 border-amber-200 focus:border-orange-500 outline-none text-lg transition-colors"
          />
        </div>

        <button 
          onClick={() => navigateTo('home')}
          className="w-full btn-primary bg-orange-500 mt-4"
        >
          <CheckCircle2 /> Save Activity
        </button>
      </div>
    </motion.div>
  );

  const ViewRecordsScreen = () => (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pb-24"
    >
      <Header title="Class Records" />
      <div className="p-6 space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="bg-white p-5 rounded-3xl shadow-md border-l-8 border-green-500 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xl text-slate-800">{activity.title}</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold uppercase">{activity.type}</span>
            </div>
            <p className="text-slate-600">{activity.description}</p>
            <div className="flex items-center gap-2 text-slate-400 text-sm pt-2">
              <Calendar size={14} />
              <span>{activity.date}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const HomeworkScreen = () => (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pb-24"
    >
      <Header title="Daily Homework" />
      <div className="p-6 space-y-6">
        <button className="w-full py-4 rounded-2xl bg-blue-100 text-blue-700 font-bold border-2 border-dashed border-blue-300 flex items-center justify-center gap-2">
          <PlusCircle size={20} /> Assign New Homework
        </button>

        <div className="space-y-4">
          {homeworks.map(hw => (
            <div key={hw.id} className="bg-white p-5 rounded-3xl shadow-md border-l-8 border-blue-500">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-xl text-blue-700">{hw.subject}</h3>
                <span className="text-sm font-medium text-slate-400">Due: {hw.dueDate}</span>
              </div>
              <p className="text-slate-700 text-lg">{hw.task}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const PhotosScreen = () => (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pb-24"
    >
      <Header title="Class Gallery" />
      <div className="p-6 grid grid-cols-2 gap-4">
        <button className="col-span-2 bg-yellow-500 p-6 rounded-3xl text-white font-bold flex items-center justify-center gap-3 shadow-lg">
          <Camera size={28} /> Take New Photo
        </button>
        
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-sm">
            <img 
              src={`https://picsum.photos/seed/school-${i}/300/300`} 
              alt="Class moment" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );

  const ParticipationScreen = () => (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pb-24"
    >
      <Header title="Star Students" />
      <div className="p-6 space-y-6">
        <div className="bg-emerald-100 p-6 rounded-3xl text-emerald-800 flex items-center gap-4">
          <div className="bg-emerald-600 p-3 rounded-2xl text-white">
            <Award size={32} />
          </div>
          <div>
            <h3 className="font-bold text-xl">Participation Tracker</h3>
            <p className="text-sm opacity-80">Tap a student to award a star!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {['Ahmed Ali', 'Fatima Bibi', 'Muhammad Zaid', 'Zainab Khan', 'Bilal Hassan'].map((name, i) => (
            <div key={name} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${['bg-orange-400', 'bg-blue-400', 'bg-green-600', 'bg-emerald-400', 'bg-yellow-400'][i]}`}>
                  {name[0]}
                </div>
                <span className="font-bold text-slate-700">{name}</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map(star => (
                  <Star key={star} size={20} className={star <= (i % 3 + 1) ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen max-w-md mx-auto bg-amber-50 relative shadow-2xl overflow-hidden font-sans bg-pattern">
      {/* Background Illustrations (Abstract placeholders) */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10"><BookOpen size={100} /></div>
        <div className="absolute bottom-40 right-10"><Users size={120} /></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><Star size={200} /></div>
      </div>

      <AnimatePresence mode="wait">
        {currentScreen === 'home' && <HomeScreen key="home" />}
        {currentScreen === 'add-activity' && <AddActivityScreen key="add" />}
        {currentScreen === 'view-records' && <ViewRecordsScreen key="view" />}
        {currentScreen === 'homework' && <HomeworkScreen key="hw" />}
        {currentScreen === 'photos' && <PhotosScreen key="photos" />}
        {currentScreen === 'participation' && <ParticipationScreen key="participation" />}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-amber-100 px-8 py-4 flex justify-between items-center z-50 rounded-t-[40px] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)]">
        <NavButton active={currentScreen === 'home'} icon={<Home />} onClick={() => navigateTo('home')} />
        <NavButton active={currentScreen === 'view-records'} icon={<ClipboardList />} onClick={() => navigateTo('view-records')} />
        <div className="relative -top-8">
          <button 
            onClick={() => navigateTo('add-activity')}
            className="bg-orange-500 text-white p-5 rounded-full shadow-xl active:scale-90 transition-transform border-8 border-amber-50"
          >
            <PlusCircle size={28} />
          </button>
        </div>
        <NavButton active={currentScreen === 'homework'} icon={<BookOpen />} onClick={() => navigateTo('homework')} />
        <NavButton active={currentScreen === 'participation'} icon={<Users />} onClick={() => navigateTo('participation')} />
      </nav>
    </div>
  );
}

const NavButton = ({ active, icon, onClick }: { active: boolean, icon: React.ReactNode, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-2 rounded-2xl transition-all ${active ? 'bg-orange-100 text-orange-600 scale-110' : 'text-slate-400'}`}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 24 })}
  </button>
);
