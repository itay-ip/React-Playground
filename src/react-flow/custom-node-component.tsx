import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

export const CustomNodeComponent = memo(({ data, isConnectable }: CustomNodeProps) => {
	const [options, setOptions] = useState([]);
  return (
    <div style={{backgroundColor: '#FFFFFF'}}>
      { !data.isRoot && 
				<Handle
					type="target"
					position={Position.Right}
					style={{ top: 10, background: 'linear-gradient(225deg, #282fef, #33b1ff)' }}
					onConnect={(params) => console.log('handle onConnect', params)}
					// isConnectable={isConnectable}
				/>
			}
			
      <div style={{display: 'flex', flexDirection: 'column', direction: 'rtl', justifyContent: 'center'}}>
				<div style={{marginBlock: '10px'}}>
					{data.name} <br />
					<input style={{backgroundColor: '#F2F5F8', border: 'none', borderRadius: '0.5rem'}}
					 	className='nodrag'
						// contentEditable='true'
						type='text'
					>
					
					</input>
				</div>

				<input className="nodrag" type="text" onChange={data.onChange} placeholder={'הטקסט שלך כאן'}/>
				
				
				<button>
					Add option
				</button>
			</div>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ top: 10, background: 'linear-gradient(225deg, #282fef, #33b1ff)' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
});


interface CustomNodeProps {
	data: NodeData,
	isConnectable: boolean,
	
}

interface NodeData {
	name: string,
	content: string,
	onChange: (e: any) => {},
	isRoot?: boolean
}