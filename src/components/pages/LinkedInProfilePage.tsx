import { useState } from 'react';
import { Button, Card } from '../ui';

interface LinkedInProfilePageProps {
  onNavigate: (view: any) => void;
}

export function LinkedInProfilePage({ onNavigate }: LinkedInProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'skills' | 'achievements' | 'activity'>('about');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const profile = {
    name: 'Ahmed Hassan',
    title: 'Full-Stack Developer | E-commerce Specialist | 5+ Years Experience',
    avatar: '👨‍💻',
    banner: 'from-indigo via-violet to-amber',
    location: 'Dubai, UAE',
    connections: 847,
    followers: 1234,
    about: `Passionate full-stack developer with 5+ years of experience building scalable e-commerce solutions. Specialized in React, Node.js, and cloud architecture.

🎯 Outcome-driven developer with 94% mission success rate
💼 Delivered $2.3M+ in business value across 120+ missions
🌍 Worked with clients across 15+ countries
⚡ Average delivery 3.2 days early

Core expertise:
• E-commerce platforms (Shopify, WooCommerce, Custom)
• Payment integration (Stripe, PayPal, Razorpay)
• Cloud architecture (AWS, GCP, Azure)
• Team leadership & mentoring`,
    skills: [
      { name: 'React', level: 95, endorsements: 127, verified: true },
      { name: 'Node.js', level: 92, endorsements: 98, verified: true },
      { name: 'TypeScript', level: 90, endorsements: 85, verified: true },
      { name: 'E-commerce', level: 94, endorsements: 112, verified: true },
      { name: 'AWS', level: 85, endorsements: 67, verified: true },
      { name: 'PostgreSQL', level: 88, endorsements: 74, verified: false },
      { name: 'GraphQL', level: 82, endorsements: 56, verified: false },
      { name: 'Docker', level: 80, endorsements: 48, verified: false },
    ],
    experience: [
      {
        id: 1,
        role: 'Senior Full-Stack Developer',
        company: 'Freelance (Skillhub)',
        duration: '2020 - Present',
        logo: '💻',
        description: 'Leading e-commerce development projects for global clients',
        outcomes: [
          'Delivered 45+ e-commerce missions with 96% success rate',
          'Average project value: $18,000',
          'Built platforms generating $5M+ in annual revenue for clients',
        ],
      },
      {
        id: 2,
        role: 'Full-Stack Developer',
        company: 'Tech Solutions LLC',
        duration: '2018 - 2020',
        logo: '🏢',
        description: 'Developed scalable web applications for enterprise clients',
        outcomes: [
          'Led team of 5 developers',
          'Reduced deployment time by 60%',
          'Improved application performance by 40%',
        ],
      },
      {
        id: 3,
        role: 'Junior Developer',
        company: 'Startup Hub',
        duration: '2017 - 2018',
        logo: '🚀',
        description: 'Built MVPs for early-stage startups',
        outcomes: [
          'Delivered 12 successful MVPs',
          '3 startups secured funding after launch',
          'Learned agile methodologies',
        ],
      },
    ],
    achievements: [
      { id: 1, title: 'Top Rated Plus', icon: '🏆', description: 'Top 1% of developers on Skillhub', date: '2024' },
      { id: 2, title: '100 Missions', icon: '💯', description: 'Completed 100+ missions', date: '2023' },
      { id: 3, title: 'E-commerce Specialist', icon: '🛒', description: 'Verified e-commerce expert', date: '2023' },
      { id: 4, title: 'Fast Delivery', icon: '⚡', description: 'Average 3 days early delivery', date: '2024' },
      { id: 5, title: '5-Star Rating', icon: '⭐', description: 'Maintained 5.0 rating for 1 year', date: '2024' },
      { id: 6, title: 'Cloud Certified', icon: '☁️', description: 'AWS Solutions Architect', date: '2022' },
    ],
    recommendations: [
      {
        id: 1,
        from: 'Sarah Chen',
        role: 'CEO, Fashion Brand',
        avatar: '👩‍💼',
        text: 'Ahmed delivered our e-commerce platform 2 weeks ahead of schedule. The quality was exceptional and our sales increased by 40% in the first month. Highly recommended!',
        date: '2 weeks ago',
      },
      {
        id: 2,
        from: 'Michael Rodriguez',
        role: 'CTO, Tech Startup',
        avatar: '👨‍💼',
        text: 'Working with Ahmed was a pleasure. His technical expertise and communication skills are outstanding. He understood our requirements perfectly and delivered beyond expectations.',
        date: '1 month ago',
      },
      {
        id: 3,
        from: 'Emma Thompson',
        role: 'Founder, E-commerce Store',
        avatar: '👩',
        text: 'Ahmed transformed our outdated website into a modern, high-converting e-commerce platform. His attention to detail and problem-solving skills are remarkable.',
        date: '2 months ago',
      },
    ],
    activity: [
      { id: 1, type: 'mission', text: 'Completed mission: "Launch E-commerce Store"', time: '2 days ago', icon: '✅' },
      { id: 2, type: 'skill', text: 'Earned endorsement for "React" from Sarah Chen', time: '3 days ago', icon: '🎯' },
      { id: 3, type: 'achievement', text: 'Achieved "Top Rated Plus" badge', time: '1 week ago', icon: '🏆' },
      { id: 4, type: 'recommendation', text: 'Received recommendation from Michael Rodriguez', time: '1 month ago', icon: '💬' },
      { id: 5, type: 'mission', text: 'Started mission: "Payment Gateway Integration"', time: '1 month ago', icon: '🚀' },
    ],
    stats: {
      missionsCompleted: 127,
      successRate: 94,
      totalEarnings: 2300000,
      avgRating: 4.9,
      responseTime: '< 2 hours',
      deliveryEarly: 3.2,
    },
    certifications: [
      { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: 2022, icon: '☁️' },
      { name: 'React Developer', issuer: 'Meta', year: 2021, icon: '⚛️' },
      { name: 'Node.js Developer', issuer: 'OpenJS Foundation', year: 2020, icon: '🟢' },
    ],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Arabic', proficiency: 'Native' },
      { name: 'Hindi', proficiency: 'Professional' },
    ],
  };

  return (
    <div className="min-h-screen bg-cream pt-20 pb-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        {/* Profile Header */}
        <Card className="overflow-hidden p-0">
          {/* Banner */}
          <div className={`h-48 bg-gradient-to-r ${profile.banner} relative`}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute right-4 top-4 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
            >
              {isEditing ? 'Save' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="-mt-16 mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-indigo to-violet text-6xl shadow-xl">
              {profile.avatar}
            </div>

            {/* Name & Title */}
            <h1 className="font-display text-4xl font-black text-midnight">{profile.name}</h1>
            <p className="mt-2 text-lg text-midnight/70">{profile.title}</p>
            <p className="mt-1 text-sm text-midnight/50">{profile.location} · {profile.connections} connections</p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-6">
              {[
                { label: 'Missions', value: profile.stats.missionsCompleted, icon: '🎯' },
                { label: 'Success Rate', value: `${profile.stats.successRate}%`, icon: '✅' },
                { label: 'Earnings', value: `$${(profile.stats.totalEarnings / 1000000).toFixed(1)}M`, icon: '💰' },
                { label: 'Rating', value: profile.stats.avgRating, icon: '⭐' },
                { label: 'Response', value: profile.stats.responseTime, icon: '⚡' },
                { label: 'Early Delivery', value: `${profile.stats.deliveryEarly}d`, icon: '🚀' },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl bg-cream p-4 text-center">
                  <span className="text-2xl">{stat.icon}</span>
                  <p className="mt-2 font-display text-2xl font-bold text-midnight">{stat.value}</p>
                  <p className="font-mono text-xs text-midnight/60">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <Button variant="primary">Connect</Button>
              <Button variant="outline">Message</Button>
              <Button variant="outline">More</Button>
            </div>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto rounded-2xl border-2 border-midnight/10 bg-white p-2">
          {[
            { id: 'about' as const, label: 'About', icon: '👤' },
            { id: 'experience' as const, label: 'Experience', icon: '💼' },
            { id: 'skills' as const, label: 'Skills', icon: '🎯' },
            { id: 'achievements' as const, label: 'Achievements', icon: '🏆' },
            { id: 'activity' as const, label: 'Activity', icon: '📊' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo to-violet text-white shadow-lg'
                  : 'text-midnight/60 hover:bg-mist'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 space-y-6">
          {/* About Tab */}
          {activeTab === 'about' && (
            <>
              {/* About Section */}
              <Card>
                <h2 className="mb-4 font-display text-2xl font-bold text-midnight">About</h2>
                <p className="whitespace-pre-line text-midnight/70 leading-relaxed">{profile.about}</p>
              </Card>

              {/* Certifications */}
              <Card>
                <h2 className="mb-4 font-display text-2xl font-bold text-midnight">Certifications</h2>
                <div className="space-y-3">
                  {profile.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-2xl border border-midnight/10 bg-cream p-4">
                      <span className="text-3xl">{cert.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-midnight">{cert.name}</p>
                        <p className="text-sm text-midnight/60">{cert.issuer} · {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Languages */}
              <Card>
                <h2 className="mb-4 font-display text-2xl font-bold text-midnight">Languages</h2>
                <div className="space-y-3">
                  {profile.languages.map((lang, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl border border-midnight/10 bg-cream p-4">
                      <p className="font-semibold text-midnight">{lang.name}</p>
                      <span className="rounded-full bg-indigo/10 px-3 py-1 font-mono text-xs font-semibold text-indigo">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommendations */}
              <Card>
                <h2 className="mb-4 font-display text-2xl font-bold text-midnight">Recommendations</h2>
                <div className="space-y-4">
                  {profile.recommendations.map((rec) => (
                    <div key={rec.id} className="rounded-2xl border border-midnight/10 bg-cream p-5">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-3xl">{rec.avatar}</span>
                        <div>
                          <p className="font-semibold text-midnight">{rec.from}</p>
                          <p className="text-sm text-midnight/60">{rec.role}</p>
                        </div>
                        <span className="ml-auto font-mono text-xs text-midnight/40">{rec.date}</span>
                      </div>
                      <p className="text-midnight/70 italic">"{rec.text}"</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <Card>
              <h2 className="mb-6 font-display text-2xl font-bold text-midnight">Experience</h2>
              <div className="space-y-6">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-indigo pl-6">
                    <div className="mb-3 flex items-start gap-4">
                      <span className="text-4xl">{exp.logo}</span>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-bold text-midnight">{exp.role}</h3>
                        <p className="text-midnight/70">{exp.company}</p>
                        <p className="font-mono text-sm text-midnight/50">{exp.duration}</p>
                      </div>
                    </div>
                    <p className="mb-3 text-midnight/70">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-1 text-emerald">✓</span>
                          <p className="text-sm text-midnight/70">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <Card>
              <h2 className="mb-6 font-display text-2xl font-bold text-midnight">Skills & Endorsements</h2>
              <div className="space-y-4">
                {profile.skills.map((skill, i) => (
                  <div key={i} className="rounded-2xl border border-midnight/10 bg-cream p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-midnight">{skill.name}</p>
                        {skill.verified && (
                          <span className="rounded-full bg-emerald/10 px-2 py-0.5 font-mono text-xs font-semibold text-emerald">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-sm text-midnight/60">{skill.endorsements} endorsements</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-mist">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo to-violet"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm font-semibold text-midnight">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <Card>
              <h2 className="mb-6 font-display text-2xl font-bold text-midnight">Achievements & Badges</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {profile.achievements.map((achievement) => (
                  <div key={achievement.id} className="rounded-2xl border-2 border-amber/30 bg-amber/5 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-4xl">{achievement.icon}</span>
                      <div>
                        <p className="font-display text-lg font-bold text-midnight">{achievement.title}</p>
                        <p className="font-mono text-xs text-midnight/50">{achievement.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-midnight/70">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <Card>
              <h2 className="mb-6 font-display text-2xl font-bold text-midnight">Recent Activity</h2>
              <div className="space-y-4">
                {profile.activity.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 rounded-2xl border border-midnight/10 bg-cream p-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-midnight/70">{item.text}</p>
                      <p className="mt-1 font-mono text-xs text-midnight/40">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
