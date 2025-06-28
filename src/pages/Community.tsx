
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Users, Search, Plus, ThumbsUp, Clock } from 'lucide-react';

const discussions = [
  {
    id: 1,
    title: "Best practices for solar panel maintenance?",
    author: "Sarah M.",
    category: "Solar Energy",
    replies: 12,
    likes: 24,
    timeAgo: "2 hours ago",
    content: "Looking for advice on maintaining solar installations in harsh weather conditions...",
  },
  {
    id: 2,
    title: "Career transition from oil & gas to renewables",
    author: "John D.",
    category: "Career Advice",
    replies: 8,
    likes: 18,
    timeAgo: "5 hours ago",
    content: "Has anyone successfully made the transition? What skills should I focus on?",
  },
  {
    id: 3,
    title: "New wind farm project opportunities",
    author: "Emma L.",
    category: "Wind Energy",
    replies: 6,
    likes: 15,
    timeAgo: "1 day ago",
    content: "Sharing some exciting offshore wind projects that are accepting applications...",
  }
];

const groups = [
  {
    id: 1,
    name: "Solar Professionals",
    members: 1247,
    description: "For solar energy professionals and enthusiasts",
    category: "Solar"
  },
  {
    id: 2,
    name: "Wind Energy Experts",
    members: 892,
    description: "Discussing wind energy technology and careers",
    category: "Wind"
  },
  {
    id: 3,
    name: "Sustainability Careers",
    members: 2156,
    description: "Career advice and opportunities in sustainability",
    category: "Career"
  },
  {
    id: 4,
    name: "Clean Tech Innovations",
    members: 634,
    description: "Latest innovations in clean technology",
    category: "Technology"
  }
];

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Community & Networking</h1>
        <p className="text-muted-foreground">Connect with professionals and share knowledge in the energy sector.</p>
      </div>

      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Start Discussion
            </Button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">
                          {discussion.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {discussion.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {discussion.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>by {discussion.author}</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes} likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                className="pl-10"
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Group
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{group.members} members</span>
                      </div>
                    </div>
                    <Badge variant="outline">{group.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                  <Button className="w-full">Join Group</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="qa" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Questions & Answers</h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ask Question
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">
                No questions yet. Be the first to ask!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
