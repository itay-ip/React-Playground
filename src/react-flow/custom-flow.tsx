import { useEffect, useCallback, useRef, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Position, Connection, Edge, MarkerType, updateEdge, useReactFlow, ReactFlowProvider, NodeMouseHandler, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import { CustomNodeComponent } from './custom-node-component';
import { CustomEdge } from './custom/custom-edge-component';
import { Mashu } from './mashu';


const connectionLineStyle = { stroke: '#9AD4F1' };
const edgeMarkerEnd = { type: MarkerType.Arrow, strokeWidth: 2, color: '#9AD4F1' };

const nodeTypes = {
  customNode: CustomNodeComponent,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

const flow = {
  "nodes": [
      {
          "width": 327,
          "height": 371,
          "id": "00000000-0000-0000-0000-00000000abba",
          "type": "customNode",
          "data": {
              "title": "כותרת",
              "options": [
                  "123",
                  "34556"
              ]
          },
          "position": {
              "x": 906,
              "y": -75
          },
          "targetPosition": "left",
          "selected": false,
          "positionAbsolute": {
              "x": 906,
              "y": -75
          },
          "dragging": false,
          "style": {
              "backgroundColor": "transparent"
          }
      },
      {
          "width": 327,
          "height": 257,
          "id": "7fad242e-c03f-40f3-b163-dff60131fba9",
          "type": "customNode",
          "position": {
              "x": 450,
              "y": -50
          },
          "data": {
              "title": "כותרת"
          },
          "targetPosition": "right",
          "style": {
              "backgroundColor": "transparent"
          },
          "positionAbsolute": {
              "x": 450,
              "y": -50
          }
      }
  ],
  "edges": [
      {
          "source": "00000000-0000-0000-0000-00000000abba",
          "sourceHandle": "00000000-0000-0000-0000-00000000abba-0",
          "target": "7fad242e-c03f-40f3-b163-dff60131fba9",
          "targetHandle": "7fad242e-c03f-40f3-b163-dff60131fba9-input",
          "style": {
              "stroke": "#9AD4F1"
          },
          "type": "customEdge",
          "markerEnd": {
              "type": "arrow",
              "strokeWidth": 2,
              "color": "#9AD4F1"
          },
          "id": "reactflow__edge-00000000-0000-0000-0000-00000000abba00000000-0000-0000-0000-00000000abba-0-7fad242e-c03f-40f3-b163-dff60131fba97fad242e-c03f-40f3-b163-dff60131fba9-input"
      }
  ],
  "viewport": {
      "x": -667,
      "y": 261,
      "zoom": 2
  }
} as any

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

export const CustomFlow = () => {

  // const reactFlowInstance = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const edgeUpdateSuccessful = useRef(true);
  const edgeConnecting = useRef(false);

  const onRestore = useCallback(() => {
    console.log('restore');
    const restoreFlow = async () => {

      if (flow) {
        console.log(flow.nodes);

        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        // setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
    console.log('Nodes after restore: ', nodes);
  }, [setNodes]);

  useEffect(() => {
    /* onMount - Decide how to read a graph from JSON */
    setNodes([
      { /* Initial root node */
        id: '00000000-0000-0000-0000-00000000abba',
        type: 'customNode',
        data: { title: 'כותרת' },
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
      });
    },
    []
  );

  const onConnectEnd = (e: MouseEvent | TouchEvent) => {
    console.log('onConnectEnd');
    if (edgeConnecting.current) {
      edgeConnecting.current = false;
      setNodes((nds) => nds.map((node) => {
        return {
          ...node,
          style: {backgroundColor: 'transparent'}
        };
      }));
    }
  }

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
    console.log('onEdgeUpdateStart');
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge<any>, newConnection: any) => {
    edgeUpdateSuccessful.current = true;
    console.log('onEdgeUpdate');
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: { id: string; }) => {
    console.log('onEdgeUpdateEnd');

    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    
    edgeUpdateSuccessful.current = true;
  }, []);

  const onNodeMouseEnter = (evt: any, n: any) => { 
    if (edgeConnecting.current) {
      setNodes((nds) => nds.map((node) => {
        if (node.id === n.id) {
          return {
            ...node,
            style: {backgroundColor: '#51D5A5', padding: '0.05rem', borderRadius: '0.8rem', borderWidth: '20px'}
          }
        } else {
          return {
            ...node
          };
        }
      }));
    }
  }

  const onNodeMouseLeave = (evt: any, n: any) => { 
    if (edgeConnecting.current) {
      setNodes((nds) => nds.map((node) => {
        return {
          ...node,
          style: {backgroundColor: 'transparent'}
        };
      }));
    }
  }

  return (
    <>
      <button 
        onClick={() => {
          const id = uuidv4();
          setNodes((nodes) => [...nodes, {
            id,
            type: 'customNode',
            position: { x: 450, y: -50 },
            data: { title: 'כותרת' },
            targetPosition: Position.Right,
        }]);
      }}
      >
        הוספת תיבה חדשה
      </button>
      <ReactFlowProvider>
        <Mashu />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          // onEdgeClick={(e, n) => { console.log('Edge click'); console.log(e); console.log(n); }}
          onConnectStart={ (e, n) => { edgeConnecting.current = true; console.log('Connect start'); console.log('From node: ', n); } }
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          style={{ background: '#F2F2F2', direction: 'ltr' }}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          connectionLineStyle={connectionLineStyle}
          defaultViewport={defaultViewport}
          fitView
          attributionPosition="bottom-left"
        >
          
          <Controls />
          <MiniMap />
        </ReactFlow>
        <div className="save__controls">
            {/* <button onClick={onSave}>save</button> */}
            <button onClick={onRestore}>restore</button>
            {/* <button onClick={onAdd}>add node</button> */}
        </div>
      </ReactFlowProvider>
    </>
  );
};