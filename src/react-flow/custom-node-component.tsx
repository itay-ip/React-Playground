import { memo, useEffect, useState } from 'react';
import { Handle, Position, useNodeId, useStore } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import './custom-node.css';

const deepCopyArray = (arr: Option[]): Option[] => JSON.parse(JSON.stringify(arr));
const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

export const CustomNodeComponent = memo(({ data }: CustomNodeProps) => {
	const nodeId = useNodeId();
	const [options, setOptions] = useState<Option[]>([]);
	const [messageContent, setMessageContent] = useState<string>();
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const edges = useStore(store => store.edges);
  const isPortConnected = (portId: string) => {
    return edges.some(e => e.sourceHandle === portId);
  }
  const isTarget = connectionNodeId && connectionNodeId !== nodeId;
  // const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    console.log(`props of ${nodeId} were changed`);
    if (data.options) {
      setOptions(deepCopyArray(data.options));
    }
    if (data.messageContent) {
      setMessageContent(data.messageContent);
    }

  }, [data]);

  const handleAddOption = () => {
    if (options.length >= 9) {
      return;
    }
    const newOptions: Option[] = deepCopyArray(options);
    newOptions.push({ portId: uuidv4(), data: '' });
    setOptions(newOptions);
    data.options = newOptions;
    // updateNodeInternals(nodeId!);
  }

	const handleRemoveOption = (id: string) => {
		const newOptions = deepCopyArray(options).filter((opt) => opt.portId !== id);
    setOptions(newOptions);
    data.options = newOptions;
	}

  const onRemove = (portId: string) => {
    data.onRemoveOption(portId);
    handleRemoveOption(portId);
  }

  const handleEditOption = (index: number, newText: string) => {
    const newOptions = deepCopyArray(options);
    newOptions[index].data = newText;
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
					style={{ top: 20, right: -2, zIndex: 1, backgroundColor: isTarget ? '#51D5A5' : 'white', transition: isTarget ? 'background-color 0.8s' : 'none' }}
					className='portConnectable'
				/>
			}
			
			<div /* Header */ className='header'>
				<span style={{marginInlineStart: '4px', fontSize: 22}}>{data.title}</span>
				<div style={{transform: 'rotate(90deg)', fontSize: 30, cursor: 'pointer'}}>...</div>
			</div>

      <div className='body'>
        <textarea
          placeholder={isRoot(nodeId!) ? 'הכנס טקסט כאן לדוגמא: שלום! אני הבוט החכם של מחלקת התמיכה. באיזה נושא אתם זקוקים לתמיכה?' : 'הטקסט שלך כאן'}
          onChange={handleEditMessageContent}
          className='messageContent'
          value={messageContent || ''}
        />
        {
          options?.map((option, index) => {
            const isConnected = isPortConnected(option.portId);
            return (
              <span key={option.portId} className="option">
                <button onClick={() => onRemove(option.portId)} className="deleteButton">
                  X
                </button>
                <input
                  className="hadshanutInput"
                  type="text"
                  onChange={(e) => handleEditOption(index, e.target.value)}
                  placeholder={'הטקסט שלך כאן'}
                  value={option.data}
                />
                <div className='dottedLink' />
                <Handle
                  id={`${option.portId}`}
                  type="source"
                  position={Position.Left}
                  style={{left: -8}}
                  className={isConnected ? "portActive" : "portConnectable"}
                />
              </span>
            )
          })
        }
        {
          (!options || options?.length < 9) &&
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
}

interface NodeData {
	title: string,
	messageContent: string,
	options: Option[],
  mainMenuCheckbox: boolean,
  onRemoveOption: (id: string) => void,
  isPortConnected: (portId: string) => boolean
}

interface Option {
  portId: string,
  data: string
}