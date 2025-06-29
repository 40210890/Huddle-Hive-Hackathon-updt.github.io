import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { X, Check, ChevronLeft, ChevronRight, User, Lightbulb, Target, Star, ArrowRight } from 'lucide-react';

const flashcardQuestions = [
  { id: 1, question: "Do you enjoy working with renewable energy technologies?", category: "Energy" },
  { id: 2, question: "Are you passionate about reducing carbon emissions?", category: "Sustainability" },
  { id: 3, question: "Would you like to work on large-scale solar or wind projects?", category: "Energy" },
  { id: 4, question: "Are you interested in developing green urban infrastructure?", category: "Urban Planning" },
  { id: 5, question: "Do you want to help businesses become more sustainable?", category: "Consulting" },
  { id: 6, question: "Are you comfortable analyzing environmental data?", category: "Analytics" },
  { id: 7, question: "Would you enjoy creating sustainability policies?", category: "Policy" },
  { id: 8, question: "Are you interested in circular economy solutions?", category: "Innovation" },
  { id: 9, question: "Do you want to work on protecting ecosystems?", category: "Conservation" },
  { id: 10, question: "Are you excited about emerging green technologies?", category: "Tech" },
  { 
    id: 11, 
    question: "Which work environment do you prefer?", 
    category: "Preferences",
    options: [
      "Field work (on-site installations, etc.)",
      "Office/remote analytical work",
      "Research lab",
      "Mixed environments"
    ], 
    type: "multiple" 
  },
  { 
    id: 12, 
    question: "What's your strongest skill set?", 
    category: "Skills",
    options: [
      "Engineering/technical",
      "Data science/analysis",
      "Software development",
      "Research/innovation",
      "Project management"
    ], 
    type: "multiple" 
  },
  { 
    id: 13, 
    question: "Which sustainability area interests you most?", 
    category: "Interests",
    options: [
      "Renewable energy",
      "Energy efficiency",
      "Circular economy",
      "Climate tech",
      "Conservation tech"
    ], 
    type: "multiple" 
  },
  { id: 14, question: "Do you prefer working independently or in teams?", category: "Work Style" },
  { id: 15, question: "Are you interested in international sustainability projects?", category: "Global Impact" }
];

const careerPaths = [
  {
    title: "Renewable Energy Engineer",
    match: 0,
    description: "Design and implement solar, wind, and other renewable energy systems",
    why: "Your technical skills and interest in renewable energy make this a perfect fit",
    skills: ["Engineering", "Renewable Tech", "Project Management"],
    percentage: "90% match",
    growth: "35% projected growth (2023-2030)",
    mentors: 24,
    sustainabilityImpact: "High - directly reduces fossil fuel dependence",
    salary: "£45,000 - £85,000 (entry to senior)"
  },
  {
    title: "Sustainability Consultant",
    match: 0,
    description: "Help organizations reduce environmental impact and improve ESG performance",
    why: "Your analytical skills and interest in business sustainability align well",
    skills: ["ESG", "Data Analysis", "Communication"],
    percentage: "85% match",
    growth: "28% projected growth (2023-2030)",
    mentors: 32,
    sustainabilityImpact: "High - enables systemic change in organizations",
    salary: "£40,000 - £120,000 (varies by experience)"
  },
  {
    title: "Environmental Data Scientist",
    match: 0,
    description: "Analyze environmental data to drive sustainability decisions",
    why: "Combines your data skills with environmental passion",
    skills: ["Python/R", "Machine Learning", "Data Visualization"],
    percentage: "88% match",
    growth: "40% projected growth (2023-2030)",
    mentors: 18,
    sustainabilityImpact: "Medium-High - informs critical decisions",
    salary: "£50,000 - £95,000"
  },
  {
    title: "Climate Policy Analyst",
    match: 0,
    description: "Develop and analyze policies to address climate change",
    why: "Matches your interest in policy and systemic change",
    skills: ["Policy Analysis", "Research", "Stakeholder Engagement"],
    percentage: "82% match",
    growth: "25% projected growth (2023-2030)",
    mentors: 15,
    sustainabilityImpact: "Very High - shapes government and corporate action",
    salary: "£35,000 - £80,000"
  },
  {
    title: "Circular Economy Specialist",
    match: 0,
    description: "Design waste-reduction systems and sustainable product lifecycles",
    why: "Aligns with your interest in innovation and circular solutions",
    skills: ["Systems Thinking", "Product Design", "Supply Chain"],
    percentage: "87% match",
    growth: "30% projected growth (2023-2030)",
    mentors: 12,
    sustainabilityImpact: "High - reduces resource consumption",
    salary: "£40,000 - £90,000"
  }
];

const CareerExplorer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left'|'right'|null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = flashcardQuestions[currentIndex];

  const handleStart = (clientX: number) => {
    setStartPos({ x: clientX, y: 0 });
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startPos.x;
    setPosition({ x: deltaX, y: 0 });
    
    if (deltaX > 50) setSwipeDirection('right');
    else if (deltaX < -50) setSwipeDirection('left');
    else setSwipeDirection(null);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (swipeDirection) {
      completeSwipe(swipeDirection);
    } else {
      resetPosition();
    }
  };

  const completeSwipe = (direction: 'left' | 'right') => {
    const answer = direction === 'right';
    
    // For multiple choice questions, use the selected option
    const answerValue = currentQuestion.type === 'multiple' ? selectedOption : answer;
    
    setAnswers({ ...answers, [currentIndex]: answerValue });
    setPosition({ x: direction === 'right' ? 500 : -500, y: 0 });
    
    setTimeout(() => {
      goToNextCard();
    }, 300);
  };

  const goToNextCard = () => {
    if (currentIndex < flashcardQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetPosition();
      setSelectedOption(null);
    } else {
      calculateResults();
      setShowResults(true);
    }
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  const calculateResults = () => {
    // Calculate match percentages based on answers
    const updatedCareers = careerPaths.map(career => {
      let score = 0;
      
      // Renewable Energy Engineer scoring
      if (career.title === "Renewable Energy Engineer") {
        if (answers[0] === true) score += 20;
        if (answers[2] === true) score += 20;
        if (answers[10] === "Field work (on-site installations, etc.)") score += 15;
        if (answers[11] === "Engineering/technical") score += 25;
        if (answers[12] === "Renewable energy") score += 20;
      }
      
      // Sustainability Consultant scoring
      if (career.title === "Sustainability Consultant") {
        if (answers[1] === true) score += 15;
        if (answers[4] === true) score += 25;
        if (answers[10] === "Office/remote analytical work") score += 15;
        if (answers[11] === "Project management") score += 20;
        if (answers[12] === "Energy efficiency") score += 15;
        if (answers[14] === true) score += 10;
      }
      
      // Environmental Data Scientist scoring
      if (career.title === "Environmental Data Scientist") {
        if (answers[5] === true) score += 25;
        if (answers[10] === "Office/remote analytical work") score += 20;
        if (answers[11] === "Data science/analysis") score += 30;
        if (answers[12] === "Climate tech") score += 15;
        if (answers[13] === true) score += 10;
      }
      
      // Climate Policy Analyst scoring
      if (career.title === "Climate Policy Analyst") {
        if (answers[1] === true) score += 20;
        if (answers[6] === true) score += 30;
        if (answers[10] === "Office/remote analytical work") score += 15;
        if (answers[11] === "Research/innovation") score += 20;
        if (answers[12] === "Climate tech") score += 15;
      }
      
      // Circular Economy Specialist scoring
      if (career.title === "Circular Economy Specialist") {
        if (answers[3] === true) score += 15;
        if (answers[7] === true) score += 30;
        if (answers[10] === "Mixed environments") score += 15;
        if (answers[11] === "Research/innovation") score += 20;
        if (answers[12] === "Circular economy") score += 20;
      }
      
      return {
        ...career,
        match: Math.min(100, score),
        percentage: `${score}% match`
      };
    });
    
    // Sort by match score
    return updatedCareers.sort((a, b) => b.match - a.match);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const handleTouchEnd = () => handleEnd();

    const handleMouseDown = (e: MouseEvent) => handleStart(e.clientX);
    const handleMouseMove = (e: MouseEvent) => isDragging && handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();

    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);

    card.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);

      card.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
    setSelectedOption(null);
  };

  if (!quizStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <Lightbulb className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sustainability Career Match</h1>
            <p className="text-lg text-gray-600">
              Discover your ideal career in sustainability, energy, and environmental fields
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-center mb-2">15 Quick Questions</h3>
              <p className="text-sm text-gray-600 text-center">Swipe through our assessment in minutes</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-center mb-2">Personalized Matches</h3>
              <p className="text-sm text-gray-600 text-center">Get careers that fit your skills and interests</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-center mb-2">Detailed Insights</h3>
              <p className="text-sm text-gray-600 text-center">Salary, growth, mentors, and impact data</p>
            </div>
          </div>

          <Button 
            onClick={startQuiz}
            className="w-full py-6 text-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            Start Career Assessment
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Career Matches</h1>
            <p className="text-lg text-gray-600">
              Based on your answers, here are your top career recommendations
            </p>
          </div>

          <div className="space-y-6">
            {results.slice(0, 5).map((career, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-100 text-green-800 px-3 py-1 text-sm font-medium rounded-bl-lg">
                  {career.percentage}
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{career.title}</CardTitle>
                  <p className="text-gray-600">{career.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Why This Career Fits You:</h3>
                      <p className="text-gray-700 mb-4">{career.why}</p>
                      
                      <h3 className="font-semibold mb-2">Key Skills:</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {career.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold">Salary Range:</h3>
                          <p>{career.salary}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Job Growth:</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {career.growth}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold">Available Mentors:</h3>
                          <p>{career.mentors} professionals in our network</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Sustainability Impact:</h3>
                          <p>{career.sustainabilityImpact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      View Career Path
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Find Mentors
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={resetQuiz}
              className="border-gray-300"
            >
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md ">
        <div className="flex justify-between items-center mb-4 ">
          <span className="text-sm text-gray-500">
            Question {currentIndex + 1} of {flashcardQuestions.length}
          </span>
          <Progress value={((currentIndex + 1) / flashcardQuestions.length) * 100} className="w-3/4 h-2" />
        </div>

        <div className="relative h-96 mb-8 shadow-[#341539] shadow-md rounded-md">
          <div
            ref={cardRef}
            className={`absolute inset-0 transition-transform duration-300 bg-white rounded-xl shadow-lg flex flex-col cursor-grab active:cursor-grabbing ${
              swipeDirection === 'right' ? 'bg-green-50' : 
              swipeDirection === 'left' ? 'bg-red-50' : 'bg-white'
            }`}
            style={{
              transform: `translateX(${position.x}px) rotate(${position.x / 20}deg)`,
              opacity: 1 - Math.abs(position.x) / 200
            }}
          >
            <CardHeader>
              <Badge variant="outline" className="mb-2 text-purple-700 border-none">
                {currentQuestion.category}
              </Badge>
              <CardTitle className="text-xl text-center">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col items-center justify-center">
              {currentQuestion.type === 'multiple' ? (
                <div className="w-full space-y-3">
                  <RadioGroup 
                    value={selectedOption || ""}
                    onValueChange={handleOptionSelect}
                  >
                    {currentQuestion.options?.map((option, index) => (
                      <div 
                        key={index} 
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedOption === option 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <>
                  {swipeDirection === 'right' && (
                    <div className="flex flex-col items-center mb-4">
                      <Check className="w-12 h-12 text-green-500 mb-2" />
                      <span className="text-green-500">Agree</span>
                    </div>
                  )}
                  {swipeDirection === 'left' && (
                    <div className="flex flex-col items-center mb-4">
                      <X className="w-12 h-12 text-red-500 mb-2" />
                      <span className="text-red-500">Disagree</span>
                    </div>
                  )}
                  {!swipeDirection && (
                    <div className="text-center text-gray-500">
                      {currentQuestion.type === 'multiple' ? (
                        <p>Select an option below</p>
                      ) : (
                        <>
                          <p>Swipe right to agree</p>
                          <p>Swipe left to disagree</p>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </div>
        </div>

        {currentQuestion.type === 'multiple' ? (
          <div className="flex justify-center gap-4">
            <Button 
              variant="destructive" 
              className="w-16 h-16 rounded-full"
              onClick={() => completeSwipe('left')}
              disabled={!selectedOption}
            >
              <X className="w-8 h-8" />
            </Button>
            <Button 
              className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700"
              onClick={() => completeSwipe('right')}
              disabled={!selectedOption}
            >
              <Check className="w-8 h-8" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Button 
              variant="destructive" 
              className="w-16 h-16 rounded-full"
              onClick={() => completeSwipe('left')}
            >
              <X className="w-8 h-8" />
            </Button>
            <Button 
              className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700"
              onClick={() => completeSwipe('right')}
            >
              <Check className="w-8 h-8" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerExplorer;