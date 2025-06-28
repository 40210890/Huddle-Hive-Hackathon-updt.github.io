
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, Star, Search } from 'lucide-react';

const workshops = [
  {
    id: 1,
    title: "Solar Installation Certification",
    provider: "NABCEP Training Institute",
    date: "January 15-17, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Online + Hands-on Lab",
    price: "$1,200",
    spots: "8 spots left",
    rating: 4.8,
    level: "Intermediate",
    category: "Certification",
    description: "Get certified in solar PV installation with hands-on training.",
    duration: "3 days"
  },
  {
    id: 2,
    title: "Wind Energy Fundamentals",
    provider: "Clean Energy Academy",
    date: "February 5, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "San Francisco, CA",
    price: "Free",
    spots: "25 spots left",
    rating: 4.6,
    level: "Beginner",
    category: "Workshop",
    description: "Introduction to wind energy technology and career opportunities.",
    duration: "1 day"
  },
  {
    id: 3,
    title: "ESG Reporting Masterclass",
    provider: "Sustainability Institute",
    date: "January 28-29, 2025",
    time: "1:00 PM - 6:00 PM",
    location: "Online",
    price: "$899",
    spots: "12 spots left",
    rating: 4.9,
    level: "Advanced",
    category: "Professional Development",
    description: "Master ESG reporting frameworks and implementation strategies.",
    duration: "2 days"
  }
];

const Workshops = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Workshops & Training</h1>
        <p className="text-muted-foreground">Enhance your skills with professional development opportunities.</p>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Workshops</TabsTrigger>
          <TabsTrigger value="registered">My Registrations</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workshops..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter by Category</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{workshop.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{workshop.provider}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="secondary">{workshop.category}</Badge>
                      <Badge variant="outline">{workshop.level}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{workshop.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span>{workshop.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-orange-600" />
                      <span>{workshop.spots}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{workshop.rating}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{workshop.price}</p>
                      <p className="text-xs text-muted-foreground">{workshop.duration}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      {workshop.price === "Free" ? "Register Free" : "Register Now"}
                    </Button>
                    <Button variant="outline">Bookmark</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="registered" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't registered for any workshops yet.</p>
              <Button className="mt-4">Browse Workshops</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Complete workshops to earn certificates.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Workshops;
