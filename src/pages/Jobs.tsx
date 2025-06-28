
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Calendar, DollarSign, Building, Clock, Filter } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: "Senior Renewable Energy Consultant",
    company: "Green Energy Solutions UK",
    location: "London, England",
    type: "Full-time",
    experience: "5+ years",
    salary: "£50,000 - £70,000",
    posted: "2 days ago",
    description: "Lead renewable energy projects across the UK. We actively encourage applications from BAME candidates.",
    skills: ["Solar PV", "Wind Energy", "Project Management", "UK Planning Law"],
    remote: false,
    experienceLevel: "Senior"
  },
  {
    id: 2,
    title: "Energy Data Analyst",
    company: "British Gas",
    location: "Manchester, England",
    type: "Full-time",
    experience: "2-4 years",
    salary: "£35,000 - £45,000",
    posted: "1 week ago",
    description: "Analyse energy consumption data to improve efficiency. Part of our diversity & inclusion initiative.",
    skills: ["Python", "SQL", "Power BI", "Energy Markets"],
    remote: true,
    experienceLevel: "Mid"
  },
  {
    id: 3,
    title: "Sustainability Officer",
    company: "Edinburgh City Council",
    location: "Edinburgh, Scotland",
    type: "Contract",
    experience: "3+ years",
    salary: "£400 - £500/day",
    posted: "3 days ago",
    description: "Drive sustainability initiatives across the city. Committed to building a diverse workforce.",
    skills: ["Carbon Management", "Environmental Policy", "Stakeholder Engagement", "Report Writing"],
    remote: false,
    experienceLevel: "Mid"
  },
  {
    id: 4,
    title: "Graduate Energy Engineer",
    company: "SSE Renewables",
    location: "Glasgow, Scotland",
    type: "Graduate",
    experience: "0-1 years",
    salary: "£28,000 - £32,000",
    posted: "5 days ago",
    description: "Graduate programme focused on offshore wind development. Welcoming applications from underrepresented groups.",
    skills: ["Engineering Degree", "Renewable Energy", "MATLAB", "Technical Writing"],
    remote: false,
    experienceLevel: "Entry"
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === 'all' || 
                           job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesExperience = experienceFilter === 'all' || 
                             job.experienceLevel.toLowerCase() === experienceFilter.toLowerCase();
    
    const matchesType = typeFilter === 'all' || 
                       job.type.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesLocation && matchesExperience && matchesType;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('all');
    setExperienceFilter('all');
    setTypeFilter('all');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Job Board</h1>
        <p className="text-muted-foreground">Discover opportunities in the UK energy sector. Supporting career advancement for BAME professionals.</p>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="post">Post Job</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col space-y-4">
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
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        <SelectItem value="london">London</SelectItem>
                        <SelectItem value="manchester">Manchester</SelectItem>
                        <SelectItem value="edinburgh">Edinburgh</SelectItem>
                        <SelectItem value="glasgow">Glasgow</SelectItem>
                        <SelectItem value="birmingham">Birmingham</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Experience Level</label>
                    <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All levels</SelectItem>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Job Type</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
          </div>

          <div className="space-y-6">
            {filteredJobs.map((job) => (
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
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-pink-600" />
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
                    <Button className="flex-1 gradient-primary">Apply Now</Button>
                    <Button variant="outline">Save Job</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4">No jobs found matching your criteria.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
              <Button className="mt-4" onClick={() => document.querySelector('[value="browse"]')?.click()}>
                Browse Jobs
              </Button>
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
                Looking to hire talented BAME professionals in the UK energy sector? Post your job opening here.
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
