import { ChangeEvent, memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './node.css';

const COLOR = 'linear-gradient(225deg, #282fef, #33b1ff)';

export const CustomNodeComponent = memo(({ data, isConnectable }: CustomNodeProps) => {
	const [message, setNodeMessage] = useState<string>();
	const [options, setOptions] = useState<string[]>([]);

	const handleAddOption = () => {

		if (options.length < 9) {
			setOptions((opts) => {
				data.options = [...opts, ''];
				return data.options;
			});
		} else {
			alert('ניתן להגדיר עד 9 אפשרויות');
		}
	}

	const handleRemoveOption = (index: number) => {
		data.options = [...options].filter((_, idx) => idx !== index);
		return setOptions(data.options);
	}

	const onMessageChange = (e: any) => {
		data.messageContent = e.target.value;
		setNodeMessage(data.messageContent);
	}
	{console.log(isRoot(data?.nodeId))}
  return (
    <div className='node'>
			
      { !isRoot(data?.nodeId) && 
				<Handle
					id={data.nodeId + "-input"}
					type="target"
					position={Position.Right}
					style={{ top: 20, zIndex: 1 , background: 'transparent', border: 'none' }}
					isConnectable={isConnectable}
				/>
			}
			
			<div /* Title */ className='header'>
				<span style={{marginInlineStart: '4px'}}>{data.title}</span>
				<div style={{transform: 'rotate(90deg)', marginInlineEnd: '12px'}}>...</div>
			</div>

      <div className='body'>
				<div className='title' style={{marginBlockEnd: '12px'}}>
					
					<input
						placeholder='הטקסט שלך כאן'
						onChange={onMessageChange}
					 	className='messageContent'
						value={data.messageContent}
					>
					</input>
				</div>

				
				{
					data.options?.map((option, index) => {
						return (
							<span key={index} style={{marginBlockStart: '8px', display: 'flex', alignItems: 'center', alignContent: 'center'}}>

								<button onClick={() => handleRemoveOption(index)}>X</button>


								<input className="nodrag" type="text" onChange={(e) => {
									const newOpts = [...options];
									newOpts[index] = e.target.value;
									data.options = newOpts;
									return setOptions(newOpts);
								}} placeholder={'הטקסט שלך כאן'} value={option}/>


								<Handle
									id={`${data.nodeId}-${index}`}
									type="source"
									position={Position.Left}
									style={{ top: 'auto', marginBlockStart: '8px', background: 'linear-gradient(225deg, #282fef, #33b1ff)'  }}
									isConnectable={isConnectable}
								/>
							</span>
						)
					})
				}
				
				{
					options.length < 9 && 
					<button 
						onClick={handleAddOption}
						style={{width: 'fit-content', marginBlockStart: '12px'}}
					>
					+
					</button>
				}
				<span style={{boxShadow: 'inset 0px -1px 0px #BCC3CB', width: '90%', height: '1px', marginBlock: '16px'}}></span>
				<span style={{display: 'flex', justifyContent: 'space-evenly', width: '90%', alignItems: 'center'}}>
					<input type="checkbox" />
					<span style={{fontSize: '0.59rem'}}>הצג כפתור חזרה לתפריט הראשי</span>
				</span>
			</div>
    </div>
  );
});

const isRoot = (uuid: string) => {
	return uuid === '00000000-0000-0000-0000-00000000abba';
}


interface CustomNodeProps {
	data: NodeData,
	isConnectable: boolean,
}

interface NodeData {
	title: string,
	messageContent: string,
	onChange: (e: any) => {},
	nodeId: string,
	options: string[]
}