import { useReactFlow } from 'reactflow';

export const Mashu = () => {
  const reactFlow = useReactFlow();
	return (
    <button onClick={
			() => {
				const obj = reactFlow.toObject();
				console.log(obj);
			}}>
			שמור
		</button>
  );
}

const graphToJson = (nodes: any, edges: any) => {
	
}
