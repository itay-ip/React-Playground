import { memo, useEffect, useState } from 'react';
import { Handle, NodeProps, Position, useNodeId } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import './custom-node.css';

const COLOR = 'linear-gradient(225deg, #282fef, #33b1ff)';
const deepCopyMap = (map: Map<string, string>) => new Map<string, string>(JSON.parse(JSON.stringify(Array.from(map))));


export const CustomNodeComponent = memo(({ data, isConnectable }: CustomNodeProps) => {
	const nodeId = useNodeId();
	const [options, setOptions] = useState<Map<string, string>>(new Map<string, string>());
	const [messageContent, setMessageContent] = useState<string>();

  const opts = Array.from(options, (entry) => {
    return { portId: entry[0], data: entry[1] }
  });

  useEffect(() => {
    console.log(`props of ${nodeId} were changed`);
    if (data.options) {
      setOptions(deepCopyMap(data.options));
    }

  }, [data]);

  const handleAddOption = () => {
    if (options.size >= 9) {
      return;
    }
    const newOptions = deepCopyMap(options);
    newOptions.set(uuidv4(), '');
    console.log(newOptions);
    setOptions(newOptions);
    data.options = newOptions;
  }

	const handleRemoveOption = (id: string) => {
		const newOptions = deepCopyMap(options);
    newOptions.delete(id);
    setOptions(newOptions);
    data.options = newOptions;
	}

  const handleEditOption = (id: string, newText: string) => {
    const newOptions = deepCopyMap(options);
    newOptions.set(id, newText);
    setOptions(newOptions);
    data.options = newOptions;
  }

  const handleEditMessageContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setMessageContent(newText);
    data.messageContent = newText;
  }

  return (
    <div className='node'>
			
      { !isRoot(nodeId!) &&
				<Handle
					id={nodeId + "-input"}
					type="target"
					position={Position.Right}
					style={{ top: 20, right: -2, zIndex: 1 }}
					className='portConnectable'
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
          onChange={handleEditMessageContent}
          className='messageContent'
          value={messageContent || ''}
        />
        {
          opts?.map((option, index) => {
            return (
              <span key={index} className="option">
                <button onClick={() => handleRemoveOption(option.portId)} className="deleteButton">
                  X
                </button>
                <input className="hadshanutInput" type="text" onChange={(e) => handleEditOption(option.portId, e.target.value)} placeholder={'הטקסט שלך כאן'} value={option.data} />
                <div className='dottedLink' />
                <Handle
                  id={`${option.portId}`}
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
          (!opts || opts?.length < 9) &&
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
	options: Map<string, string>,
  mainMenuCheckbox: boolean
}