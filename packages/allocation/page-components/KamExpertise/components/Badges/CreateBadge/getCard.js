import { Input, FileSelect, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
// import { useState, useEffect } from 'react';

// import useBadgeConfigurationAttributes from '../../../hooks/useBadgeConfigurationAttributes';

import styles from './styles.module.css';

function GetCard({ data, isLastItem, isBadgeEdit }) {
	const { medalType, inputPlaceHolder, setValue, scoreValue, imageValue, imageSelected } = data;

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
					<Input
						size="sm"
						placeholder={inputPlaceHolder}
						onChange={(val) => {
							setValue((pv) => ({ ...pv, [scoreValue]: val }));
						}}
					/>
				</div>
			</div>

			<div className={styles.lower_subheader2}>
				{`${medalType} Medal`}
				<IcMInfo className={styles.icm_info} />
			</div>

			<FileSelect
				uploadDesc="Upload files here"
				className={styles.file_select_style}
				value={imageSelected}
				onChange={(val) => {
					setValue((pv) => ({ ...pv, [imageValue]: val }));
				}}
				// accept=".png,.pkg"
				style={{ width: isBadgeEdit ? '93%' : '80%' }}
			/>
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
