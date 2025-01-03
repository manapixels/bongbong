import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import confetti from 'canvas-confetti';

interface TestResults {
  accuracy: number;
  averageTime: number;
  grade: string;
  weakestCategory: string;
  recommendations: string[];
}

export function TestResultsModal({
  results,
  isOpen,
  onClose
}: {
  results: TestResults;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen && results.grade === 'A') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen, results.grade]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Test Results</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="text-center">
            <div className="text-7xl font-bold mb-4">{results.grade}</div>
            <Progress value={results.accuracy} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {results.accuracy.toFixed(1)}% Accuracy
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Statistics</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Average Time:</div>
              <div>{results.averageTime.toFixed(1)}s</div>
              <div>Weakest Category:</div>
              <div>{results.weakestCategory}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Recommendations</h4>
            <ul className="list-disc pl-4 text-sm space-y-1">
              {results.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>

        <Button onClick={onClose}>Continue Practice</Button>
      </DialogContent>
    </Dialog>
  );
} 