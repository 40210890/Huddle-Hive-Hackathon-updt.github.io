
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, MapPin, Calendar, Users, MessageSquare } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Senior Solar Engineer",
    company: "SunPower Technologies",
    expertise: ["Solar Energy", "Power Systems", "Research"],
    rating: 4.9,
    sessions: 127,
    location: "San Francisco, CA",
    available: "Online & In-person",
    bio: "15+ years in solar energy with expertise in large-scale installations."
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Wind Energy Consultant",
    company: "GreenWind Solutions",
    expertise: ["Wind Energy", "Project Management", "Sustainability"],
    rating: 4.8,
    sessions: 89,
    location: "Austin, TX",
    available: "Online",
    bio: "Specialist in offshore wind projects and renewable energy policy."
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "Sustainability Director",
    company: "EcoTech Industries",
    expertise: ["Corporate Sustainability", "ESG", "Strategy"],
    rating: 4.9,
    sessions: 156,
    location: "New York, NY",
    available: "Online & In-person",
    bio: "Leading sustainability initiatives in Fortune 500 companies."
  }
];

const Mentorship = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mentorship</h1>
        <p className="text-muted-foreground">Connect with experienced professionals to accelerate your career.</p>
      </div>

      <Tabs defaultValue="find" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="find">Find Mentors</TabsTrigger>
          <TabsTrigger value="sessions">My Sessions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="become">Become a Mentor</TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentors by expertise, location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter by Expertise</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      <p className="text-sm text-muted-foreground">{mentor.company}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{mentor.bio}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{mentor.rating}</span>
                      <span className="text-muted-foreground">({mentor.sessions} sessions)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{mentor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span>{mentor.available}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Book Session</Button>
                    <Button variant="outline" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Session with Dr. Sarah Chen</p>
                      <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM - Solar Career Path Discussion</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No messages yet. Start a conversation with a mentor!</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="become" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Become a Mentor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Share your expertise and help shape the next generation of energy professionals.
              </p>
              <Button className="gradient-primary">Apply to be a Mentor</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Mentorship;
