import { useState } from "react";
import type { RollResult } from "../types";

interface LabelItem{
    id: string;
    text: string;
    stars: number;
    RollResult: RollResult
}
interface LabelProps {
    label: LabelItem;
    onChange: (updated: LabelItem) => void;
    onDelete: () => void;
}
const renderStars = (n:number) => "⭐".repeat(n);
export const SliderInput = () => {
    const [labels,setLabels] = useState<LabelItem[]>([]);
    const [text,setText] = useState("");
    const [stars,setStars] = useState(1);
    const [rollCat,setrollCat] = useState<RollResult>("default");
    const updateLabel = (id:string, updated:LabelItem) => {
        setLabels((prev) =>
            prev.map((l) => l.id === id ? updated : l)
        );
    };
    const deleteLabel = (id: string) => {
    setLabels((prev) => prev.filter((l) => l.id !== id));
  };
    const addLabel = () => {
        const label = "⭐".repeat(stars);
        setLabels((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                text: label,
                stars: 0,
                RollResult: rollCat
            },
        ]);
    };
    
    return <div>
        {labels.map((label) => (
             <li key={label.id}>
            <strong>{label.text}</strong> ({label.RollResult})

            <button
                onClick={() =>
                    setLabels(prev =>
                        prev.filter(l => l.id !== label.id)
                    )
                }
            >
                Delete
            </button>
        </li>
        ))}
        <div>
            <input type="number" 
            min={0}
            max={10}
            value={stars}
            onChange={(e) =>
            setStars(Number(e.target.value))
            }
            />
        </div>
        <select
        value ={rollCat}
        onChange={(e)=>
            setrollCat(e.target.value as RollResult)
        }
        >
            <option value="Good Roll">⭐⭐⭐</option>
            <option value="Bad Roll">⭐⭐</option>
            <option value="Neutral Roll">⭐</option>
        </select>
        <button onClick={addLabel}>Add Label</button>
    </div>
}