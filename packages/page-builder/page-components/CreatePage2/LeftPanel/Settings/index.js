import { Accordion, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useCallback } from 'react';

import BoxModal from '../../../../commons/BoxModal';
import UploadImageModal from '../../../../commons/UploadImageModal';
import buttonSettings from '../../../../configurations/button-settings';
import containerSettings from '../../../../configurations/container-settings';
import dividerSettings from '../../../../configurations/divider-settings';
import imageSettings from '../../../../configurations/image-settings';
import textSettings from '../../../../configurations/text-settings';

import Card from './Card';
import styles from './styles.module.css';

const settingsMapping = {
	text    : textSettings,
	image   : imageSettings,
	button  : buttonSettings,
	divider : dividerSettings,
};

function updateSelectedElement(key, value, children, selectedRowId, selectedItemId) {
	return children.map((child) => {
		if (['text', 'button', 'image', 'form', 'divider'].includes(child.type) && child.id === selectedItemId) {
			return {
				...child,
				style: {
					...child.style,
					[key]: value,
				},
			};
		}

		if (child.type === 'container' && child.id === selectedRowId) {
			if (child.id === selectedItemId) {
				return {
					...child,
					style: {
						...child.style,
						[key]: value,
					},
				};
			}

			return {
				...child,
				children: updateSelectedElement(key, value, child.children, selectedRowId, selectedItemId),
			};
		}

		return child;
	});
}

function Settings(props) {
	const { component, setComponent, selectedItem, selectedRow, setSelectedItem } = props;

	const [showUploadModal, setShowUploadModal] = useState(false);

	console.log('componentssss ::', component);
	console.log('selectedItemsss ::', selectedItem);
	console.log('selectedRowssss ::', selectedRow);

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
				const { id : selectedRowId } = selectedRow;

				const modifiedLayouts = updateSelectedElement(
					key,
					value,
					component.layouts,
					selectedRowId,
					selectedItemId,
				);

				setComponent((prev) => ({
					...prev,
					layouts: modifiedLayouts,
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
			selectedRow,
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

			<div>
				<Accordion type="text" title="Margin & Padding">
					<BoxModal
						setComponent={setComponent}
						component={component}
						selectedItem={selectedItem}
						isRootComponent={isRootComponent}
						setSelectedItem={setSelectedItem}
						handleChange={handleChange}
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
