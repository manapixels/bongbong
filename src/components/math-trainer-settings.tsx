import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { soundManager } from '@/lib/utils/effects';

interface Settings {
  visualAidsEnabled: boolean;
  soundEffectsEnabled: boolean;
  preferredLearningStyle: 'visual' | 'numeric' | 'word-problems';
}

export function MathTrainerSettings({
  settings,
  onUpdate
}: {
  settings: Settings;
  onUpdate: (settings: Partial<Settings>) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="visual-aids">Visual Aids</Label>
          <Switch
            id="visual-aids"
            checked={settings.visualAidsEnabled}
            onCheckedChange={(checked) => onUpdate({ visualAidsEnabled: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sound-effects">Sound Effects</Label>
          <Switch
            id="sound-effects"
            checked={settings.soundEffectsEnabled}
            onCheckedChange={(checked) => {
              onUpdate({ soundEffectsEnabled: checked });
              soundManager.setEnabled(checked);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Learning Style</Label>
          <Select
            value={settings.preferredLearningStyle}
            onValueChange={(value: Settings['preferredLearningStyle']) => 
              onUpdate({ preferredLearningStyle: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visual">Visual</SelectItem>
              <SelectItem value="numeric">Numeric</SelectItem>
              <SelectItem value="word-problems">Word Problems</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
} 