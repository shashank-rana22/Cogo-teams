import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useGetDndComponent from '../hooks/useGetDndComponent';

import DNDComponent from './DNDComponent';

function PageBuilder() {
	const { metaData } = useGetDndComponent();
	return (
		<DndProvider backend={HTML5Backend}>
			<DNDComponent metaData={metaData} />
		</DndProvider>
	);
}

export default PageBuilder;
