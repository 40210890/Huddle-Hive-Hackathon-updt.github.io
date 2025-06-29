import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Search, Lightbulb, FileText, ArrowRight, Sun, Moon, MapPin, Calendar, Building, Clock, Filter, Bookmark } from 'lucide-react';

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

const suggestedRoles = [
  "Renewable Energy Engineer",
  "Sustainability Consultant",
  "Carbon Analyst",
  "Solar PV Technician",
  "Energy Efficiency Advisor",
  "Wind Farm Project Manager",
  "Environmental Policy Officer",
  "Green Building Architect"
];

const improvementTips = [
  "Add more keywords like 'renewable energy' or 'carbon footprint reduction'",
  "Highlight any project management experience in sustainability projects",
  "Include specific metrics (e.g., 'Reduced energy consumption by 15%')",
  "Mention relevant certifications like BREEAM, LEED, or ISO 14001",
  "Detail any experience with energy auditing or lifecycle assessment",
  "Showcase software skills like EnergyPlus, RETScreen, or GIS for energy mapping"
];

const relatedCourses = [
  { name: "Renewable Energy Fundamentals", provider: "University of Edinburgh", cost: "£450" },
  { name: "Carbon Management Professional", provider: "Carbon Literacy Project", cost: "£300" },
  { name: "Solar PV Installation", provider: "City & Guilds", cost: "£1,200" },
  { name: "Sustainable Business Strategy", provider: "Harvard Business School Online", cost: "£1,500" }
];

const GreenCareersPortal = () => {
  // Job Board State
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // CV Checker State
  const [cvFile, setCvFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setCvFile(file);
      // Simulate analysis
      setTimeout(() => {
        setAnalysisComplete(true);
        setMatchPercentage(Math.floor(Math.random() * 40) + 60); // Random match between 60-100%
      }, 2000);
    }
  };

  const filteredRoles = suggestedRoles.filter(role => 
    role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">Browse Jobs</TabsTrigger>
            <TabsTrigger value="cvchecker">CV Suitability Checker</TabsTrigger>
            <TabsTrigger value="resources">Career Resources</TabsTrigger>
          </TabsList>

          {/* Jobs Tab Content */}
          <TabsContent value="jobs" className="space-y-6">
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
                  className={`flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-500'}`}
                >
                  <Filter className={`h-4 w-4 ${darkMode ? 'text-white' : 'text-gray-500'}`} />
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
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Showing {filteredJobs.length} of {jobs.length} jobs
              </p>
              <Button 
                variant="link" 
                className="text-purple-600" 
                onClick={() => setActiveTab('cvchecker')}
              >
                Check your CV suitability for these roles →
              </Button>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className={`hover:shadow-lg transition-shadow duration-200 ${darkMode ? 'bg-gray-800' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <p className={`text-lg mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{job.company}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{job.type}</Badge>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{job.posted}</p>
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
                        <Building className="h-4 w-4 text-pink-600" />
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
                      <Button className="flex-1" style={{ backgroundColor: '#98568D' }}>Apply Now</Button>
                      <Button variant="outline">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <Card className={darkMode ? 'bg-gray-800' : ''}>
                <CardContent className="p-8 text-center">
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No jobs found matching your criteria.</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* CV Checker Tab Content */}
          <TabsContent value="cvchecker" className="space-y-6">
            <Card className={darkMode ? 'bg-gray-800' : ''}>
              <CardHeader>
                <CardTitle>CV Suitability Checker</CardTitle>
                <CardDescription>
                  Upload your CV to see how well it matches green career opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!analysisComplete ? (
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Upload className="h-12 w-12 text-purple-600" />
                      <h3 className="text-lg font-medium">Upload your CV</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        PDF or Word documents accepted. We'll analyze your skills and experience.
                      </p>
                      <label className="cursor-pointer">
                        <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white" style={{ backgroundColor: '#98568D' }}>
                          Select File
                        </span>
                        <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.docx" />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">CV Analysis Complete</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {cvFile.name} - {jobRole || "General Green Careers"}
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => {
                        setAnalysisComplete(false);
                        setCvFile(null);
                      }}>
                        Analyze Another CV
                      </Button>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Suitability Match</span>
                        <span className="text-sm font-medium">{matchPercentage}%</span>
                      </div>
                      <Progress value={matchPercentage} className="h-2" />
                      <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {matchPercentage >= 80 
                          ? "Excellent match! Your CV is well-suited for green energy roles."
                          : matchPercentage >= 60
                          ? "Good potential. Some improvements could make your CV more competitive."
                          : "Some gaps identified. Consider the improvement tips below."}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className={darkMode ? 'bg-gray-700' : ''}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-500" />
                            <span>Improvement Tips</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {improvementTips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-purple-600">•</span>
                                <span className="text-sm">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className={darkMode ? 'bg-gray-700' : ''}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <span>Suggested Career Paths</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {suggestedRoles.map((role, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Recommended Training</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {relatedCourses.map((course, index) => (
                          <Card key={index} className={darkMode ? 'bg-gray-700' : ''}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{course.name}</h4>
                                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{course.provider}</p>
                                </div>
                                <Badge variant="secondary">{course.cost}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button 
                        className="mt-6" 
                        style={{ backgroundColor: '#98568D' }}
                        onClick={() => setActiveTab('jobs')}
                      >
                        View Matching Jobs <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab Content */}
          <TabsContent value="resources" className="space-y-6">
            <Card className={darkMode ? 'bg-gray-800' : ''}>
              <CardHeader>
                <CardTitle>Green Career Resources</CardTitle>
                <CardDescription>
                  Tools and opportunities to help you build a career in sustainability
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Training & Education</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <a href="#" className="text-sm hover:underline">Free online courses from UK universities</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <a href="#" className="text-sm hover:underline">Apprenticeships in renewable energy</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <a href="#" className="text-sm hover:underline">Scholarships for BAME students</a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Career Support</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <a href="#" className="text-sm hover:underline">Mentorship programs</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <a href="#" className="text-sm hover:underline">Networking events</a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-600">•</span>
                      <a href="#" className="text-sm hover:underline">CV and interview workshops</a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className={darkMode ? 'bg-gray-800' : ''}>
                <CardHeader>
                  <CardTitle>Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">From retail to renewable energy</h4>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        "The CV checker helped me identify transferable skills that got me my first role in solar energy."
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Career change at 40</h4>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        "With the recommended training, I transitioned from oil & gas to offshore wind in 18 months."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={darkMode ? 'bg-gray-800' : ''}>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-3">
                    <Button variant="outline" className="justify-start" onClick={() => setActiveTab('cvchecker')}>
                      Check your CV suitability
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={() => setActiveTab('jobs')}>
                      Browse current job openings
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Sign up for mentorship
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GreenCareersPortal;