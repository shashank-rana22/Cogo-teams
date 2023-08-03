// import { Text } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';

import DropBox from '../DropBox';

import styles from './styles.module.css';

function MobileView(props) {
	const {
		pageConfiguration,
		setPageConfiguration,
		addNewItem,
		onNewItemAdding,
		isNewItemAdding,
		parentComponentId,
		setShowContentModal,
		setParentComponentId,
		selectedRow,
		setSelectedRow,
		selectedItem,
		setSelectedItem,
		selectedColumn,
		setSelectedColumn,
		selectedNestedColumn,
		setSelectedNestedColumn,
		modeType,
		handleUnselectItem,
		previewMode,
	} = props;

	return (
		<div className={styles.container}>

			<div className={styles.mobile_view}>
				<div className={styles.header}>

					<div className={styles.time}>
						{formatDate({
							date       : new Date(),
							formatType : 'time',
							timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						})}
					</div>

					<div className={styles.center}>
						<div className={styles.speaker} />
					</div>

				</div>
				<div className={styles.right}>
					<div className={styles.body}>
						<DropBox
							pageConfiguration={pageConfiguration}
							setPageConfiguration={setPageConfiguration}
							addNewItem={addNewItem}
							onNewItemAdding={onNewItemAdding}
							isNewItemAdding={isNewItemAdding}
							parentComponentId={parentComponentId}
							setShowContentModal={setShowContentModal}
							setParentComponentId={setParentComponentId}
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
							selectedItem={selectedItem}
							setSelectedItem={setSelectedItem}
							selectedColumn={selectedColumn}
							setSelectedColumn={setSelectedColumn}
							selectedNestedColumn={selectedNestedColumn}
							setSelectedNestedColumn={setSelectedNestedColumn}
							handleUnselectItem={handleUnselectItem}
							modeType={modeType}
							previewMode={previewMode}
						/>

					</div>
				</div>
			</div>
		</div>

	);
}
export default MobileView;
