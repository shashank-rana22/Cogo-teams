/* eslint-disable max-len */
import { Breadcrumb } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetAddNewComponent from '../../../helpers/useGetAddNewComponent';
import useGetRedoUndoState from '../../../helpers/useGetRedoUndoState';
import useCheckMobileScreen from '../../../hooks/useCheckMobileScreen';

import DNDBody from './DNDBody';
import SelectComponentModal from './SelectComponentModal';
import styles from './styles.module.css';

function DNDComponent({ initialPageData, metaData }) {
	const [pageConfiguration, setPageConfiguration] = useState(metaData);

	const { width: screenWidth } = useCheckMobileScreen();

	const [previewMode, setPreviewMode] = useState('desktop');

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

	const handleUnselectItem = () => {
		if (modeType === 'edit') {
			setSelectedRow({});
			setSelectedItem({});
			setSelectedColumn({});
			setSelectedNestedColumn({});
		}
	};

	const {
		setEveryEvents,
		redoUndoIndex,
		lastEventIndex,
		goBack,
		goForward,
	} = useGetRedoUndoState({ pageConfiguration, setPageConfiguration, handleUnselectItem });

	const { handleAddNewItem } = useGetAddNewComponent({
		pageConfiguration,
		setPageConfiguration,
		setSelectedRow,
		setSelectedItem,
		setShowContentModal,
		setParentComponentId,
		setEveryEvents,
	});

	useEffect(() => {
		setPageConfiguration(metaData);
	}, [metaData]);

	const router = useRouter();

	return (
		<div>

			<section className={styles.heading_container}>
				<Breadcrumb>
					<Breadcrumb.Item
						label="Page Builder"
						onClick={() => router.push('/page-builder', '/page-builder')}
						className={styles.breadcrumb_item}
					/>
					<Breadcrumb.Item label={startCase(initialPageData?.page_name) || '___'} />
				</Breadcrumb>

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
				redoUndoIndex={redoUndoIndex}
				lastEventIndex={lastEventIndex}
				setEveryEvents={setEveryEvents}
				goBack={goBack}
				goForward={goForward}
				handleUnselectItem={handleUnselectItem}
				previewMode={previewMode}
				setPreviewMode={setPreviewMode}
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
