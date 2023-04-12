/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import { IcMPlusInCircle } from '@cogoport/icons-react';
import React, { useMemo } from 'react';
import { v1 as uuid } from 'uuid';

import Item from './Item';
import styles from './styles.module.css';

const widths = [['100%'],
	['50%', '50%'],
	['33.33%', '33.33%', '33.33%'],
	['25%', '25%', '25%', '25%'],
	['40%', '60%'],
	['60%', '40%'],
	['25%', '75%'],
	['75%', '25%'],
	['25%', '25%', '50%'],
	['50%', '25%', '25%'],
];

function Structure(props) {
	const {
		setShowContentModal,
		setParentComponentId,
		onNewItemAdding,
		addNewItem,
		selectedItem,
	} = props;

	const handleSubmitClick = ({ index, parentId }) => {
		setParentComponentId({ childId: index, parentId });

		setShowContentModal(true);
	};

	const parentComponent = {
		type       : 'container',
		isRendered : false,
		parentId   : uuid(),
		properties : {
			content : '',
			styles  : {
				display: 'flex',
			},
		},
	};

	const getChildrenComponents = (rows) => {
		const childrenComponents = rows.map((row, index) => {
			const { parentId } =	parentComponent || {};

			return ({
				type       : 'container',
				id         : index,
				width      : row,
				parentId,
				isRendered : false,
				properties : {
					content : { icon: <IcMPlusInCircle style={{ cursor: 'pointer', fill: '#222' }} width={20} height={20} /> },
					styles  : {
						width          : row,
						border         : '1px dashed #9ab7fe',
						height         : '120px',
						margin         : '2px',
						display        : 'flex',
						justifyContent : 'center',
						alignItems     : 'center',
					},
					attributes: {
						onClick: () => handleSubmitClick({ index, parentId }),
					},

				},
			});
		});

		return childrenComponents;
	};

	const LeftPanelItems = useMemo(
		() => (widths || []).map((row) => (
			<Item row={row} handleClick={() => addNewItem({ ...parentComponent, children: getChildrenComponents(row) }, selectedItem?.index, true, parentComponent.id, null)} onNewItemAdding={onNewItemAdding} parentComponent={parentComponent} childrenComponents={getChildrenComponents(row)} />
		)),
		[addNewItem, onNewItemAdding, selectedItem],
	);

	return (
		<div className={styles.container}>
			<div className={styles.grid_container}>
				{LeftPanelItems}
			</div>
		</div>

	);
}

export default Structure;
