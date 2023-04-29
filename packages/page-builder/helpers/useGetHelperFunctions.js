import { IcMPlusInCircle } from '@cogoport/icons-react';
import { v1 as uuid } from 'uuid';

const useGetHelperFunctions = ({
	setPageConfiguration,
	setSelectedRow,
	setSelectedItem,
	setParentComponentId,
	setShowContentModal,
	setSelectedColumn,
	setSelectedNestedColumn,
}) => {
	const handleDelete = (e, itemList, pageConfiguration) => {
		e.stopPropagation();

		const { id: sId } = itemList || {};
		const data = pageConfiguration;
		const selectedComponentIndex = (data.layouts || []).findIndex((stageItem) => (stageItem.id === sId));
		data.layouts.splice(selectedComponentIndex, 1);

		setPageConfiguration(() => ({ ...data }));

		setSelectedRow({});
		setSelectedItem({});
	};

	const handleSubmitClick = ({ childrenId, parentId }) => {
		setParentComponentId({ childId: childrenId, parentId });

		setShowContentModal(true);
	};

	const handleCopy = (e, itemList, component, pageConfiguration) => {
		e.stopPropagation();

		const { id: sId, parentId } = itemList || {};

		const { children } = component || {};

		const newId = uuid();

		const data = pageConfiguration;

		const selectedComponentIndex = (data.layouts || []).findIndex((item) => (item.id === sId));

		const duplicateChildren = (children || []).map((item) => {
			const { component: parentComponent } = item || {};
			const { attributes, type: childType } = parentComponent || {};

			const newAttributes = !childType ? {
				onClick: () => handleSubmitClick({ childrenId: item.id, parentId: newId }),
			} : attributes;

			return ({ ...item, parentId: newId, component: { ...item.component, attributes: newAttributes } });
		});

		const duplicateData = parentId ? {
			...itemList,
			component: {
				...itemList.component,
				children: duplicateChildren,
			},
			id       : data.layouts.length + 1,
			parentId : newId,
			type     : 'ROW',
		} : {
			...itemList,
			id: data.layouts.length + 1,
		};

		setPageConfiguration((prev) => ({
			...prev,
			layouts: [...data.layouts.slice(0, selectedComponentIndex + 1),
				{
					...duplicateData,
				},
				...data.layouts.slice(selectedComponentIndex + 1)],
		}));
	};

	const handleAddItem = ({ childrenId, parentId }) => {
		setParentComponentId({ childId: childrenId, parentId });
		setShowContentModal(true);
	};

	const handleAddSlides = (e, itemList, pageConfiguration) => {
		e.stopPropagation();
		const { parentId, id: sId } = itemList || {};

		const data = pageConfiguration;

		const selectedComponentIndex = (data.layouts || []).findIndex(
			(sComponentId) => sComponentId.id === sId,
		);

		const childrenId = (data.layouts[selectedComponentIndex].component.children || []).length;

		data.layouts[selectedComponentIndex].component.children = [
			...data.layouts[selectedComponentIndex].component.children,
			{
				id        : childrenId,
				width     : '100%',
				parentId,
				component : {
					style: {
						border         : '1px dashed #9ab7fe',
						display        : 'flex',
						justifyContent : 'center',
						alignItems     : 'center',
					},
					icon       : <IcMPlusInCircle style={{ cursor: 'pointer', fill: '#222' }} width={20} height={20} />,
					attributes : {
						onClick: () => handleAddItem({ childrenId, parentId }),
					},
				},
			},
		];

		setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));
	};

	const handleSelectRow = (e, itemList, id, index) => {
		e.stopPropagation();
		setSelectedRow({ ...itemList, id, index });
		setSelectedColumn({});
		setSelectedNestedColumn({});
		setSelectedItem({});
	};

	return { handleDelete, handleCopy, handleSelectRow, handleAddSlides };
};

export default useGetHelperFunctions;
