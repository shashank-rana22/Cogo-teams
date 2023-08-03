import { Select, Button } from '@cogoport/components';
import { IcMDelete, IcMUpload } from '@cogoport/icons-react';

import ColorInput from '../../../../../../../commons/ColorInput';
import NumberInput from '../../../../../../../commons/NumberInput';
import ProgressBar from '../../../../../../../commons/ProgressBar';

import styles from './styles.module.css';

function extractUrlString(urlString = '') {
	const urlRegex = /url\(([^)]+)\)/i;
	const match = urlString.match(urlRegex);

	if (match) {
		return match[1];
	}

	return urlString;
}

function Card(props) {
	const {
		pageConfiguration,
		selectedItem,
		handleChange,
		setShowUploadModal,
		setting,
		isRootComponent,
	} = props;

	const selectedComponent = isRootComponent ? pageConfiguration : selectedItem;

	const isBackgroundImagePresent = Object.keys(selectedComponent.style || {}).includes(
		'background-image',
	) && selectedComponent.style['background-image'] !== '';

	const handleImageClick = (key, type) => {
		if (isBackgroundImagePresent && type === 'remove') {
			handleChange(key, '');
		} else {
			setShowUploadModal(true);
		}
	};

	const imgUrl = isRootComponent ? pageConfiguration.style?.['background-image']
		: selectedItem?.component?.style?.['background-image'];

	const modifiedImageUrl = extractUrlString(imgUrl);

	const { type: settingType } = setting;

	return (

		<div className={styles.section}>
			{setting.options.map((option) => {
				const { type, key, label, options } = option;

				const MAPPING = {
					select: (
						<Select
							size="sm"
							value={isRootComponent ? pageConfiguration.style?.[key]
								: selectedItem?.component?.style?.[key]}
							onChange={(value) => handleChange(key, value, settingType)}
							style={{ width: '140px' }}
							options={options}
							placeholder="Select"
						/>
					),

					color: (
						<ColorInput
							colorKey={key}
							pageConfiguration={pageConfiguration}
							selectedItem={selectedItem}
							isRootComponent={isRootComponent}
							handleChange={handleChange}
							settingType={settingType}
						/>
					),
					range: (

						<ProgressBar
							imageKey={key}
							handleChange={handleChange}
							pageConfiguration={pageConfiguration}
							selectedItem={selectedItem}
							isRootComponent={isRootComponent}
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
							pageConfiguration={pageConfiguration}
							selectedItem={selectedItem}
							isRootComponent={isRootComponent}
							handleChange={handleChange}
							settingType={settingType}
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

export default Card;
