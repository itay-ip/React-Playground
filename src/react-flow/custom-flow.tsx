import { useEffect, useCallback, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Position, Connection, Edge, MarkerType, updateEdge, useReactFlow, ReactFlowProvider, NodeMouseHandler, MiniMap, getConnectedEdges, useStore } from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import { CustomNodeComponent } from './custom-node-component';
import { CustomEdge } from './custom/custom-edge-component';
import { Mashu } from './mashu';

import { graph } from '../graph';

const connectionLineStyle = { stroke: '#9AD4F1', strokeWidth: 4 };
const edgeMarkerEnd = { type: MarkerType.Arrow, strokeWidth: 1.2, color: '#9AD4F1' };

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
  const edgeConnecting = useRef(false);

  const onRestore = useCallback(() => {
    console.log('restore');
    const restoreFlow = async () => {
      const g = JSON.parse(graph);
      if (graph) {
        console.log(g.nodes);
        setNodes(g.nodes.map((node: any) => ({...node, data: {...node.data, onRemoveOption: handleRemoveOption } })));
        setEdges(g.edges.map((edge: any) => ({ ...edge, style: connectionLineStyle, markerEnd: edgeMarkerEnd, data: { ...edge.data, onRemoveOption: handleRemoveOption } })));
      }
    };

    restoreFlow();
  }, [setNodes]);

  useEffect(() => {
    /* onMount - Decide how to read a graph from JSON */
    setNodes([
      { /* Initial root node */
        id: '00000000-0000-0000-0000-00000000abba',
        type: 'customNode',
        data: { title: 'כותרת', onRemoveOption: handleRemoveOption },
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
        return addEdge(
          {
            ...params,
            id: `${params.sourceHandle}_${params.targetHandle}`,
            style: connectionLineStyle,
            type: 'customEdge',
            markerEnd: edgeMarkerEnd,
            data: { onRemoveOption: handleRemoveOption }
          },
          eds
        );
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
      // Remove edge
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    
    setEdges((eds) => eds.map(edge => (
      {
        ...edge,
        style: connectionLineStyle,
        markerEnd: edgeMarkerEnd,
        data: { ...edge.data, expanded: false,  onRemoveOption: handleRemoveOption }
      }))
    );
    edgeUpdateSuccessful.current = true;
  }, []);

  const handleAddNode = () => {
    
    const id = uuidv4();
    setNodes((nodes) => [...nodes, {
      id,
      type: 'customNode',
      position: { x: 450, y: -50 },
      data: { title: 'כותרת', onRemoveOption: handleRemoveOption },
      targetPosition: Position.Right
    }]);
  }

  const handleRemoveOption = (id: string) => {
    setEdges(eds => eds.filter(edge => !edge.id.startsWith(id) ));
  }

  const onEdgeMouseEnter = (event: React.MouseEvent, edge: Edge) => { 
    setEdges((eds) => eds.map(e => {
      if (edge.id === e.id) {
        return {
          ...edge,
          style: { ...connectionLineStyle, stroke: '#0075DB' },
          markerEnd: { ...edgeMarkerEnd, color: '#0075DB' },
          data: { ...edge.data, expanded: true },
        }
      }
        return e;
      }
    ));
  }

  const onEdgeMouseLeave = (event: React.MouseEvent, edge: Edge) => { 
    setEdges((eds) => eds.map(e => {
    if (edge.id === e.id) {
      return {
        ...edge,
        style: connectionLineStyle,
        markerEnd: edgeMarkerEnd,
        data: { ...edge.data, expanded: false }
      }
    }
      return e
    }));
  }

  return (
    <>
      <button 
        onClick={handleAddNode}
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
          onEdgeMouseEnter={onEdgeMouseEnter}
          onEdgeMouseLeave={onEdgeMouseLeave}
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
          <button onClick={onRestore}>restore</button>
        </div>
      </ReactFlowProvider>
    </>
  );
};



// const onNodeMouseEnter = (evt: any, n: any) => { 
  //   if (edgeConnecting.current) {
  //     setNodes((nds) => nds.map((node) => {
  //       if (node.id === n.id) {
  //         return {
  //           ...node,
  //           style: {backgroundColor: '#51D5A5', padding: '0.04rem', borderRadius: '0.8rem', borderWidth: '20px'}
  //         }
  //       } else {
  //         return {
  //           ...node
  //         };
  //       }
  //     }));
  //   }
  // }

  // const onNodeMouseLeave = (evt: any, n: any) => { 
  //   if (edgeConnecting.current) {
  //     setNodes((nds) => nds.map((node) => {
  //       return {
  //         ...node,
  //         style: {backgroundColor: 'transparent'}
  //       };
  //     }));
  //   }
  // }