import { Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function GetCard({ data = {}, badgeListData = {}, control, watch, isLastItem }) {
	const { medalType, score = '', inputPlaceHolder = '' } = data;

	const InputElement = getFieldController('number');
	const UploadControler = getFieldController('fileUpload');

	const getBadgeImage = (medal) => {
		switch (medal) {
			case 'Bronze':
				return badgeListData?.badge_details[0]?.image_url;
			case 'Silver':
				return badgeListData?.badge_details[1]?.image_url;
			case 'Gold':
				return badgeListData?.badge_details[2]?.image_url;
			default:
				return '';
		}
	};

	return (
		<div className={`${styles.card_container} ${isLastItem ? styles.last_item : ''}`}>

			<div className={styles.display_flex} style={{ justifyContent: score ? 'center' : 'flex-start' }}>
				<div>
					<p style={{ color: '#4f4f4f', marginBottom: 15 }}>Medal</p>
					<p>{medalType}</p>
				</div>

				<div className={styles.verticalLine} />

				<div>
					<p style={{ color: '#4f4f4f' }}>Score</p>
					<InputElement
						name={`${medalType}_value`}
						value={score || ''}
						id={`${medalType}_value_input`}
						control={control}
						size="sm"
						placeholder={inputPlaceHolder}
					/>
				</div>
			</div>

			<div className={styles.lower_subheader2}>
				{`${medalType} Medal`}
				<IcMInfo className={styles.icm_info} />
			</div>
			<div className={styles.file_select_style}>
				<UploadControler
					name={`${medalType}_img_value`}
					control={control}
					uploadDesc="Upload files here"
					// style={{ width: score ? '93%' : '80%' }}
				/>
				<div>
					{
						watch(`${medalType}_img_value`)
							? 										(
								<div className={styles.preview}>
									<img src={watch(`${medalType}_img_value`)} alt="preview_image" />
								</div>
							)
							: null
					}
					{
					!isEmpty(data && badgeListData) && !watch(`${medalType}_img_value`)
						? (
							<div className={styles.preview}>
								<img
									src={getBadgeImage(medalType)}
									alt="badge img preview"
								/>
							</div>
						)
						: null
					}
				</div>
			</div>

			{ score && (
				<div className={styles.save_update}>
					<Button
						size="sm"
						type="submit"
						themeType="primary"
						id="save_request_btn"
					>
						Save
					</Button>
				</div>

			)}

		</div>
	);
}
export default GetCard;
