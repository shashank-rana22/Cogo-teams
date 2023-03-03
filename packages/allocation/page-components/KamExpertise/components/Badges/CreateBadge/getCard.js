import { Input, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMInfo } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { getFieldController } from '../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function GetCard({ data, control, isLastItem, isBadgeEdit }) {
	const { medalType, inputPlaceHolder, setValue, scoreValue, imageValue, imageSelected } = data;

	const [img_url, setImg_url] = useState('');
	const InputElement = getFieldController('text');
	const UploadControler = getFieldController('fileUpload');

	useEffect(() => {
		setValue((pv) => ({ ...pv, [imageValue]: img_url }));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [img_url]);

	const handleChange = (item) =>{
		setImg_url(item)
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
					<InputElement
						name={`${medalType}_value`}
						id={`${medalType}_value_input`}
						control={control}
						size="sm"
						placeholder={inputPlaceHolder}
						// onChange={(val) => {
						// 	setValue((pv) => ({ ...pv, [scoreValue]: val }));
						// }}
					/>
				</div>
			</div>

			<div className={styles.lower_subheader2}>
				{`${medalType} Medal`}
				<IcMInfo className={styles.icm_info} />
			</div>

			<FileUploader
				name={`${medalType}_img_value`}
				uploadDesc="Upload files here"
				className={styles.file_select_style}
				value={imageSelected}
				onChange={(item)=>handleChange(item)}
				// onChange={(item = {}) => setValue((pv) => ({ ...pv, [imageValue]: item.finalUrl }))}
				style={{ width: isBadgeEdit ? '93%' : '80%' }}
				// accept=".png,.pkg"
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
