'use client';

import { Card } from '@/components/ui/card';
import {
  generatePlaceValueChart,
  generateFractionVisual,
  generateBarModel
} from '@/lib/utils/visualHelpers';

interface VisualAidProps {
  type: 'place-value' | 'fraction' | 'bar-model';
  data: {
    number?: number;
    numerator?: number;
    denominator?: number;
    parts?: number[];
    labels?: string[];
  };
}

export function VisualAid({ type, data }: VisualAidProps) {
  const getVisual = () => {
    switch (type) {
      case 'place-value':
        return data.number ? generatePlaceValueChart(data.number) : null;
      case 'fraction':
        return data.numerator && data.denominator
          ? generateFractionVisual(data.numerator, data.denominator)
          : null;
      case 'bar-model':
        return data.parts && data.labels
          ? generateBarModel(data.parts, data.labels)
          : null;
      default:
        return null;
    }
  };

  const visual = getVisual();
  if (!visual) return null;

  return (
    <Card className="p-4 font-mono whitespace-pre">
      {visual}
    </Card>
  );
} 