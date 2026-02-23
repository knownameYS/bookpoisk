import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface TasteGraphProps {
  architecture: number;
  characters: number;
  language: number;
  idea: number;
  vibe: number;
  size?: 'small' | 'medium' | 'large';
}

export default function TasteGraph({ 
  architecture, 
  characters, 
  language, 
  idea, 
  vibe,
  size = 'medium' 
}: TasteGraphProps) {
  const data = [
    { criterion: 'A', value: architecture, fullName: 'Architecture' },
    { criterion: 'C', value: characters, fullName: 'Characters' },
    { criterion: 'L', value: language, fullName: 'Language' },
    { criterion: 'I', value: idea, fullName: 'Idea' },
    { criterion: 'V', value: vibe, fullName: 'Vibe' },
  ];

  const heights = {
    small: 150,
    medium: 250,
    large: 350,
  };

  return (
    <div style={{ width: '100%', height: heights[size] }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="criterion" 
            tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 10]} 
            tick={{ fill: '#9ca3af', fontSize: 10 }}
          />
          <Radar 
            name="Taste Profile" 
            dataKey="value" 
            stroke="#6366f1" 
            fill="#6366f1" 
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
