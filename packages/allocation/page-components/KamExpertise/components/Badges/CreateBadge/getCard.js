import { Input, FileSelect, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMInfo } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

// import useBadgeConfigurationAttributes from '../../../hooks/useBadgeConfigurationAttributes';

import styles from './styles.module.css';

function GetCard(props) {
	const { medalType, inputPlaceHolder, setScore, setUrl, isLastItem, isBadgeEdit } = props;

	// const [value, setValue] = useState();

	function handleUrl(item = {}) {
		setUrl(item.finalUrl);
	}
	return (
		<div className={`${styles.card_container} ${isLastItem ? styles.last_item : ''}`}>

			<div className={styles.display_flex} style={{ justifyContent: isBadgeEdit ? 'center' : 'flex-start' }}>
				<div>
					<p style={{ color: '#4f4f4f', marginBottom: 15 }}>Medal</p>
					<p>{medalType}</p>
				</div>

				<div className={styles.verticalLine} />

				<div>
					<p style={{ color: '#4f4f4f' }}>Score</p>
					<Input size="sm" placeholder={inputPlaceHolder} onChange={(val) => setScore(val)} />
				</div>
			</div>

			<div className={styles.lower_subheader2}>
				{`${medalType} Medal`}
				<IcMInfo className={styles.icm_info} />
			</div>

			{/* <div className={styles.display_flex} style={{ alignItems: 'flex-end' }}> */}
			{/* <FileSelect {... upload_props} /> */}

			<FileUploader
				uploadDesc="Upload files here"
				className={styles.file_select_style}
				onChange={(item) => handleUrl(item)}
				style={{ width: isBadgeEdit ? '93%' : '80%' }}
			/>

			{/* <FileSelect
				uploadDesc="Upload files here"
				className={styles.file_select_style}
				value={value}
				onChange={(val) => setValue(val)}
				// accept=".png,.pkg"
				style={{ width: isBadgeEdit ? '93%' : '80%' }}
			/> */}

			{ isBadgeEdit && (
				<div className={styles.save_update}>
					<Button
						size="sm"
						themeType="primary"
					>
						Save
					</Button>
				</div>

			)}

			{/*
				<Button
					size="sm"
					themeType="primary"
					disabled={loading}
					onClick={onCheckPublish}
				>
					Save
				</Button> */}
			{/* </div> */}

		</div>
	);
}
export default GetCard;
