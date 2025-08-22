import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  Plus, 
  FileText, 
  Calendar, 
  Users, 
  Target, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft,
  Save,
  Send
} from "lucide-react"

const categories = [
  "Treasury", "Technical", "Governance", "Partnerships", "Security", "Marketing", "Other"
]

const presetDurations = [
  { label: "3 Days", days: 3 },
  { label: "1 Week", days: 7 },
  { label: "2 Weeks", days: 14 },
  { label: "1 Month", days: 30 },
]

export default function CreateProposal() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    votingDuration: 7,
    customDuration: "",
    quorum: 20,
    threshold: 60,
    executionDelay: 2
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    toast({
      title: "Proposal Created Successfully!",
      description: "Your proposal has been submitted and is now live for voting.",
    })
    navigate("/proposals")
  }

  const handleDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your proposal has been saved as a draft.",
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="dao-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Proposal Details
              </CardTitle>
              <p className="text-muted-foreground">
                Provide the basic information about your proposal
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter a clear, descriptive title for your proposal"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Keep it concise and specific (max 100 characters)
                </p>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                  {categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant={formData.category === cat ? "default" : "outline"}
                      className={`cursor-pointer transition-all text-center py-2 ${
                        formData.category === cat 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:border-primary"
                      }`}
                      onClick={() => handleInputChange("category", cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of your proposal. Explain the problem, solution, and expected outcomes."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-2 min-h-[150px]"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Be thorough and clear. This will help members make informed decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card className="dao-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Voting Parameters
              </CardTitle>
              <p className="text-muted-foreground">
                Configure the voting rules for your proposal
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Voting Duration</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {presetDurations.map((preset) => (
                    <Badge
                      key={preset.days}
                      variant={formData.votingDuration === preset.days ? "default" : "outline"}
                      className={`cursor-pointer transition-all text-center py-2 ${
                        formData.votingDuration === preset.days 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:border-primary"
                      }`}
                      onClick={() => handleInputChange("votingDuration", preset.days)}
                    >
                      {preset.label}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3">
                  <Label htmlFor="custom-duration">Custom Duration (days)</Label>
                  <Input
                    id="custom-duration"
                    type="number"
                    placeholder="Enter custom duration"
                    value={formData.customDuration}
                    onChange={(e) => {
                      handleInputChange("customDuration", e.target.value)
                      handleInputChange("votingDuration", parseInt(e.target.value) || 7)
                    }}
                    className="mt-1"
                  />
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="quorum">Quorum Requirement: {formData.quorum}%</Label>
                <input
                  type="range"
                  id="quorum"
                  min="10"
                  max="50"
                  value={formData.quorum}
                  onChange={(e) => handleInputChange("quorum", parseInt(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>10%</span>
                  <span>Minimum participation required</span>
                  <span>50%</span>
                </div>
              </div>

              <div>
                <Label htmlFor="threshold">Approval Threshold: {formData.threshold}%</Label>
                <input
                  type="range"
                  id="threshold"
                  min="50"
                  max="80"
                  value={formData.threshold}
                  onChange={(e) => handleInputChange("threshold", parseInt(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>50%</span>
                  <span>Votes needed to pass</span>
                  <span>80%</span>
                </div>
              </div>

              <div>
                <Label htmlFor="execution-delay">Execution Delay: {formData.executionDelay} days</Label>
                <input
                  type="range"
                  id="execution-delay"
                  min="0"
                  max="14"
                  value={formData.executionDelay}
                  onChange={(e) => handleInputChange("executionDelay", parseInt(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>Immediate</span>
                  <span>Delay before execution</span>
                  <span>2 weeks</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card className="dao-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Review & Submit
              </CardTitle>
              <p className="text-muted-foreground">
                Review your proposal before submitting it to the DAO
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border border-border rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold">Title</h3>
                  <p className="text-muted-foreground">{formData.title || "No title provided"}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold">Category</h3>
                  <Badge variant="outline" className="mt-1">
                    {formData.category || "No category"}
                  </Badge>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-muted-foreground text-sm">
                    {formData.description || "No description provided"}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm">Voting Duration</h4>
                    <p className="text-muted-foreground text-sm">{formData.votingDuration} days</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Quorum</h4>
                    <p className="text-muted-foreground text-sm">{formData.quorum}%</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Threshold</h4>
                    <p className="text-muted-foreground text-sm">{formData.threshold}%</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Execution Delay</h4>
                    <p className="text-muted-foreground text-sm">{formData.executionDelay} days</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-warning">Important Notice</h4>
                    <p className="text-sm text-warning/80">
                      Once submitted, this proposal cannot be edited. Make sure all details are correct.
                      The proposal will immediately be available for voting by DAO members.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/proposals")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Create Proposal</h1>
            <p className="text-muted-foreground mt-1">
              Submit a new proposal for the DAO community to vote on
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="dao-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Proposal Details</span>
            <span>Voting Parameters</span>
            <span>Review & Submit</span>
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleDraft}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          
          {currentStep < totalSteps ? (
            <Button variant="dao" onClick={handleNext}>
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button variant="dao" onClick={handleSubmit}>
              <Send className="w-4 h-4 mr-2" />
              Submit Proposal
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}