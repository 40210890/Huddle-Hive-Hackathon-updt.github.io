
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Search, FileSearch } from 'lucide-react';

const stats = [
  {
    title: "Active Scholarships",
    value: "24",
    description: "+12% from last month",
    icon: Search,
    color: "text-blue-600"
  },
  {
    title: "Available Mentors",
    value: "156",
    description: "+3 new this week",
    icon: Users,
    color: "text-green-600"
  },
  {
    title: "Job Openings",
    value: "89",
    description: "Across 15 companies",
    icon: FileSearch,
    color: "text-purple-600"
  },
  {
    title: "Upcoming Events",
    value: "12",
    description: "Next 30 days",
    icon: Calendar,
    color: "text-orange-600"
  }
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
