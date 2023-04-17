import { Select, Button } from '@cogoport/components';
import { IcMDelete, IcMUpload } from '@cogoport/icons-react';
import React, { useCallback } from 'react';

import ColorInput from '../../../../../../commons/ColorInput';
import NumberInput from '../../../../../../commons/NumberInput';

import styles from './styles.module.css';

function extractUrlString(urlString = '') {
	const urlRegex = /url\(([^)]+)\)/i;
	const match = urlString.match(urlRegex);

	if (match) {
		return match[1];
	}

	return urlString;
}

function SettingsCard(props) {
	const {
		setComponent,
		component,
		selectedRow,
		handleChange,
		setShowUploadModal,
		setting,
		isRootComponent,
	} = props;

	const selectedComponent = isRootComponent ? component : selectedRow;

	const isBackgroundImagePresent = Object.keys(selectedComponent.style).includes(
		'background-image',
	) && selectedComponent.style['background-image'] !== '';

	const handleSelectChange = useCallback(
		(value, key) => {
			handleChange(key, value);
		},
		[handleChange],
	);

	const handleImageClick = (key, type) => {
		if (isBackgroundImagePresent && type === 'remove') {
			handleChange(key, '');
		} else {
			setShowUploadModal(true);
		}
	};

	const modifiedImageUrl = extractUrlString(
		selectedComponent.style?.['background-image'],
	);

	return (

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
							selectedRow={selectedRow}
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
										onClick={() => handleImageClick(key, 'edit')}
									>
										Edit
									</Button>
									<IcMDelete
										className={styles.icons}
										style={{ marginLeft: '8px' }}
										width={24}
										height={24}
										fill="#EE3425"
										onClick={() => handleImageClick(key, 'remove')}
									/>
								</>
							) : (
								<Button
									type="button"
									themeType="secondary"
									style={{ width: '120px' }}
									onClick={() => handleImageClick(key, 'upload')}
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

	);
}

export default SettingsCard;
