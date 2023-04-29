import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DNDComponent from './DNDComponent';

function PageBuilder() {
	return (
		<DndProvider backend={HTML5Backend}>
			<DNDComponent />
		</DndProvider>
	);
}

export default PageBuilder;
