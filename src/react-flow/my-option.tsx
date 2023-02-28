import { useState } from "react";
import { Handle, Position } from "reactflow";


export const MyOption = ({ index, handleId, onRemove }: OptionProps) => {
	const [val, setVal] = useState<string>();
	return (
		<>
			<span key={index} style={{marginBlockStart: '8px', display: 'flex', alignItems: 'center', alignContent: 'center'}}>

				<button onClick={onRemove}>X</button>

				<input
				className="nodrag"
				type="text"
				onChange={(e) => setVal(e.target.value)} 
				placeholder={'הטקסט שלך כאן'} 
				value={val || ''} 
				/>

				<Handle
				id={handleId}
				type="source"
				position={Position.Left}
				style={{top: 'auto', marginBlockStart: '8px', position: 'absolute', background: 'linear-gradient(225deg, #282fef, #33b1ff)' }}
			/>
			</span>
		</>
	)
}

interface OptionProps {
	index: number,
	handleId: string,
	onRemove: () => void
}