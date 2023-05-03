import { Accordion, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import BoxModal from '../../../../../../commons/BoxModal';
import UploadImageModal from '../../../../../../commons/UploadImageModal';
import buttonSettings from '../../../../../../configurations/button-settings';
import containerSettings from '../../../../../../configurations/container-settings';
import dividerSettings from '../../../../../../configurations/divider-settings';
import imageSettings from '../../../../../../configurations/image-settings';
import textSettings from '../../../../../../configurations/text-settings';
import useUpdateComponentsStyles from '../../../../../../helpers/useUpdateComponentStyles';

import Card from './Card';
import styles from './styles.module.css';

const settingsMapping = {
	text    : textSettings,
	image   : imageSettings,
	button  : buttonSettings,
	divider : dividerSettings,
};

// const getSelectedComponent = (selectedRow, selectedColumn, selectedNestedColumn) => {
// 	if (!isEmpty(selectedNestedColumn)) {
// 		return selectedNestedColumn;
// 	}
// 	if (!isEmpty(selectedColumn)) {
// 		return selectedColumn;
// 	}

// 	return selectedRow;
// };

function Settings(props) {
	const {
		pageConfiguration,
		setPageConfiguration,
		selectedItem,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
	} = props;

	const [showUploadModal, setShowUploadModal] = useState(false);

	const { handleUpdateStyles } = useUpdateComponentsStyles(props);

	const isRootComponent = isEmpty(selectedRow);

	// const selectedComponent = getSelectedComponent(selectedRow, selectedColumn, selectedNestedColumn);

	const { type = '' } = selectedItem;

	const settings = settingsMapping[type] || containerSettings;

	return (
		<section className={styles.container}>
			<div>
				{(settings || []).map((setting) => (
					<Accordion
						key={setting.type}
						className={styles.ui_accordion_content}
						type="text"
						title={setting.type}
					>
						<Card
							pageConfiguration={pageConfiguration}
							setPageConfiguration={setPageConfiguration}
							selectedItem={selectedItem}
							handleChange={handleUpdateStyles}
							setShowUploadModal={setShowUploadModal}
							setting={setting}
							isRootComponent={isRootComponent}
						/>

					</Accordion>
				))}
			</div>

			<div>
				<Accordion
					className={styles.ui_accordion_content}
					type="text"
					title="Margin & Padding"
				>
					<BoxModal
						selectedItem={selectedItem}
						isRootComponent={isRootComponent}
						pageConfiguration={pageConfiguration}
						handleChange={handleUpdateStyles}
					/>
				</Accordion>
			</div>

			{showUploadModal && (
				<Modal
					size="md"
					placement="top"
					show={showUploadModal}
					onClose={() => setShowUploadModal(false)}
				>
					<UploadImageModal
						setShowUploadModal={setShowUploadModal}
						handleChange={handleUpdateStyles}
						type="background"
						accept=".png, .jpg, .webp, .webm, .jpeg, .svg, .gif"

					/>
				</Modal>
			)}
		</section>
	);
}

export default Settings;
