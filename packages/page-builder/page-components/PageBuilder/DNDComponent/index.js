/* eslint-disable max-len */
import React, { useState } from 'react';

import useGetAddNewComponent from '../../../helpers/useGetAddNewComponent';

import DNDBody from './DNDBody';
import SelectComponentModal from './SelectComponentModal';
import styles from './styles.module.css';

function DNDComponent() {
	const [pageConfiguration, setPageConfiguration] = useState({
		id      : 0,
		layouts : [],
		style   : {
			backgroundSize: 'cover',
		},
	});

	const [showContentModal, setShowContentModal] = useState(false);

	const [parentComponentId, setParentComponentId] = useState(null);

	const [mode, setMode] = useState({
		modeType: 'edit',
	});

	const { modeType } = mode || {};

	const [isNewItemAdding, setNewItemAdding] = useState(false);

	const [selectedRow, setSelectedRow] = useState({});

	const [selectedColumn, setSelectedColumn] = useState({});

	const [selectedItem, setSelectedItem] = useState({});

	const [selectedNestedColumn, setSelectedNestedColumn] = useState({});

	const { handleAddNewItem } = useGetAddNewComponent({
		pageConfiguration,
		setPageConfiguration,
		setSelectedRow,
		setSelectedItem,
		setShowContentModal,
		setParentComponentId,
	});

	return (
		<div>
			<section className={styles.heading_container}>
				Cogo Page Builder
			</section>

			<DNDBody
				pageConfiguration={pageConfiguration}
				setPageConfiguration={setPageConfiguration}
				addNewItem={handleAddNewItem}
				onNewItemAdding={setNewItemAdding}
				selectedRow={selectedRow}
				setSelectedRow={setSelectedRow}
				showContentModal={showContentModal}
				setShowContentModal={setShowContentModal}
				parentComponentId={parentComponentId}
				setParentComponentId={setParentComponentId}
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				selectedColumn={selectedColumn}
				selectedNestedColumn={selectedNestedColumn}
				isNewItemAdding={isNewItemAdding}
				setSelectedColumn={setSelectedColumn}
				setSelectedNestedColumn={setSelectedNestedColumn}
				modeType={modeType}
				setMode={setMode}
			/>

			<SelectComponentModal
				parentComponentId={parentComponentId}
				addNewItem={handleAddNewItem}
				onNewItemAdding={setNewItemAdding}
				selectedRow={selectedRow}
				selectedItem={selectedItem}
				setParentComponentId={setParentComponentId}
				setShowContentModal={setShowContentModal}
				pageConfiguration={pageConfiguration}
				setPageConfiguration={setPageConfiguration}
				selectedColumn={selectedColumn}
				selectedNestedColumn={selectedNestedColumn}
				showContentModal={showContentModal}
			/>
		</div>
	);
}

export default DNDComponent;
