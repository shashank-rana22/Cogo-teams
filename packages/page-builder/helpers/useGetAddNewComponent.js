/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { v1 as uuid } from 'uuid';

import getContentMapping from '../configurations/default-content-mapping';

const useGetAddNewComponent = ({
	pageConfiguration,
	setPageConfiguration,
	setSelectedRow,
	setSelectedItem,
	setShowContentModal,
	setParentComponentId,
	setEveryEvents,
}) => {
	const handleAddNewItem = useCallback(
		(
			content,
			hoveredIndex = pageConfiguration.layouts.length,
			shouldAddBelow = true,
			parentDetails = {},
			dropSource = '',
		) => {
			const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;

			const id = uuid();

			const { type } = content || {};

			const CONTENT_MAPPING = getContentMapping();

			if (dropSource === 'selectBox') {
				const { childId, parentId } = parentDetails || {};

				const data = pageConfiguration;

				const objIndex = data.layouts.findIndex((item) => item.parentId === parentId);

				const selectedChildrenIndex = data.layouts[objIndex].component.children.findIndex((item) => item.id === childId);

				data.layouts[objIndex].component.children[selectedChildrenIndex] = {
					...CONTENT_MAPPING[type],
					...data.layouts[objIndex].component.children[selectedChildrenIndex],
					component: {
						...CONTENT_MAPPING[type].component,
						style: data.layouts[objIndex].component.children[selectedChildrenIndex].component.style,
					},
				};

				setPageConfiguration({ ...data });

				setEveryEvents({ ...data });

				setSelectedRow({ ...data.layouts[objIndex] });

				setSelectedItem({ ...data.layouts[objIndex].component.children[selectedChildrenIndex] });
			} else {
				setPageConfiguration((prev) => ({
					...prev,
					layouts: [
						...pageConfiguration.layouts.slice(0, startIndex),
						{
							...CONTENT_MAPPING[type],
							...content,
							id,
						},
						...pageConfiguration.layouts.slice(startIndex),
					],
				}));

				setEveryEvents({
					...pageConfiguration,
					layouts: [
						...pageConfiguration.layouts.slice(0, startIndex),
						{
							...CONTENT_MAPPING[type],
							...content,
							id,
						},
						...pageConfiguration.layouts.slice(startIndex),
					],
				});

				setSelectedRow({
					...CONTENT_MAPPING[type],
					...content,
					id,
				});

				setSelectedItem({
					...CONTENT_MAPPING[type],
					...content,
					id,
				});
			}

			setShowContentModal(false);

			setParentComponentId(null);
		},
		[pageConfiguration],
	);

	return { handleAddNewItem };
};

export default useGetAddNewComponent;
