import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useGetDynamicPage from '../../hooks/useGetDynamicPage';

import DNDComponent from './DNDComponent';

function PageBuilder() {
	const { initialPageData, metaData } = useGetDynamicPage();
	return (
		<DndProvider backend={HTML5Backend}>
			<DNDComponent
				initialPageData={initialPageData}
				metaData={metaData}
			/>
		</DndProvider>
	);
}

export default PageBuilder;
