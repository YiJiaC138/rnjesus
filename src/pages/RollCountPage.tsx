import { useState } from 'react';
import type {DragEvent} from 'react';
import '../components/Components.css';
import { CountControls } from '../components/CountControls.tsx';
import type { RollHistoryItem } from '../types.ts';
import { classifyRollResult, rollUntilGood } from '../components/utils/RollActions.ts';
import { HistorySidebar } from '../components/HistorySidebar.tsx';

export const RollCountPage = () => {
  const [probability, setProbability] = useState<number>(3);
  const [counter, setCounter] = useState<number>(0);
  const [historyCount, setHistoryCount] = useState<RollHistoryItem[]>([]);
  //Preview image
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const onClickRoll = () => {
  
    const count = rollUntilGood(probability);
    if (count === null) return;
  
    setCounter(count);
    setHistoryCount(prevHistoryCount => [...prevHistoryCount, {
      id: crypto.randomUUID(),
      result: classifyRollResult(count),
      value: count.toString(),
      rate: probability,
    }]);
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    // Get the first file dropped
    const file = e.dataTransfer.files?.[0];
    
    // Check if a file exists and if it's an image
    if (file && file.type.startsWith('image/')) {
      // Create a temporary URL for the image to preview it
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  }


  return (
    <div className="app-container">
    <main className="main-content">
      <h1>Roll Counter</h1>
      <p>Predict how many rolls it will take to get a good roll.</p>
      
      <div className="scorecounter">
      <div className="scorecounter-value">
        <span className="scorecounter-value-text">{counter}</span>
        <span>Rolls to get a good roll</span>
      </div>
        
      </div>
      {/* Dedicated Drop Zone */}
      <div 
          className={`drop-zone ${isDragging ? 'dragging' : ''} ${previewImage ? 'has-preview' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {previewImage ? (
            <div className="image-preview">
              <img 
                src={previewImage} 
                alt="Dropped preview" 
              />
              <div>
                <button onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering drop zone events
                  setPreviewImage(null);
                }}>
                  Clear Image
                </button>
              </div>
            </div>
          ) : (
            <p>Drag and drop an image here to upload and analyze it.</p>
          )}
        </div>
        
        
      <CountControls probability={probability} setProbability={setProbability} performRoll={onClickRoll} />
      
    </main>
    <HistorySidebar history={historyCount} clearHistory={() => setHistoryCount([])} />
    </div>
  );
};
