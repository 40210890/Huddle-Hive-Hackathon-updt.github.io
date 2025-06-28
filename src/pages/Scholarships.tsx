
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, DollarSign, Calendar, Users } from 'lucide-react';

const scholarships = [
  {
    id: 1,
    title: "Clean Energy Innovation Grant",
    amount: "$50,000",
    provider: "Green Energy Foundation",
    deadline: "March 15, 2025",
    category: "Research",
    description: "Supporting innovative research in renewable energy technologies.",
    requirements: ["PhD in Engineering", "2+ years research experience"],
    status: "Open"
  },
  {
    id: 2,
    title: "Sustainability Leadership Program",
    amount: "$25,000",
    provider: "EcoFuture Institute",
    deadline: "February 28, 2025",
    category: "Leadership",
    description: "Developing next-generation sustainability leaders.",
    requirements: ["Master's degree", "Leadership experience"],
    status: "Open"
  },
  {
    id: 3,
    title: "Solar Technology Scholarship",
    amount: "$15,000",
    provider: "Solar Innovations Corp",
    deadline: "April 10, 2025",
    category: "Technology",
    description: "Supporting students pursuing solar energy careers.",
    requirements: ["Undergraduate/Graduate", "Solar energy focus"],
    status: "Open"
  }
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredScholarships = scholarships.filter(scholarship => 
    scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || scholarship.category.toLowerCase() === selectedCategory)
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Scholarships & Funding</h1>
        <p className="text-muted-foreground">Discover funding opportunities for your energy career.</p>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Opportunities</TabsTrigger>
          <TabsTrigger value="apply">My Applications</TabsTrigger>
          <TabsTrigger value="offer">Offer Funding</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scholarships..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{scholarship.title}</CardTitle>
                    <Badge variant="secondary">{scholarship.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{scholarship.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>Deadline: {scholarship.deadline}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Requirements:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {scholarship.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="apply" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't applied to any scholarships yet.</p>
              <Button className="mt-4">Browse Scholarships</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Offer Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Are you an organization looking to offer scholarships or funding? 
                Create your funding opportunity here.
              </p>
              <Button className="gradient-primary">Create Scholarship</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scholarships;
