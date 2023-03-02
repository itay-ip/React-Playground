import { memo, useState } from 'react';
import { Handle, Position, useNodeId } from 'reactflow';
import './custom-node.css';

const COLOR = 'linear-gradient(225deg, #282fef, #33b1ff)';

export const CustomNodeComponent = memo(({ data, isConnectable }: CustomNodeProps) => {
	const [message, setNodeMessage] = useState<string>(data.messageContent || '');
	const nodeId = useNodeId();
	const [options, setOptions] = useState<string[]>(data.options);

  const handleAddOption = () => {
    debugger
    if (data.options?.length < 9) {
      setOptions((opts) => {
        data.options = [...opts, ''];
        return data.options;
      });
    } else {
      alert('ניתן להגדיר עד 9 אפשרויות');
    }
  }

	const handleRemoveOption = (index: number) => {
		// data.options = [...options].filter((_, idx) => idx !== index);
		// console.log(data?.onRemove);
		// data?.onRemove(nodeId || '', nodeId + `-${index}`);
		// return setOptions(data.options);
	}

	const onMessageChange = (e: any) => {
		data.messageContent = e.target.value;
		setNodeMessage(data.messageContent);
	}
	
  return (
    <div className='node'>
			
      { !isRoot(nodeId!) &&
				<Handle
					id={nodeId + "-input"}
					type="target"
					position={Position.Right}
					style={{ top: 20, right: -2, zIndex: 1 , background: '#FFF', border: '1px solid black' }}
					// className='targetHandle'
					isConnectable={isConnectable}
				/>
			}
			
			<div /* Header */ className='header'>
				<span style={{marginInlineStart: '4px'}}>{data.title}</span>
				<div style={{transform: 'rotate(90deg)', marginInlineEnd: '12px'}}>...</div>
			</div>

      <div className='body'>
        <textarea
          placeholder={isRoot(nodeId!) ? 'הכנס טקסט כאן לדוגמא: שלום! אני הבוט החכם של מחלקת התמיכה. באיזה נושא אתם זקוקים לתמיכה?' : 'הטקסט שלך כאן'}
          onChange={onMessageChange}
          className='messageContent'
          value={data.messageContent}
        />
        {
          data.options?.map((option, index) => {
            return (
              <span key={index} className="option">
                <button onClick={() => handleRemoveOption(index)} className="deleteButton">
                  X
                </button>
                <input className="hadshanutInput" type="text" onChange={(e) => {
                  const newOpts = [...options];
                  newOpts[index] = e.target.value;
                  data.options = newOpts;
                  return setOptions(newOpts);
                }} placeholder={'הטקסט שלך כאן'} value={option} />
                <div className='dottedLink' />
                <Handle
                  id={`${nodeId}-${index}`}
                  type="source"
                  position={Position.Left}
                  className={"portConnectable"}
                  isConnectable={isConnectable}
                />
              </span>
            )
          })
        }
        {
          (!data.options || data.options.length < 9) &&
          <button
            onClick={handleAddOption}
            className="plusButton"
          >
            +
          </button>
        }
        <span style={{ boxShadow: 'inset 0px -1px 0px #BCC3CB', width: '90%', height: '1px', marginBlock: '16px' }}></span>
        <span style={{ display: 'flex', justifyContent: 'space-evenly', width: '90%', alignItems: 'center' }}>
          <input type="checkbox" />
          <span>הצג כפתור חזרה לתפריט הראשי</span>
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
	options: string[]
}