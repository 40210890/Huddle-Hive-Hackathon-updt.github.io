
import DashboardStats from '@/components/dashboard/DashboardStats';
import QuickActions from '@/components/dashboard/QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

const recentActivity = [
  {
    type: "scholarship",
    title: "Clean Energy Innovation Grant",
    status: "Application Submitted",
    time: "2 hours ago"
  },
  {
    type: "mentorship",
    title: "Session with Dr. Sarah Chen",
    status: "Scheduled",
    time: "Tomorrow 2:00 PM"
  },
  {
    type: "job",
    title: "Solar Engineer Position",
    status: "Applied",
    time: "3 days ago"
  }
];

const upcomingEvents = [
  {
    title: "Renewable Energy Webinar",
    date: "Dec 30, 2024",
    time: "10:00 AM",
    location: "Online",
    type: "Webinar"
  },
  {
    title: "Sustainability Career Fair",
    date: "Jan 5, 2025",
    time: "9:00 AM",
    location: "San Francisco, CA",
    type: "Event"
  },
  {
    title: "Wind Energy Workshop",
    date: "Jan 12, 2025",
    time: "2:00 PM",
    location: "Online",
    type: "Workshop"
  }
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">Here's what's happening in your energy career journey.</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
