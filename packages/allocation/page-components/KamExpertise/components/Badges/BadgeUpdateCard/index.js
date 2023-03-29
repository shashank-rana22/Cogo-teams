import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function BadgeUpdateCard(props) {
	const {
		badgeItemData = {},
		control,
		errors = '',
		watch,
		isLastItem,
		loading = false,
		isSingleBadgeEdit = false,
		medalType,
	} = props;

	const { bronze_details = {}, silver_details = {}, gold_details = {} } = badgeItemData;

	const MEDAL_IMAGE_MAPPING = {
		Bronze : bronze_details,
		Silver : silver_details,
		Gold   : gold_details,
	};

	const InputController = getFieldController('number');
	const UploadController = getFieldController('fileUpload');

	const watch_image_value = watch(`${medalType}_img_value`);

	return (
		<div className={`${styles.card_container} ${isLastItem ? styles.last_item : ''}`}>
			<div
				className={styles.display_flex}
				style={{ justifyContent: isSingleBadgeEdit ? 'center' : 'flex-start' }}
			>
				<div>
					<p style={{ color: '#4f4f4f', marginBottom: 16 }}>Medal</p>
					<p>{medalType}</p>
				</div>

				<div className={styles.vertical_line} />

				<div>
					<p style={{ color: '#4f4f4f' }}>Score</p>

					<InputController
						name={`${medalType}_value`}
						value={MEDAL_IMAGE_MAPPING[medalType]?.score || undefined}
						id={`${medalType}_value_input`}
						control={control}
						size="sm"
						placeholder="000"
						rules={{
							required: 'Score is required',
						}}
						disabled={loading}
					/>

					<div className={styles.error_message}>
						{errors?.[`${medalType}_value`]?.message}
					</div>

				</div>
			</div>

			<div className={styles.lower_subheader2}>
				{medalType}
				{' '}
				Medal
			</div>

			<div className={styles.file_select_style}>
				<div className={styles.uploader}>
					<UploadController
						name={`${medalType}_img_value`}
						control={control}
						disabled={loading}
						accept=".png, .jpeg"
						rules={isEmpty(badgeItemData) ? {
							required: 'Image is required',
						} : {}}
					/>
				</div>

				<div className={styles.error_message}>
					{errors?.[`${medalType}_img_value`]?.message}
				</div>

				<div>
					{watch_image_value
						? (
							<div className={styles.preview}>
								<img src={watch_image_value} alt="preview_image" />
							</div>
						)
						: null}

					{!isEmpty(badgeItemData) && !watch_image_value
						? (
							<div className={styles.preview}>
								<img
									src={MEDAL_IMAGE_MAPPING[medalType]?.image_url}
									alt="badge img preview"
								/>
							</div>
						)
						: null}

				</div>
			</div>

			{ isSingleBadgeEdit && (
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
