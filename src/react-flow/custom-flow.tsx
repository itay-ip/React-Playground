import { useState, useEffect, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Position, Connection, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

import { CustomNodeComponent } from './custom-node-component';

const initBgColor = 'white';

const connectionLineStyle = { stroke: '#fff' };
// const snapGrid = [20, 20];
const nodeTypes = {
  asdasd: CustomNodeComponent,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

export const CustomFlow = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event: any) => {
			console.log('onChange');
      setNodes((nds) =>
        nds.map((node) => {
          console.log('Event: ',event.target.value);

          return {
            ...node,
            data: {
              ...node.data,
              content: event.target.value,
            },
          };
        })
      );
    };

    setNodes([
    {
      id: 'IVR_root',
      type: 'asdasd',
      data: { onChange: onChange, label: 'selectorNode', name: 'My Custom Node' },
      style: { border: '1px solid #777', padding: 10},
      position: { x: 0, y: 0 },
      targetPosition: Position.Left,
      sourcePosition: Position.Top
    },
		{
      id: '3',
      type: 'input',
      data: { label: 'Output A' },
      position: { x: 650, y: 25 },
      sourcePosition: Position.Left,
    },
    {
      id: '4',
      type: 'output',
      data: { label: 'Output B' },
      position: { x: 650, y: 100 },
      targetPosition: Position.Left,
    }
   ]);

    setEdges([]);
  }, []);

  const onConnect = useCallback(
    (params: Edge<any> | Connection) =>
      setEdges((eds) => addEdge({ ...params, /** animated: true, */ style: { stroke: '#fff' } }, eds)),
    []
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: '#000000' }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
    //   snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition="bottom-left"
    >
      <Controls />
    </ReactFlow>
  );
};