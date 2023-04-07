import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Builder from './Builder';

function App() {
	return (
		<div className="App">
			<DndProvider backend={HTML5Backend}>
				<Builder />
			</DndProvider>
		</div>
	);
}

export default App;
