
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { User, Lightbulb, Target, Star, ArrowRight } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: "What aspect of energy work excites you most?",
    options: [
      "Designing and installing solar systems",
      "Analyzing data and optimizing performance",
      "Developing policy and strategy",
      "Research and innovation"
    ]
  },
  {
    id: 2,
    question: "What's your preferred work environment?",
    options: [
      "Outdoors and hands-on",
      "Office-based analytical work",
      "Mix of field and office",
      "Laboratory or research facility"
    ]
  },
  {
    id: 3,
    question: "What's your educational background?",
    options: [
      "Engineering or technical",
      "Business or economics",
      "Environmental science",
      "Other or exploring options"
    ]
  }
];

const careerPaths = [
  {
    title: "Solar Engineer",
    match: 92,
    description: "Design and optimize solar energy systems",
    skills: ["Solar PV", "Electrical Engineering", "Project Management"],
    averageSalary: "$85,000 - $120,000",
    growth: "High demand",
    mentors: 12
  },
  {
    title: "Energy Analyst",
    match: 87,
    description: "Analyze energy data and market trends",
    skills: ["Data Analysis", "Python", "Energy Markets"],
    averageSalary: "$70,000 - $95,000",
    growth: "Growing field",
    mentors: 8
  },
  {
    title: "Sustainability Consultant",
    match: 78,
    description: "Help organizations implement sustainable practices",
    skills: ["ESG", "Strategy", "Communication"],
    averageSalary: "$80,000 - $110,000",
    growth: "Very high demand",
    mentors: 15
  }
];

const CareerExplorer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Career Path Explorer</h1>
          <p className="text-muted-foreground">Discover your ideal career in the energy and sustainability sector.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Find Your Perfect Career Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Take our comprehensive career assessment to discover which energy and sustainability 
                roles align with your interests, skills, and goals. Get personalized recommendations 
                for jobs, mentors, and training opportunities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Personalized Assessment</h3>
                  <p className="text-sm text-muted-foreground">Answer questions about your interests and background</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Matching</h3>
                  <p className="text-sm text-muted-foreground">AI-powered recommendations based on your profile</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Action Plan</h3>
                  <p className="text-sm text-muted-foreground">Get connected with mentors and opportunities</p>
                </div>
              </div>

              <Button size="lg" onClick={startQuiz} className="gradient-primary">
                Start Career Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Career Matches</h1>
          <p className="text-muted-foreground">Based on your assessment, here are your top career recommendations.</p>
        </div>

        <div className="space-y-6">
          {careerPaths.map((path, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {path.title}
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {path.match}% match
                      </Badge>
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">{path.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{path.match}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Key Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Average Salary:</p>
                    <p className="text-sm text-muted-foreground">{path.averageSalary}</p>
                    <p className="text-sm font-medium mt-2 mb-1">Job Market:</p>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      {path.growth}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Available Mentors:</p>
                    <p className="text-sm text-muted-foreground">{path.mentors} professionals</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">View Jobs</Button>
                  <Button variant="outline">Find Mentors</Button>
                  <Button variant="outline">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={resetQuiz}>
            Retake Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Career Assessment</h1>
        <p className="text-muted-foreground">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="mb-8" />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {quizQuestions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={answers[currentQuestion] || ""} 
              onValueChange={handleAnswerSelect}
            >
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!answers[currentQuestion]}
              >
                {currentQuestion === quizQuestions.length - 1 ? 'View Results' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerExplorer;
