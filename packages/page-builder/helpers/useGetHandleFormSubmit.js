/* eslint-disable max-len */
import { snakeCase } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import getContentMapping from '../configurations/default-content-mapping';

const useGetHandleFormSubmit = ({
	pageConfiguration,
	setPageConfiguration,
	rowData,
	selectedRow,
	selectedColumn,
	selectedNestedColumn,
	selectedItem,
	columnData,
	nestedColumData,
	setShow,
}) => {
	const onSubmit = (value) => {
		const { controls: defaultControls, heading } = value || {};

		const { parentId, id } = rowData || {};

		const CONTENT_MAPPING = getContentMapping();

		const data = pageConfiguration;

		const newControls = (defaultControls || []).map((item) => {
			const { type, options_type, manual_options, is_mandetory, options: groupOptions } = item || {};
			const isOptionsTrue = ['asyncSelect', 'select', 'radioGroup', 'chips'].includes(type);

			let options = [];

			if (options_type === 'manual_data') {
				try {
					options = JSON.parse(manual_options)?.options;
				} catch (err) {
					console.log(err);
				}
			} else if (['radioGroup', 'chips'].includes(type)) {
				try {
					options = JSON.parse(groupOptions)?.options;
				} catch (err) {
					console.log(err);
				}
			}

			return ({
				...item,
				name    : snakeCase(item?.label),
				style   : { flexBasis: item?.width || 'none' },
				options : isOptionsTrue ? options : undefined,
				rules   : {
					required: is_mandetory === 'yes' ? true : undefined,
				},
			});
		});

		const newValue = { ...value, controls: newControls };

		const selectedComponentIndex = (data.layouts || []).findIndex((sComponentId) => (sComponentId.id === id));

		const defaultParentId = uuid();

		const textWigdet = 		{
			component: {
				...CONTENT_MAPPING.text.component,
				content: heading,
			},
			id       : 0,
			parentId : parentId || defaultParentId,
			type     : 'COLUMN',
			style    : {
				border: '1px solid red',
			},
		};

		const formWidget = {
			component: {
				...CONTENT_MAPPING.form.component,
				formData: newValue,
			},
			id       : 1,
			parentId : parentId || defaultParentId,
			type     : 'COLUMN',
			style    : {
				border: '1px solid red',
			},
		};

		// const buttonWigdet = {
		// 	...CONTENT_MAPPING.button,
		// 	id         : 2,
		// 	content    : buttonText,
		// 	parentId   : defaultParentId,
		// 	attributes : {
		// 		// onClick: dynamicHandleSubmit(onDynamicFormSubmit),
		// 	},
		// };

		const childrenData = [textWigdet, formWidget];

		// console.log('dfjijdi', parentId, childId);

		const { id: selectedRowId } = selectedRow || {};

		const { id : columnId } = columnData || {};

		const { id : nestedColumnId } = nestedColumData || {};

		const { id: selectedColumnId } = selectedColumn || {};

		// const { id: selectedChildId } = selectedItem || {};

		const { id: selectedNestedColumnId } = selectedItem || {};

		console.log('sdjskdjk', selectedColumn, selectedNestedColumn, selectedItem);

		if (id === selectedRowId && selectedItem) {
			if (Object.keys(selectedNestedColumn).length > 0 && nestedColumnId === selectedNestedColumnId) {
				console.log('dkfodjfjosjx', data.layouts[selectedComponentIndex]);
			} else if (Object.keys(selectedColumn).length > 0 && columnId === selectedColumnId) {
				console.log('sdmksjdkjdskl', data.layouts[selectedComponentIndex].type);

				if (data.layouts[selectedComponentIndex].type === 'carousel') {
					data.layouts[selectedComponentIndex].component.children[selectedColumnId].component = {
						...data.layouts[selectedComponentIndex].component.children[selectedColumnId].component,
						children : childrenData,
						type     : 'container',
					};
				} else if (!data.layouts[selectedComponentIndex].isNested || data.layouts[selectedComponentIndex].type === 'formSample') {
					data.layouts[selectedComponentIndex].component.children = childrenData;
				} else {
					data.layouts[selectedComponentIndex].component.children[selectedColumnId].component = {
						...data.layouts[selectedComponentIndex].component.children[selectedColumnId].component,
						children : childrenData,
						type     : 'container',
					};
				}
			} else if (Object.keys(selectedColumn).length === 0 && Object.keys(selectedNestedColumn).length === 0) {
				data.layouts[selectedComponentIndex] = {
					...data.layouts[selectedComponentIndex],
					parentId : defaultParentId,
					isNested : false,
				};
				data.layouts[selectedComponentIndex].component = {
					...data.layouts[selectedComponentIndex].component,
					children : childrenData,
					type     : 'container',
				};
			}
		}

		setPageConfiguration((prev) => ({ ...prev, layouts: data.layouts }));

		setShow(false);
	};

	return { onSubmit };
};

export default useGetHandleFormSubmit;
