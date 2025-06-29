import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, MapPin, Calendar, Users, MessageSquare, Heart } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    title: "Senior Solar Engineer",
    company: "British Solar Technologies",
    expertise: ["Solar Energy", "Power Systems", "Research"],
    rating: 4.9,
    sessions: 127,
    location: "Manchester, UK",
    available: "Online",
    bio: "15+ years in solar energy with expertise in large-scale installations across the UK.",
    backstory: "After witnessing the rapid decline of coal mining in Northern England, I pivoted my career from traditional engineering to renewable energy. I became a mentor because I believe every young engineer deserves guidance to navigate the green energy transition - something I had to figure out alone. My mission is to help others avoid the career pitfalls I encountered while building a sustainable future for Britain."
  },
  {
    id: 2,
    name: "James MacLeod",
    title: "Offshore Wind Consultant",
    company: "ScotWind Solutions",
    expertise: ["Wind Energy", "Project Management", "Marine Engineering"],
    rating: 4.8,
    sessions: 89,
    location: "Edinburgh, UK",
    available: "Online",
    bio: "Specialist in offshore wind projects around the Scottish coast and North Sea installations.",
    backstory: "Growing up on the Shetland Islands, I watched traditional fishing communities struggle as waters changed. When I started working on offshore wind farms, I saw how renewable energy could revitalize coastal communities. I mentor because I want to share how engineering can create jobs and hope in areas that have been left behind by industrial change. Every mentee represents a chance to build both careers and communities."
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "Sustainability Director",
    company: "EcoTech Industries London",
    expertise: ["Corporate Sustainability", "ESG", "Net Zero Strategy"],
    rating: 4.9,
    sessions: 156,
    location: "London, UK",
    available: "Online",
    bio: "Leading Net Zero initiatives in FTSE 100 companies and government sustainability programs.",
    backstory: "As a first-generation immigrant, I faced significant barriers entering the sustainability sector. After finally breaking through and reaching executive level, I realized how many talented individuals from diverse backgrounds were being overlooked. I mentor because representation matters - I want to be the role model I never had and ensure that Britain's green transition includes voices from all communities."
  },
  {
    id: 4,
    name: "Thomas Wright",
    title: "Energy Policy Advisor",
    company: "Department for Energy Security",
    expertise: ["Energy Policy", "Government Relations", "Regulatory Affairs"],
    rating: 4.7,
    sessions: 73,
    location: "Westminster, London",
    available: "Online",
    bio: "Former civil servant with 12 years experience shaping UK energy policy and Net Zero legislation.",
    backstory: "I've seen brilliant technical minds struggle to influence policy because they don't understand how government works. Having spent over a decade in Whitehall, I know that the best technologies mean nothing without proper policy support. I mentor to bridge the gap between innovation and implementation - helping engineers and entrepreneurs navigate the corridors of power to turn their green ideas into national reality."
  },
  {
    id: 5,
    name: "Rebecca Thompson",
    title: "Clean Energy Investor",
    company: "Green Capital Partners",
    expertise: ["Investment", "Startup Scaling", "Business Development"],
    rating: 4.8,
    sessions: 112,
    location: "Birmingham, UK",
    available: "Online",
    bio: "Venture capitalist specializing in early-stage clean energy startups across the UK and Europe.",
    backstory: "After my renewable energy startup failed spectacularly in 2015, I learned more about business in six months than I had in six years. That failure taught me what investors really look for and how to build sustainable companies. Now as a VC, I mentor founders because I remember the isolation of building something new. I want to share the hard-won lessons that turned my failure into the foundation for helping others succeed."
  },
  {
    id: 6,
    name: "Dr. Ewan Campbell",
    title: "Marine Energy Researcher",
    company: "University of Strathclyde",
    expertise: ["Tidal Energy", "Wave Power", "Marine Engineering"],
    rating: 4.9,
    sessions: 94,
    location: "Glasgow, UK",
    available: "Online",
    bio: "Leading researcher in marine renewable energy with focus on tidal and wave power systems.",
    backstory: "Growing up on the Isle of Skye, I was fascinated by the power of the sea. When I started my PhD, marine energy was considered a pipe dream. Twenty years later, I've helped develop technologies that are finally becoming commercial reality. I mentor because I remember being told my research area was 'too niche' - I want to encourage others pursuing unconventional paths in renewable energy."
  }
];

const Mentorship = ({ darkMode }: { darkMode: boolean }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [expandedMentor, setExpandedMentor] = useState<number | null>(null);

  const toggleBackstory = (mentorId: number) => {
    setExpandedMentor(expandedMentor === mentorId ? null : mentorId);
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'} `}>
      <div className="max-w-7xl mx-auto space-y-6 ">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2 ">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <Badge className={`${darkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800'}  px-3 py-1 text-sm font-medium`}>
              100% FREE NON-PROFIT
            </Badge>
          </div>
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>UK Green Energy Mentorship</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Connect with Britain's leading renewable energy professionals to accelerate your career in the green transition. 
            <span className={`font-semibold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}> All sessions are completely free.</span>
          </p>
        </div>

        <Tabs defaultValue="find" className="w-full">
          <TabsList className={`grid w-full grid-cols-4 max-w-2xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <TabsTrigger value="find" className={darkMode ? 'data-[state=active]:bg-gray-700' : ''}>Find Mentors</TabsTrigger>
            <TabsTrigger value="sessions" className={darkMode ? 'data-[state=active]:bg-gray-700' : ''}>My Sessions</TabsTrigger>
            <TabsTrigger value="messages" className={darkMode ? 'data-[state=active]:bg-gray-700' : ''}>Messages</TabsTrigger>
            <TabsTrigger value="become" className={darkMode ? 'data-[state=active]:bg-gray-700' : ''}>Become a Mentor</TabsTrigger>
          </TabsList>

          <TabsContent value="find" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className={`absolute left-3 top-3 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  placeholder="Search mentors by expertise, location..."
                  className={`pl-10 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className={darkMode ? 'border-gray-700' : ''}>Filter by Expertise</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className={`transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 ring-2 ring-purple-100">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{mentor.name}</CardTitle>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>{mentor.title}</p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>{mentor.company}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Heart className="h-3 w-3 text-purple-600 fill-current" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Free Sessions</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{mentor.bio}</p>
                    
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBackstory(mentor.id)}
                        className={`${darkMode ? 'text-purple-400 border-purple-700' : 'text-purple-600 border-purple-500'} p-0 h-auto font-medium`}
                      >
                        {expandedMentor === mentor.id ? 'Hide Story' : 'Why I Mentor'}
                      </Button>
                      
                      {expandedMentor === mentor.id && (
                        <div className={`${darkMode ? 'bg-purple-900/30 border-purple-800' : 'bg-purple-50 border-purple-100'} p-3 rounded-lg border`}>
                          <p className={`text-sm leading-relaxed italic ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                            "{mentor.backstory}"
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className={`text-xs ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-purple-100 text-purple-800 '}`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className={darkMode ? 'text-gray-500' : 'text-gray-600'}>({mentor.sessions} sessions)</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span>{mentor.location}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span>{mentor.available}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                        Book Free Session
                      </Button>
                      <Button variant="outline" size="icon" className={darkMode ? 'border-gray-700' : 'border-purple-200'}>
                        <MessageSquare className="h-4 w-4 text-purple-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-100'}`}>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Session with Dr. Sarah Mitchell</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tomorrow, 2:00 PM - Solar Career Path Discussion</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Heart className="h-3 w-3 text-purple-600 fill-current" />
                          <span className={`text-sm font-medium ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Free Session</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className={darkMode ? 'border-gray-600' : ''}>Reschedule</Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">Join</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No messages yet. Start a conversation with a mentor!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="become" className="space-y-6">
            <Card className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : 'text-gray-900'}>Become a Mentor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Share your expertise and help shape the next generation of British energy professionals driving the green transition.
                  </p>
                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-purple-900/30 border-purple-800' : 'bg-purple-50 border-purple-100'}`}>
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>Why Become a Volunteer Mentor?</h3>
                    <ul className={`text-sm space-y-1 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                      <li>• Make a meaningful impact on the next generation</li>
                      <li>• Build your professional network across the UK</li>
                      <li>• Contribute to Britain's Net Zero goals</li>
                      <li>• Develop leadership and communication skills</li>
                      <li>• Give back to the renewable energy community</li>
                    </ul>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 k-700">
                    Apply to be a Volunteer Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Mentorship;