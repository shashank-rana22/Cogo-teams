import { Button } from '@cogoport/components';
import { isEmpty, format } from '@cogoport/utils';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateMasterConfiguration from '../../../hooks/useCreateMasterConfiguration';

import styles from './styles.module.css';

const UploadController = getFieldController('fileUpload');
const InputController = getFieldController('textarea');

function CreateMastery(props) {
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
	} = useCreateMasterConfiguration({ masteryItemData, setToggleScreen, listRefetch });

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = formProps;

	const watch_image_input = watch('image_input');
	const updated_at = audits?.[0]?.created_at || null;

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
								Last Modified :
								{' '}
								{updated_at ? format(updated_at, 'dd MMMM yyyy') : '_'}
							</p>

							<p className={styles.text_styles}>
								Last Modified By :
								{' '}
								{created_by?.name}
							</p>

						</div>
					) : null}

					<h2 style={{ color: '#4f4f4f', marginTop: 28 }}>Add Mastery</h2>

					<p className={styles.text_styles2}>
						Select the conditions and number of completions necessary to
						obtain the badge.
					</p>
				</div>

				<div className={styles.content_container}>
					{getAddMasteryControls.map((controlItem) => {
						const ele = { ...controlItem };
						const Element = getFieldController(ele.type);
						if (!Element) return null;

						return (
							<div className={styles.form_container}>
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
							<p style={{ color: '#4f4f4f' }}>Badge PNG</p>

							<div className={styles.uploader}>
								<UploadController
									name="image_input"
									control={control}
									accept=".png, .jpeg"
									disabled={loading}
									rules={isEmpty(masteryItemData)
										? {
											required: 'Image is required',
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
										<img src={watch_image_input} alt="preview_image" />
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
							<p style={{ color: '#4f4f4f' }}>Description</p>

							<InputController
								name="description_input"
								className={styles.text_area}
								multiline
								disabled={loading}
								placeholder="Multimodal maestro is awarded
                                				to users who complete gold 3 in all of these badges"
								control={control}
								rules={{ required: 'Description is required' }}
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
						Cancel
					</Button>

					<Button
						size="md"
						themeType="primary"
						type="submit"
						id="save_button"
						loading={loading}
					>
						Save
					</Button>
				</div>
			</section>
		</form>
	);
}
export default CreateMastery;
