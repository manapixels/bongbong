interface CircleFractionProps {
  fraction: number; // Value between 0 and 1
  size?: number; // SVG size in pixels
  colors?: {
    background?: string;
    shaded?: string;
    border?: string;
  };
}

export function generateFractionCircleSVG({
  fraction,
  size = 200,
  colors = {
    background: '#ffffff',
    shaded: '#4f46e5', // Indigo color
    border: '#000000',
  },
}: CircleFractionProps): string {
  // Validate fraction
  if (fraction < 0 || fraction > 1) {
    throw new Error('Fraction must be between 0 and 1');
  }

  // Calculate SVG parameters
  const center = size / 2;
  const radius = (size * 0.8) / 2; // 80% of size for margins
  const angle = fraction * 360; // Convert fraction to degrees

  // Calculate path for the shaded portion
  const createArcPath = (endAngle: number): string => {
    // Convert angle to radians
    const angleRad = (endAngle - 90) * (Math.PI / 180);

    // Calculate end point
    const endX = center + radius * Math.cos(angleRad);
    const endY = center + radius * Math.sin(angleRad);

    // Determine if we need a large arc
    const largeArcFlag = endAngle > 180 ? 1 : 0;

    // Create path
    return [
      `M ${center} ${center}`, // Move to center
      `L ${center} ${center - radius}`, // Line to top
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      'Z', // Close path
    ].join(' ');
  };

  // Create the SVG markup
  const svgMarkup = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background circle -->
      <circle 
        cx="${center}" 
        cy="${center}" 
        r="${radius}"
        fill="${colors.background}"
        stroke="${colors.border}"
        stroke-width="2"
      />
      
      <!-- Shaded portion -->
      ${
        fraction > 0
          ? `
        <path
          d="${createArcPath(angle)}"
          fill="${colors.shaded}"
          stroke="${colors.border}"
          stroke-width="2"
        />
      `
          : ''
      }
      
      <!-- Border circle -->
      <circle 
        cx="${center}" 
        cy="${center}" 
        r="${radius}"
        fill="none"
        stroke="${colors.border}"
        stroke-width="2"
      />
    </svg>
  `;

  // Convert SVG to data URL
  const svgBase64 = Buffer.from(svgMarkup).toString('base64');
  return `data:image/svg+xml;base64,${svgBase64}`;
}

export interface ShapeProps {
  type:
    | 'rectangle'
    | 'square'
    | 'triangle'
    | 'circle'
    | 'half-circle'
    | 'quarter-circle';
  size?: number;
  width?: number;
  height?: number;
  colors?: {
    fill?: string;
    border?: string;
  };
}

interface ClockProps {
  hours: number;
  minutes: number;
  size?: number;
}

interface GraphProps {
  data: number[];
  labels?: string[];
  type: 'bar' | 'picture';
  size?: { width: number; height: number };
}

export function generateShapeSVG({
  type,
  size = 200,
  width = size,
  height = size,
  colors = { fill: '#ffffff', border: '#000000' },
}: ShapeProps): string {
  const svgMarkup = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${(() => {
        switch (type) {
          case 'rectangle':
            return `<rect x="${width * 0.1}" y="${height * 0.1}" width="${width * 0.8}" height="${height * 0.8}" fill="${colors.fill}" stroke="${colors.border}" stroke-width="2"/>`;
          case 'square':
            const sideLength = Math.min(width, height) * 0.8;
            return `<rect x="${(width - sideLength) / 2}" y="${(height - sideLength) / 2}" width="${sideLength}" height="${sideLength}" fill="${colors.fill}" stroke="${colors.border}" stroke-width="2"/>`;
          case 'triangle':
            return `<path d="M ${width / 2} ${height * 0.1} L ${width * 0.1} ${height * 0.9} L ${width * 0.9} ${height * 0.9} Z" fill="${colors.fill}" stroke="${colors.border}" stroke-width="2"/>`;
          case 'circle':
            const radius = Math.min(width, height) * 0.4;
            return `<circle cx="${width / 2}" cy="${height / 2}" r="${radius}" fill="${colors.fill}" stroke="${colors.border}" stroke-width="2"/>`;
          case 'half-circle':
            return `<path d="M ${width * 0.1} ${height / 2} A ${width * 0.4} ${height * 0.4} 0 0 1 ${width * 0.9} ${height / 2}" fill="none" stroke="${colors.border}" stroke-width="2"/>`;
          case 'quarter-circle':
            return `<path d="M ${width * 0.1} ${height * 0.9} A ${width * 0.8} ${height * 0.8} 0 0 1 ${width * 0.9} ${height * 0.1}" fill="none" stroke="${colors.border}" stroke-width="2"/>`;
          default:
            return '';
        }
      })()}
    </svg>
  `;

  const svgBase64 = Buffer.from(svgMarkup).toString('base64');
  return `data:image/svg+xml;base64,${svgBase64}`;
}

export function generateClockSVG({
  hours,
  minutes,
  size = 200,
}: ClockProps): string {
  const center = size / 2;
  const radius = size * 0.4;

  // Calculate hand angles
  const hourAngle = ((hours % 12) + minutes / 60) * 30 - 90; // -90 to start at 12 o'clock
  const minuteAngle = minutes * 6 - 90;

  const hourHandLength = radius * 0.5;
  const minuteHandLength = radius * 0.8;

  const svgMarkup = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Clock face -->
      <circle cx="${center}" cy="${center}" r="${radius}" fill="white" stroke="black" stroke-width="2"/>
      
      <!-- Hour markers -->
      ${Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = center + radius * 0.9 * Math.cos(angle);
        const y1 = center + radius * 0.9 * Math.sin(angle);
        const x2 = center + radius * Math.cos(angle);
        const y2 = center + radius * Math.sin(angle);
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2"/>`;
      }).join('')}
      
      <!-- Hour hand -->
      <line 
        x1="${center}"
        y1="${center}"
        x2="${center + hourHandLength * Math.cos((hourAngle * Math.PI) / 180)}"
        y2="${center + hourHandLength * Math.sin((hourAngle * Math.PI) / 180)}"
        stroke="black"
        stroke-width="3"
      />
      
      <!-- Minute hand -->
      <line
        x1="${center}"
        y1="${center}"
        x2="${center + minuteHandLength * Math.cos((minuteAngle * Math.PI) / 180)}"
        y2="${center + minuteHandLength * Math.sin((minuteAngle * Math.PI) / 180)}"
        stroke="black"
        stroke-width="2"
      />
      
      <!-- Center dot -->
      <circle cx="${center}" cy="${center}" r="3" fill="black"/>
    </svg>
  `;

  const svgBase64 = Buffer.from(svgMarkup).toString('base64');
  return `data:image/svg+xml;base64,${svgBase64}`;
}

export function generateGraphSVG({
  data,
  labels = [],
  type,
  size = { width: 300, height: 200 },
}: GraphProps): string {
  const padding = 40;
  const chartWidth = size.width - padding * 2;
  const chartHeight = size.height - padding * 2;
  const maxValue = Math.max(...data);

  const svgMarkup = `
    <svg width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}" xmlns="http://www.w3.org/2000/svg">
      ${
        type === 'bar'
          ? // Bar chart
            data
              .map((value, i) => {
                const barWidth = (chartWidth / data.length) * 0.8;
                const barHeight = (value / maxValue) * chartHeight;
                const x =
                  padding + (chartWidth / data.length) * i + barWidth * 0.1;
                const y = size.height - padding - barHeight;
                return `
            <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#4f46e5"/>
            ${labels[i] ? `<text x="${x + barWidth / 2}" y="${size.height - padding + 20}" text-anchor="middle">${labels[i]}</text>` : ''}
          `;
              })
              .join('')
          : // Picture graph (simplified)
            data
              .map((value, i) => {
                return Array.from({ length: value }, (_, j) => {
                  const x = padding + (i * chartWidth) / data.length;
                  const y = size.height - padding - (j + 1) * 20;
                  return `<circle cx="${x}" cy="${y}" r="8" fill="#4f46e5"/>`;
                }).join('');
              })
              .join('')
      }
      
      <!-- Axes -->
      <line x1="${padding}" y1="${size.height - padding}" x2="${size.width - padding}" y2="${size.height - padding}" stroke="black"/>
      <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${size.height - padding}" stroke="black"/>
    </svg>
  `;

  const svgBase64 = Buffer.from(svgMarkup).toString('base64');
  return `data:image/svg+xml;base64,${svgBase64}`;
}
