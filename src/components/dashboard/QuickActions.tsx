
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Search, Users, FileSearch, Calendar, MessageCircle, User } from 'lucide-react';

const quickActions = [
  {
    title: "Find Scholarships",
    description: "Access funding opportunities for BAME professionals",
    icon: Search,
    route: "/scholarships",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200 dark:bg-purple-950 dark:hover:bg-purple-900 dark:border-purple-800"
  },
  {
    title: "Connect with Mentors",
    description: "Find experienced BAME leaders to guide your career",
    icon: Users,
    route: "/mentorship",
    color: "bg-pink-50 hover:bg-pink-100 border-pink-200 dark:bg-pink-950 dark:hover:bg-pink-900 dark:border-pink-800"
  },
  {
    title: "Explore UK Jobs",
    description: "Discover opportunities across the UK energy sector",
    icon: FileSearch,
    route: "/jobs",
    color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200 dark:bg-indigo-950 dark:hover:bg-indigo-900 dark:border-indigo-800"
  },
  {
    title: "Join Workshops",
    description: "Enhance skills with diversity-focused training",
    icon: Calendar,
    route: "/workshops",
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200 dark:bg-orange-950 dark:hover:bg-orange-900 dark:border-orange-800"
  },
  {
    title: "Join Community",
    description: "Connect with BAME professionals nationwide",
    icon: MessageCircle,
    route: "/community",
    color: "bg-teal-50 hover:bg-teal-100 border-teal-200 dark:bg-teal-950 dark:hover:bg-teal-900 dark:border-teal-800"
  },
  {
    title: "Career Path Quiz",
    description: "Discover your ideal path in UK energy sector",
    icon: User,
    route: "/career-explorer",
    color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 dark:border-emerald-800"
  }
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-auto p-4 flex flex-col items-start text-left ${action.color} border-2 transition-all duration-200 hover:scale-105`}
              onClick={() => navigate(action.route)}
            >
              <div className="flex items-center gap-3 mb-2">
                <action.icon className="h-5 w-5" />
                <span className="font-semibold">{action.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
