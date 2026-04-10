import { MultipleScroller } from '../components/Sliders/MultipleSlider.tsx';
import { useState } from 'react';


export const ToolTwo = () => {
  const [probabilities, setProbabilities] = useState<number[]>([33.3, 33.3, 33.4]);
  return (
  <div className="main-content">
    <h1>Tool Two</h1>
    <p>This is a placeholder for Tool Two.</p>
    <MultipleScroller 
      probabilities={probabilities} 
      setProbabilities={setProbabilities} 
      labels={["Option A", "Option B", "Option C"]}
    />
  </div>
)
};
