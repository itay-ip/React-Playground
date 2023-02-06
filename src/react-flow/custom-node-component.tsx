import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

export const CustomNodeComponent = memo(({ data, isConnectable }: CustomNodeProps) => {
	const [options, setOptions] = useState<string[]>([]);

	const handleAddOption = () => {

		if (options.length < 9) {
			setOptions((opts) => [...opts, '']);
			// console.log(options);
		} else {
			alert('ניתן להגדיר עד 9 אפשרויות');
		}
	}

	const handleRemoveOption = (index: number) => {
		// console.log('remove ', index);
		// console.log(options.filter((opt, idx) => idx !== index));
		setOptions(options.filter((opt, idx) => idx !== index));
		// console.log(options);
	}

  return (
    <div style={{backgroundColor: '#FFFFFF', borderRadius: '0.8rem', paddingBlock: '8px', paddingInline: '4px'}}>
      { !data.isRoot && 
				<Handle
					id={data.nodeId + "-input"}
					type="target"
					position={Position.Right}
					style={{ top: 20, background: 'linear-gradient(225deg, #282fef, #33b1ff)' }}
					// onConnect={(params) => console.log('handle onConnect', params)}
					isConnectable={isConnectable}
				/>
			}
			
			<div /* Title */ style={{textAlign: 'center', marginBlockEnd: '4px'}}>
				{data.title}
			</div>

      <div style={{display: 'flex', flexDirection: 'column' , direction: 'rtl', justifyContent: 'center', alignItems: 'center'}}>
				<div style={{marginBlockEnd: '12px'}}>
					
					<input style={{backgroundColor: '#F2F5F8', border: 'none', borderRadius: '0.5rem', paddingInline: '4px', minHeight: '30px'}} 
						placeholder='הטקסט שלך כאן'
					 	className='nodrag'
					>
					</input>
				</div>

				
				{
					options.map((option, index) => {
						// console.log(option, index);
						return (
							/**
							 * Option component - which includes a text field and a handle
							 */
							<span key={index}>

								<button onClick={() => handleRemoveOption(index)}>X</button>


								<input className="nodrag" type="text" onChange={(e) => {
									const newOpts = [...options];
									newOpts[index] = e.target.value;
									console.log(newOpts);
									return setOptions(newOpts);
								}} placeholder={'הטקסט שלך כאן'} value={options[index]}/>


								<Handle
									id={`${data.nodeId}-${index}`}
									type="source"
									position={Position.Left}
									style={{ top: 'auto', bottom: 'auto', background: 'linear-gradient(225deg, #282fef, #33b1ff)' }}
									isConnectable={isConnectable}
								/>
							</span>
						)
					})
				}
				
				<button 
					onClick={handleAddOption}
					style={{width: 'fit-content', marginBlockStart: '12px'}}
				>
					הוספת אפשרות
				</button>
			</div>
    </div>
  );
});




interface CustomNodeProps {
	data: NodeData,
	isConnectable: boolean,
}

interface NodeData {
	title: string,
	content: string,
	onChange: (e: any) => {},
	isRoot?: boolean,
	nodeId: string
}