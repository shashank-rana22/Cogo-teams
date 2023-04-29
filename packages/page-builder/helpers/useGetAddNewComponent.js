/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

import getContentMapping from '../configurations/default-content-mapping';

const useGetAddNewComponent = ({
	pageConfiguration,
	setPageConfiguration,
	setSelectedRow,
	setSelectedItem,
	setShowContentModal,
	setParentComponentId,
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

			const { type } = content || {};

			const CONTENT_MAPPING = getContentMapping();

			if (dropSource === 'selectBox') {
				const { childId, parentId } = parentDetails || {};

				const data = pageConfiguration;

				const objIndex = data.layouts.findIndex((item) => item.parentId === parentId);

				data.layouts[objIndex].component.children[childId] = {
					...CONTENT_MAPPING[type],
					...data.layouts[objIndex].component.children[childId],
					component: {
						...CONTENT_MAPPING[type].component,
						style: data.layouts[objIndex].component.children[childId].component.style,
					},
				};

				setPageConfiguration({ ...data });

				setSelectedRow({ ...data.layouts[objIndex] });

				setSelectedItem({ ...data.layouts[objIndex].component.children[childId] });
			} else {
				setPageConfiguration((prev) => ({
					...prev,
					layouts: [
						...pageConfiguration.layouts.slice(0, startIndex),
						{
							...CONTENT_MAPPING[type],
							...content,
							id: pageConfiguration.layouts.length + 1,
						},
						...pageConfiguration.layouts.slice(startIndex),
					],
				}));

				setSelectedRow({
					...CONTENT_MAPPING[type],
					...content,
					id: pageConfiguration.layouts.length + 1,
				});

				setSelectedItem({
					...CONTENT_MAPPING[type],
					...content,
					id: pageConfiguration.layouts.length + 1,
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
