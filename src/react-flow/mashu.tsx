import { useReactFlow } from 'reactflow';

export const Mashu = () => {
  const reactFlow = useReactFlow();
	return (
    <button onClick={
			() => {
				const obj = reactFlow.toObject();
				graphToJson(obj.nodes, obj.edges);
				console.log(obj.viewport);
			}}>
			שמור
		</button>
  );
}

const graphToJson = (nodes: any, edges: any) => {
	console.log('Nodes:');
	console.log(nodes);
	console.log('Edges:');
	console.log(edges);


	const nds = {

	}
}
