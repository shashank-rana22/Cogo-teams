import { Accordion, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useCallback } from 'react';

import UploadImageModal from '../../../../commons/UploadImageModal';
import buttonSettings from '../../../../configurations/button-settings';
import containerSettings from '../../../../configurations/container-settings';
import imageSettings from '../../../../configurations/image-settings';
import textSettings from '../../../../configurations/text-settings';

import Card from './Card';
import styles from './styles.module.css';

const settingsMapping = {
	text   : textSettings,
	image  : imageSettings,
	button : buttonSettings,
};

function Settings(props) {
	const { component, setComponent, selectedItem, setSelectedItem } = props;

	console.log('component ::', component);

	const [showUploadModal, setShowUploadModal] = useState(false);

	const [defaultStyles, setDefaultStyles] = useState([]);

	const isRootComponent = isEmpty(selectedItem);

	const { type = '' } = selectedItem;

	const settings = settingsMapping[type] || containerSettings;

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

				const selectedElement = component.layouts.find(
					(layout) => layout.id === selectedItemId,
				);

				console.log('selected element ::', selectedElement);

				const modifiedComponent = {
					...selectedElement,
					style: {
						...selectedElement?.style,
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

				setSelectedItem((prev) => ({
					...prev,
					style: {
						...prev.style,
						[key]: value,
					},
				}));
			}
		},
		[
			setSelectedItem,
			component.layouts,
			selectedItem,
			setComponent,
			component.style,
			isRootComponent,
		],
	);

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
							setComponent={setComponent}
							component={component}
							selectedItem={selectedItem}
							handleChange={handleChange}
							setShowUploadModal={setShowUploadModal}
							setting={setting}
							isRootComponent={isRootComponent}
							defaultStyles={defaultStyles}
							setDefaultStyles={setDefaultStyles}
							setSelectedItem={setSelectedItem}
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
						handleChange={handleChange}
						defaultStyles={defaultStyles}
						setDefaultStyles={setDefaultStyles}
					/>
				</Modal>
			)}
		</section>
	);
}

export default Settings;
