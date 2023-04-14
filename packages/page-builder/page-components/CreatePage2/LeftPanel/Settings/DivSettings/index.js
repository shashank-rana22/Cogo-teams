import { Input, Modal, Button, Select } from '@cogoport/components';
import { IcMDelete, IcMEdit, IcMUpload } from '@cogoport/icons-react';
import React, { useState, useCallback } from 'react';

import ColorInput from '../../../../../commons/ColorInput';
import NumberInput from '../../../../../commons/NumberInput';
import UploadImageModal from '../../../../../commons/UploadImageModal';

import styles from './styles.module.css';

function extractUrlString(urlString = '') {
	console.log('url string ::', urlString);
	const urlRegex = /url\(([^)]+)\)/i;
	const match = urlString.match(urlRegex);

	if (match) {
		return match[1];
	}

	return urlString;
}

const divSettings = [
	{
		type    : 'Background',
		options : [
			{
				label : 'Color',
				key   : 'background-color',
				type  : 'color',
			},
			{
				label : 'Image',
				key   : 'background-image',
				type  : 'upload',
			},
		],
	},
	{
		type    : 'Margin',
		options : [
			{
				label : 'Top',
				key   : 'margin-top',
				type  : 'number',
			},
			{
				label : 'Left',
				key   : 'margin-left',
				type  : 'number',
			},
			{
				label : 'Bottom',
				key   : 'margin-bottom',
				type  : 'number',
			},
			{
				label : 'Right',
				key   : 'margin-right',
				type  : 'number',
			},
		],
	},
	{
		type    : 'Padding',
		options : [
			{
				label : 'Top',
				key   : 'padding-top',
				type  : 'number',
			},
			{
				label : 'Left',
				key   : 'padding-left',
				type  : 'number',
			},
			{
				label : 'Bottom',
				key   : 'padding-bottom',
				type  : 'number',
			},
			{
				label : 'Right',
				key   : 'padding-right',
				type  : 'number',
			},
		],
	},
	{
		type    : 'Border',
		options : [
			{
				label : 'Color',
				key   : 'border-color',
				type  : 'color',
			},
			{
				label : 'Width',
				key   : 'border-width',
				type  : 'number',
			},
			{
				label   : 'Style',
				key     : 'border-style',
				type    : 'select',
				options : [
					{ label: 'None', value: 'none' },
					{ label: 'Solid', value: 'solid' },
					{ label: 'Dotted', value: 'dotted' },
					{ label: 'Dashed', value: 'dashed' },
				],
			},
		],
	},
];

// const settings = [
// 	{
// 		label : 'Border Color',
// 		key   : 'border-color',
// 		type  : 'color',
// 	},
// 	{
// 		label : 'Border Width',
// 		key   : 'border-width',
// 		type  : 'number',
// 	},
// 	{
// 		label   : 'Border Style',
// 		key     : 'border-style',
// 		type    : 'select',
// 		options : [
// 			{ label: 'None', value: 'none' },
// 			{ label: 'Solid', value: 'solid' },
// 			{ label: 'Dotted', value: 'dotted' },
// 			{ label: 'Dashed', value: 'dashed' },
// 			{ label: 'Double', value: 'double' },
// 			{ label: 'Groove', value: 'groove' },
// 			{ label: 'Ridge', value: 'ridge' },
// 			{ label: 'Inset', value: 'inset' },
// 			{ label: 'Outset', value: 'outset' },
// 		],
// 	},
// 	{
// 		label : 'Box Shadow',
// 		key   : 'box-shadow',
// 		type  : 'text',
// 	},
// 	{
// 		label   : 'Display',
// 		key     : 'display',
// 		type    : 'select',
// 		options : [
// 			{ label: 'Block', value: 'block' },
// 			{ label: 'Inline', value: 'inline' },
// 			{ label: 'Inline Block', value: 'inline-block' },
// 			{ label: 'Flex', value: 'flex' },
// 			{ label: 'Grid', value: 'grid' },
// 			{ label: 'None', value: 'none' },
// 		],
// 	},
// 	{ label: 'Height', key: 'height', type: 'number' },
// 	{ label: 'Width', key: 'width', type: 'number' },
// 	{
// 		label   : 'Flex Direction',
// 		key     : 'flex-direction',
// 		type    : 'select',
// 		options : [
// 			{ label: 'Row', value: 'row' },
// 			{ label: 'Row Reverse', value: 'row-reverse' },
// 			{ label: 'Column', value: 'column' },
// 			{ label: 'Column Reverse', value: 'column-reverse' },
// 		],
// 	},
// 	{ label: 'Flex Grow', key: 'flex-grow', type: 'number' },
// 	{ label: 'Flex Shrink', key: 'flex-shrink', type: 'number' },
// 	{ label: 'Flex Basis', key: 'flex-basis', type: 'number' },
// 	{
// 		label   : 'Align Items',
// 		key     : 'align-items',
// 		type    : 'select',
// 		options : [
// 			{ label: 'Stretch', value: 'stretch' },
// 			{ label: 'Center', value: 'center' },
// 			{ label: 'Flex Start', value: 'flex-start' },
// 			{ label: 'Flex End', value: 'flex-end' },
// 			{ label: 'Baseline', value: 'baseline' },
// 		],
// 	},
// 	{
// 		label   : 'Align Content',
// 		key     : 'align-content',
// 		type    : 'select',
// 		options : [
// 			{ label: 'Stretch', value: 'stretch' },
// 			{ label: 'Center', value: 'center' },
// 			{ label: 'Flex Start', value: 'flex-start' },
// 			{ label: 'Flex End', value: 'flex-end' },
// 			{ label: 'Space Between', value: 'space-between' },
// 			{ label: 'Space Around', value: 'space-around' },
// 		],
// 	},
// 	{
// 		label   : 'Align Self',
// 		key     : 'align-self',
// 		type    : 'select',
// 		options : [
// 			{ value: 'auto', label: 'Auto' },
// 			{ value: 'flex-start', label: 'Flex Start' },
// 			{ value: 'flex-end', label: 'Flex End' },
// 			{ value: 'center', label: 'Center' },
// 			{ value: 'baseline', label: 'Baseline' },
// 			{ value: 'stretch', label: 'Stretch' },
// 		],
// 	},
// 	{
// 		label   : 'Justify Content',
// 		key     : 'justify-content',
// 		type    : 'select',
// 		options : [
// 			{ value: 'flex-start', label: 'Flex Start' },
// 			{ value: 'flex-end', label: 'Flex End' },
// 			{ value: 'center', label: 'center' },
// 			{ value: 'space-between', label: 'Space Between' },
// 			{ value: 'space-around', label: 'Space Around' },
// 			{ value: 'space-evenly', label: 'Space Evenly' },
// 		],
// 	},
// 	{
// 		label : 'Margin',
// 		key   : 'margin',
// 		type  : 'number',
// 	},
// 	{
// 		label : 'Padding',
// 		key   : 'padding',
// 		type  : 'number',
// 	},
// ];

function DivSettings(props) {
	const { component, setComponent } = props;

	const [showUploadModal, setShowUploadModal] = useState(false);

	const isBackgroundImagePresent = Object.keys(component.style).includes(
		'background-image',
	);

	console.log('isBackgroundImagePresent ::', isBackgroundImagePresent);

	console.log('component ::', component);
	const handleChange = useCallback(
		(key, value) => {
			setComponent((prev) => ({
				...prev,
				style: {
					...component.style,
					[key]: value,
				},
			}));
		},
		[setComponent, component.style],
	);

	const handleInputChange = useCallback(
		(val, key) => {
			handleChange(key, val);
		},
		[handleChange],
	);

	const handleSelectChange = useCallback(
		(value, key) => {
			handleChange(key, value);
		},
		[handleChange],
	);

	const handleUploadChange = useCallback(
		(value, key) => {
			console.log('value ::', value);
			console.log('value ::', key);
			handleChange(key, value);
		},
		[handleChange],
	);

	const handleImageClick = (type) => {
		if (isBackgroundImagePresent && type === 'remove') {
			const modifiedKeys = Object.keys(component.style).filter(
				(key) => key !== 'background-image',
			);

			const newStyles = modifiedKeys.reduce((acc, key) => {
				acc[key] = component.style[key];
				return acc;
			}, {});

			setComponent((prev) => ({
				...prev,
				style: {
					...newStyles,
					display: 'block',
				},
			}));
		} else {
			setShowUploadModal(true);
		}
	};

	const modifiedImageUrl = extractUrlString(
		component.style?.['background-image'],
	);

	return (
		<section className={styles.settings_container}>
			<div>
				{divSettings.map((setting) => (
					<div key={setting.type}>
						<div className={styles.label}>{setting.type}</div>

						<div className={styles.section}>
							{setting.options.map((option) => {
								const { type, key, label, options } = option;

								const MAPPING = {
									select: (
										<Select
											value={component.style[key]}
											onChange={(value) => handleSelectChange(value, key)}
											style={{ width: '120px' }}
											options={options}
											placeholder="Select"
										/>
									),

									color: (
										<ColorInput
											colorKey={key}
											setComponent={setComponent}
											component={component}
										/>
									),
									upload: (
										<div className={styles.background_image}>
											{isBackgroundImagePresent && (
												<img
													width="64px"
													height="32px"
													style={{
														marginRight  : '12px',
														borderRadius : '8px',
													}}
													src={modifiedImageUrl}
													alt="background-img"
												/>
											)}

											{isBackgroundImagePresent ? (
												<>
													<Button
														type="button"
														themeType="secondary"
														onClick={() => handleImageClick('edit')}
													>
														Edit
													</Button>
													<IcMDelete
														className={styles.icons}
														style={{ marginLeft: '8px' }}
														width={24}
														height={24}
														fill="#EE3425"
														onClick={() => handleImageClick('remove')}
													/>
												</>
											) : (
												<Button
													type="button"
													themeType="secondary"
													style={{ width: '120px' }}
													onClick={() => handleImageClick('remove')}
												>
													Upload
													<IcMUpload
														className={styles.icons}
														style={{ marginLeft: '8px' }}
														width={20}
														height={20}
													/>
												</Button>
											)}

										</div>
									),
									number: (
										<NumberInput
											NumberKey={key}
											setComponent={setComponent}
											component={component}
										/>
									),
								};

								return (
									<div key={key}>
										<div className={styles.section_label}>{label}</div>
										{MAPPING[type]}
									</div>
								);
							})}
						</div>
					</div>
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
