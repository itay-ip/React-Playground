import React, { useEffect, useState } from 'react';
import { getBezierPath, useNodeId } from 'reactflow';

import './index.css';

const foreignObjectSize = 40;

const onEdgeClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: any) => {
	evt.stopPropagation();
	alert(`remove ${id}`);
};

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data
}: any /* Some type problems with these arguments... 
					Need to find the correct types for them */) => {

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

	
  return (
		<>
			<path
				id={id}
				style={style}
				className="react-flow__edge-path"
				d={edgePath}
				markerEnd={markerEnd}
			/>
			<foreignObject
					width={foreignObjectSize}
					height={foreignObjectSize}
					x={labelX - foreignObjectSize / 2}
					y={labelY - foreignObjectSize / 2}
					className="edgebutton-foreignobject"
					requiredExtensions="http://www.w3.org/1999/xhtml"
			>
				{ data?.expanded &&
					<div>
						<button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
							×
						</button>
					</div>
				}
			</foreignObject>
    </>
  );
}

// interface CustomEdgeProps {
// 	id: string,
//   sourceX: number,
//   sourceY: number,
//   targetX: number,
//   targetY: number,
//   sourcePosition: any,
//   targetPosition: any,
//   style: any,
//   markerEnd: any
// }