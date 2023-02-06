import { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Position, Connection, Edge, MarkerType, updateEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import { CustomNodeComponent } from './custom-node-component';
import { CustomEdge } from './custom/custom-edge-component';


const connectionLineStyle = { stroke: '#9AD4F1' };
const edgeMarkerEnd = { type: MarkerType.Arrow, strokeWidth: 2, color: '#9AD4F1' };

const nodeTypes = {
  customNode: CustomNodeComponent,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

export const CustomFlow = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const edgeUpdateSuccessful = useRef(true);
  
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

  useEffect(() => {
    

    setNodes([
      { /* Initial root node */
        id: 'IVR_root',
        type: 'customNode',
        data: { onChange: onChange, title: 'Root node', isRoot: true, nodeId: 'IVR_root' },
        position: { x: 650, y: -50 },
        targetPosition: Position.Left,
      }
   ]);

    setEdges([]);
  }, []);

  const onConnect = useCallback(
    (params: Edge<any> | Connection) => {
      console.log('onConnect');
      setEdges((eds) => {
        if (eds.some(edge => edge.sourceHandle === params.sourceHandle)) {
          console.log('Do not connect - already has an edge');
          return eds;
        }
        if (params.source === params.target) {
          console.log('Do not connect - loop detected');
          return eds;
        }
        return addEdge({ ...params, style: { stroke: '#9AD4F1' }, type: 'customEdge', markerEnd: edgeMarkerEnd }, eds);
      })
    },
    []
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge<any>, newConnection: any) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: { id: string; }) => {

    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <>
      <button 
        onClick={() => {
          const id = uuidv4();
          setNodes((nodes) => [...nodes, {
            id,
            type: 'customNode',
            position: { x: 450, y: -50 },
            data: { onChange: onChange, title: 'כותרת', nodeId: id },
            targetPosition: Position.Right,
        }])
      }}
      >
        הוספת תיבה חדשה
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        style={{ background: '#000000' }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineStyle={connectionLineStyle}
        defaultViewport={defaultViewport}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
      </ReactFlow>
    </>
  );
};