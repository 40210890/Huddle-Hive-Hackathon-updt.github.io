
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Calendar, DollarSign, Building, Clock } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: "Senior Solar Engineer",
    company: "SolarTech Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    description: "Lead solar installation projects and mentor junior engineers.",
    skills: ["Solar PV", "AutoCAD", "Project Management", "NREL Tools"]
  },
  {
    id: 2,
    title: "Wind Energy Analyst",
    company: "GreenPower Corp",
    location: "Austin, TX",
    type: "Full-time",
    experience: "2-4 years",
    salary: "$80,000 - $100,000",
    posted: "1 week ago",
    description: "Analyze wind resource data and optimize turbine performance.",
    skills: ["Wind Analysis", "Python", "MATLAB", "GIS"]
  },
  {
    id: 3,
    title: "Sustainability Consultant",
    company: "EcoStrategy Partners",
    location: "Remote",
    type: "Contract",
    experience: "3+ years",
    salary: "$90 - $120/hour",
    posted: "3 days ago",
    description: "Help organizations develop and implement sustainability strategies.",
    skills: ["ESG Reporting", "Carbon Accounting", "Sustainability Strategy"]
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Job Board</h1>
        <p className="text-muted-foreground">Discover your next career opportunity in the energy sector.</p>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="post">Post Job</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, company, or skills..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filters</Button>
          </div>

          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <p className="text-lg text-muted-foreground mt-1">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{job.type}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{job.posted}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{job.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Apply Now</Button>
                    <Button variant="outline">Save Job</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
              <Button className="mt-4">Browse Jobs</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="post" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post a Job</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Are you looking to hire energy professionals? Post your job opening here.
              </p>
              <Button className="gradient-primary">Create Job Posting</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Jobs;
