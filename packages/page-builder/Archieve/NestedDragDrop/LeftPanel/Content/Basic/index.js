/* eslint-disable react-hooks/exhaustive-deps */
import { IcMFolder, IcMImage, IcMEdit, IcMVideoCall, IcMFdangerousCargoType } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { v1 as uuid } from 'uuid';

import { SIDEBAR_ITEM } from '../../../constants';

import Item from './Item';
import styles from './styles.module.css';

const HTMLEditor = dynamic(() => import('./HtmlEditor'), { ssr: false });

const contents =	[
	{
		// id        : uuid(),
		type      : SIDEBAR_ITEM,
		component : {
			type    : 'text',
			content : 'Some text',
			icon    : <IcMEdit />,
			name    : 'text',
		},
	},
	{
		// id        : uuid(),
		type      : SIDEBAR_ITEM,
		component : {
			type    : 'image',
			content : 'Some image',
			icon    : <IcMImage />,
			name    : 'image',
		},
	},
	{
		// id        : uuid(),
		type      : SIDEBAR_ITEM,
		component : {
			type    : 'button',
			content : 'Some button',
			icon    : <IcMFolder />,
			name    : 'button',
		},
	},
	{
		// id        : uuid(),
		type      : SIDEBAR_ITEM,
		component : {
			type    : 'video',
			content : 'Some video',
			icon    : <IcMVideoCall />,
			name    : 'video',
		},
	},
	{
		// id        : uuid(),
		type      : SIDEBAR_ITEM,
		component : {
			type    : 'html',
			content : 'Some html',
			icon    : <img alt="" src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/html.svg" height="20px" />,
			name    : 'html',
		},
	},
	{
		// id        : uuid(),
		type      : SIDEBAR_ITEM,
		component : {
			type    : 'form',
			content : 'Some form',
			icon    : <IcMFdangerousCargoType />,
			name    : 'form',
		},
	},
];

function Basic(props) {
	const {
		// addNewItem,
		onNewItemAdding,
		selectedRow,
		// parentComponentId,
		componentType,
		// component,
		// setComponent,
		selectedItem,
	} = props;

	const { type } = selectedItem || {};

	const LeftPanelItems = useMemo(
		() => (contents || []).map((item) => (
			<Item
				itemType={item.type}
				content={item}
				// onClick={() => addNewItem(item, selectedRow?.index, true, parentComponentId, componentType)}
				onNewItemAdding={onNewItemAdding}
			/>
		)),
		[
			// addNewItem,
			onNewItemAdding,
			selectedRow]
		,
	);

	if (type === 'html' && componentType !== 'child') {
		return (
			<div className={styles.container}>
				<HTMLEditor
					// component={component}
					// setComponent={setComponent}
					selectedRow={selectedRow}
					selectedItem={selectedItem}
				/>
			</div>
		);
	}

	return 	(
		<div className={styles.container}>
			{LeftPanelItems}
		</div>
	);
}

export default Basic;
