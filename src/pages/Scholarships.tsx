import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, DollarSign, Calendar, Users, Heart, TrendingUp, Plus, BookOpen, Leaf, Battery, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const scholarships = [
  {
    id: 1,
    title: "Clean Energy Innovation Grant",
    amount: "£50,000",
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
    amount: "£25,000",
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
    amount: "£15,000",
    provider: "Solar Innovations Corp",
    deadline: "April 10, 2025",
    category: "Technology",
    description: "Supporting students pursuing solar energy careers.",
    requirements: ["Undergraduate/Graduate", "Solar energy focus"],
    status: "Open"
  }
];

const crowdfundingCampaigns = [
  {
    id: 1,
    title: "Renewable Energy Course",
    organizer: "Green Scholars Initiative",
    description: "Help fund tuition for 10 underprivileged students to attend a 6-month intensive course in renewable energy technologies.",
    amountRaised: 12500,
    goalAmount: 30000,
    donors: 243,
    daysLeft: 32,
    category: "Education",
    icon: <BookOpen className="h-5 w-5 text-green-600" />
  },
  {
    id: 2,
    title: "Sustainable Agriculture Internship",
    organizer: "Future Farmers Network",
    description: "Funding for 5 students to participate in a summer internship program learning sustainable farming practices.",
    amountRaised: 8750,
    goalAmount: 15000,
    donors: 156,
    daysLeft: 15,
    category: "Agriculture",
    icon: <Leaf className="h-5 w-5 text-green-600" />
  },
  {
    id: 3,
    title: "Battery Technology Research Grant",
    organizer: "Energy Storage Society",
    description: "Support for undergraduate research projects exploring next-generation battery technologies at leading UK universities, providing students with hands-on experience in cutting-edge energy storage innovations and access to expert mentorship.",
    amountRaised: 18200,
    goalAmount: 25000,
    donors: 98,
    daysLeft: 45,
    category: "Technology",
    icon: <Battery className="h-5 w-5 text-green-600" />
  },
  {
    id: 4,
    title: "Women in Energy Scholarship",
    organizer: "Diversity in STEM Foundation",
    description: "Scholarships for female students pursuing degrees in energy-related fields at UK universities.",
    amountRaised: 32000,
    goalAmount: 50000,
    donors: 421,
    daysLeft: 60,
    category: "Diversity",
    icon: <Lightbulb className="h-5 w-5 text-green-600" />
  }
];

const ScholarshipCard = ({ scholarship }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
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
  );
};

const CrowdfundingCard = ({ campaign }) => {
  const [donationAmount, setDonationAmount] = useState(20);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-100">
            {campaign.icon}
          </div>
          <div>
            <CardTitle className="text-lg">{campaign.title}</CardTitle>
            <p className="text-sm text-muted-foreground">by {campaign.organizer}</p>
          </div>
        </div>
        <Badge variant="outline" className="mt-2 w-fit">{campaign.category}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm line-clamp-3">{campaign.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">£{campaign.amountRaised.toLocaleString()} raised</span>
            <span className="text-muted-foreground">of £{campaign.goalAmount.toLocaleString()}</span>
          </div>
          <Progress value={(campaign.amountRaised / campaign.goalAmount) * 100} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-purple-600" />
              <span>{campaign.donors} supporters</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>{campaign.daysLeft} days left</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            {[10, 20, 50, 100].map((amount) => (
              <Button 
                key={amount} 
                variant={donationAmount === amount ? "default" : "outline"} 
                size="sm"
                onClick={() => setDonationAmount(amount)}
                className="flex-1 min-w-[60px]"
              >
                £{amount}
              </Button>
            ))}
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <Heart className="h-4 w-4 mr-2" />
            Support This Student
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');

  const filteredScholarships = scholarships.filter(scholarship => 
    scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || scholarship.category.toLowerCase() === selectedCategory)
  );

  const filteredCampaigns = crowdfundingCampaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (value) => {
    setActiveTab(value);
    setSearchTerm('');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Energy Education Funding</h1>
        <p className="text-muted-foreground">Discover scholarships and crowdfunding opportunities for sustainability and energy studies.</p>
      </div>

      <Tabs defaultValue="browse" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse Scholarships</TabsTrigger>
          <TabsTrigger value="apply">My Applications</TabsTrigger>
          <TabsTrigger value="crowdfunding">Student Fundraisers</TabsTrigger>
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
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
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

        <TabsContent value="crowdfunding" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search student fundraisers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600">
              <Plus className="h-4 w-4" />
              Start Your Fundraiser
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CrowdfundingCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="offer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Offer Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Are you an organization looking to support students in sustainability and energy fields? 
                Create your funding opportunity here.
              </p>
              <Button className="bg-gradient-to-r from-green-600 to-teal-600">Create Funding Opportunity</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scholarships;