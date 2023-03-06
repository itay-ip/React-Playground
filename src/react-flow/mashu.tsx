import { useReactFlow } from 'reactflow';

export const Mashu = () => {
  const reactFlow = useReactFlow();
	return (
    <button onClick={
			() => {
				const graph = reactFlow.toObject();
				console.log(graph);
			}}>
			שמור
		</button>
  );
}

const graphToJson = (graph: any) => {
	
}
