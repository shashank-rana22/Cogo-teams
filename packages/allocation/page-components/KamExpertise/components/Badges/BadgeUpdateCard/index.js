import { Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function BadgeUpdateCard({ data = {}, badgeListData = {}, control, errors = '', watch, isLastItem }) {
	const { medalType, score = '', inputPlaceHolder = '' } = data;

	const InputElement = getFieldController('number');
	const UploadControler = getFieldController('fileUpload');

	const MEDAL_IMAGE_MAPPING = {
		Bronze : badgeListData?.badge_details?.[0]?.image_url,
		Silver : badgeListData?.badge_details?.[1]?.image_url,
		Gold   : badgeListData?.badge_details?.[2]?.image_url,
	};

	return (
		<div className={`${styles.card_container} ${isLastItem ? styles.last_item : ''}`}>
			<div className={styles.display_flex} style={{ justifyContent: score ? 'center' : 'flex-start' }}>
				<div>
					<p style={{ color: '#4f4f4f', marginBottom: 16 }}>Medal</p>

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
						rules={{
							required: 'Score is required',
						}}
					/>

					<div className={styles.error_message}>
						{errors?.[`${medalType}_value_input`]?.message}
					</div>

				</div>
			</div>

			<div className={styles.lower_subheader2}>
				{`${medalType} Medal`}
				<IcMInfo className={styles.icm_info} />
			</div>

			<div className={styles.file_select_style}>
				<div className={styles.uploader}>
					<UploadControler
						name={`${medalType}_img_value`}
						control={control}
						accept=".png, .jpeg"
						rules={isEmpty(badgeListData) ? {
							required: 'Image is required',
						} : {}}
					/>
				</div>

				<div className={styles.error_message}>
					{errors?.[`${medalType}_img_value`]?.message}
				</div>

				<div>
					{ watch(`${medalType}_img_value`)
						? (
							<div className={styles.preview}>
								<img src={watch(`${medalType}_img_value`)} alt="preview_image" />
							</div>
						)
						: null}

					{
					!isEmpty(data && badgeListData) && !watch(`${medalType}_img_value`)
						? (
							<div className={styles.preview}>
								<img
									src={MEDAL_IMAGE_MAPPING[medalType]}
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
export default BadgeUpdateCard;
