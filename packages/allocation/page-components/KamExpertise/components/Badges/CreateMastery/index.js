import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateMasterConfiguration from '../../../hooks/useCreateMasterConfiguration';

import styles from './styles.module.css';

const UploadController = getFieldController('fileUpload');
const InputController = getFieldController('textarea');

function CreateMastery(props) {
	const { t } = useTranslation(['allocation']);

	const {
		setToggleScreen,
		masteryItemData = {},
		listRefetch,
	} = props;

	const { audits = [], created_by = {} } = masteryItemData;

	const {
		formProps,
		getAddMasteryControls,
		loading = false,
		onSave,
		onClose,
	} = useCreateMasterConfiguration({ masteryItemData, setToggleScreen, listRefetch, t });

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = formProps;

	const watch_image_input = watch('image_input');
	const updated_at = audits?.[GLOBAL_CONSTANTS.zeroth_index]?.created_at || null;

	return (
		<form onSubmit={handleSubmit(onSave)}>
			<section className={styles.container}>
				<div>
					{!isEmpty(masteryItemData) ? (
						<div className={styles.fields_container}>
							<p
								className={styles.text_styles}
								style={{ paddingRight: '10px' }}
							>
								{t('allocation:last_modified_label')}
								{' '}
								:
								{' '}
								{updated_at ? formatDate({
									date       : updated_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
									formatType : 'date',
								}) : '_'}
							</p>

							<p className={styles.text_styles}>
								{t('allocation:last_modified_by_label')}
								{' '}
								:
								{' '}
								{created_by?.name}
							</p>

						</div>
					) : null}

					<h2 style={{ color: '#4f4f4f', marginTop: 28 }}>
						{t('allocation:add_mastery_label')}
					</h2>

					<p className={styles.text_styles2}>
						{t('allocation:create_mastery_phrase')}
					</p>
				</div>

				<div className={styles.content_container}>
					{getAddMasteryControls.map((controlItem) => {
						const ele = { ...controlItem };
						const Element = getFieldController(ele.type);
						if (!Element) return null;

						return (
							<div key={ele.name} className={styles.form_container}>
								{ele.label}

								<Element
									{...ele}
									control={control}
									key={ele.name}
									id={`${ele.name}_input`}
									style={ele.styles}
									disabled={
											(!isEmpty(masteryItemData) && ele.name === 'badges')
											|| (loading)
										}
								/>

								<div className={styles.error_message}>
									{errors?.[ele.name]?.message}
								</div>
							</div>
						);
					})}

					<div className={styles.lower_background}>
						<div style={{ width: '29%' }}>
							<p style={{ color: '#4f4f4f' }}>
								{t('allocation:badge_png')}
							</p>

							<div className={styles.uploader}>
								<UploadController
									name="image_input"
									control={control}
									accept=".png, .jpeg"
									disabled={loading}
									rules={isEmpty(masteryItemData)
										? {
											required: t('allocation:image_is_required'),
										}
										: {}}
								/>
								<div className={styles.error_message}>
									{errors?.image_input?.message}
								</div>
							</div>

							<div>
								{watch_image_input ? (
									<div className={styles.preview}>
										<img src={watch_image_input.finalUrl} alt="preview_image" />
									</div>
								) : null}

								{!isEmpty(masteryItemData) && !watch_image_input ? (
									<div className={styles.preview}>
										<img
											src={masteryItemData?.mastery_details?.image_url}
											alt="Modal img preview"
										/>
									</div>
								) : null}
							</div>

						</div>

						<div className={styles.text_area_container}>
							<p style={{ color: '#4f4f4f' }}>{t('allocation:description_label')}</p>

							<InputController
								name="description_input"
								className={styles.text_area}
								multiline
								disabled={loading}
								placeholder={t('allocation:description_input_placeholder')}
								control={control}
								rules={{ required: t('allocation:description_input_rules_required') }}
							/>

							<div className={styles.error_message}>
								{isEmpty(masteryItemData) && errors?.description_input?.message}
							</div>
						</div>
					</div>
				</div>

				<div className={styles.btncls}>
					<Button
						size="md"
						themeType="tertiary"
						style={{ marginRight: 10 }}
						onClick={onClose}
						disabled={loading}
					>
						{t('allocation:cancel_button')}
					</Button>

					<Button
						size="md"
						themeType="primary"
						type="submit"
						id="save_button"
						loading={loading}
					>
						{t('allocation:save_button')}
					</Button>
				</div>
			</section>
		</form>
	);
}
export default CreateMastery;
