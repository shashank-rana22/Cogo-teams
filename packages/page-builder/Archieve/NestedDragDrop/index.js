import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DNDComponent from './DNDComponent';

function App() {
	return (
		<div>
			<DndProvider backend={HTML5Backend}>
				<DNDComponent />
			</DndProvider>
		</div>
	);
}

export default App;
