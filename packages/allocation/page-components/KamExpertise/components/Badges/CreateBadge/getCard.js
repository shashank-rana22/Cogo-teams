import { Input, FileSelect, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import useBadgeConfigurationAttributes from '../../../hooks/useBadgeConfigurationAttributes';

import styles from './styles.module.css';

function GetCard(props) {
	const { medalType, inputPlaceHolder, isLastItem } = props;

	const {
		onCheckPublish, loading,
	} = useBadgeConfigurationAttributes();

	// const upload_props = {
	// 	name            : 'flag_icon_url',
	// 	showLabel       : false,
	// 	label           : 'Flag Icon svg/image',
	// 	span            : 12,
	// 	type            : 'file',
	// 	themeType       : 'secondary',
	// 	drag            : true,
	// 	multiple       	: true,
	// 	uploadIcon      : 'ic-upload',
	// 	onlyURLOnChange : true,
	// 	accept          : 'image/*',
	// 	uploadType      : 'aws',
	// };

	const [value, setValue] = useState();
	return (
		<div className={`${styles.card_container} ${isLastItem ? styles.last_item : ''}`}>

			<div className={styles.display_flex}>
				<div>
					<p style={{ color: '#4f4f4f', marginBottom: 15 }}>Medal</p>
					<p>{medalType}</p>
				</div>

				<div className={styles.verticalLine} />

				<div>
					<p style={{ color: '#4f4f4f' }}>Score</p>
					<Input size="sm" placeholder={inputPlaceHolder} />
				</div>
			</div>

			<div className={styles.lower_subheader2}>
				{`${medalType} Medal`}
				<IcMInfo className={styles.icm_info} />
			</div>

			<div className={styles.display_flex} style={{ alignItems: 'flex-end' }}>
				{/* <FileSelect {... upload_props} /> */}
				<FileSelect
					uploadDesc="Upload files here"
					className={styles.file_select_style}
					value={value}
					onChange={(val) => setValue(val)}
					// accept=".png,.pkg"
				/>

				<Button
					size="sm"
					themeType="primary"
					disabled={loading}
					onClick={onCheckPublish}
				>
					Save
				</Button>
			</div>

		</div>
	);
}
export default GetCard;
