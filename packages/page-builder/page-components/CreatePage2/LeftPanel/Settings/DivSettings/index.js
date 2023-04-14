import { Modal, Accordion } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useCallback } from 'react';

import UploadImageModal from '../../../../../commons/UploadImageModal';
import containerSettings from '../../../../../configurations/container-settings';

import SettingsCard from './SettingsCard';
import styles from './styles.module.css';

function DivSettings(props) {
	const { component, setComponent, selectedItem } = props;

	const [showUploadModal, setShowUploadModal] = useState(false);

	const isRootComponent = isEmpty(selectedItem);

	const handleChange = useCallback(
		(key, value) => {
			if (isRootComponent) {
				setComponent((prev) => ({
					...prev,
					style: {
						...component.style,
						[key]: value,
					},
				}));
			} else {
				const { id: selectedItemId } = selectedItem;

				const selectedComponent = component.layouts.find((layout) => layout.id === selectedItemId);

				const modifiedComponent = {
					...selectedComponent,
					style: {
						...selectedComponent.style,
						[key]: value,
					},
				};

				setComponent((prev) => ({
					...prev,
					layouts: prev.layouts.map((layout) => {
						if (layout.id === selectedItemId) {
							return modifiedComponent;
						}
						return layout;
					}),
				}));
			}
		},
		[component.layouts, selectedItem, setComponent, component.style, isRootComponent],
	);

	const handleUploadChange = useCallback(
		(value, key) => {
			handleChange(key, value);
		},
		[handleChange],
	);

	return (
		<section className={styles.settings_container}>
			<div>
				{containerSettings.map((setting) => (

					<Accordion
						key={setting.type}
						className={styles.ui_accordion_content}
						type="text"
						title={setting.type}
					>

						<SettingsCard
							setComponent={setComponent}
							component={component}
							selectedItem={selectedItem}
							handleChange={handleChange}
							setShowUploadModal={setShowUploadModal}
							setting={setting}
							isRootComponent={isRootComponent}
						/>

					</Accordion>

				))}
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
						showUploadModal={showUploadModal}
						component={component}
						setComponent={setComponent}
						handleUploadChange={handleUploadChange}
					/>
				</Modal>
			)}
		</section>
	);
}

export default DivSettings;
