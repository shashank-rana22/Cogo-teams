import { Button } from '@cogoport/components';
import { isEmpty, format } from '@cogoport/utils';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateMasterConfiguration from '../../../hooks/useCreateMasterConfiguration';

import styles from './styles.module.css';

function CreateMastery(props) {
	const {
		setToggleScreen,
		badgeList = {},
		masteryListData = {},
		listRefetch,
	} = props;

	const onClose = () => {
		setToggleScreen(1);
	};

	const {
		formProps,
		getAddMasteryControls,
		loading = false,
		onSave,
	} = useCreateMasterConfiguration({ masteryListData, onClose, listRefetch });

	const UploadController = getFieldController('fileUpload');
	const InputDesc = getFieldController('textarea');

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = formProps;

	const badge_options = []; // for multi-select badges
	(badgeList || {}).forEach((badge_data) => {
		if (badge_data.expertise_configuration_type === 'event_configuration') {
			badge_options.push({
				value : badge_data.id,
				label : badge_data.badge_name,
			});
		}
	});

	return (
		<div>
			<form onSubmit={handleSubmit(onSave)}>
				<section className={styles.container}>
					<div>
						{isEmpty(masteryListData) ? null : (
							<div className={styles.fields_container}>
								<p
									className={styles.text_styles}
									style={{ paddingRight: '10px' }}
								>
									Last Modified :
									{' '}
									{format(masteryListData.updated_at, 'yyyy-MMM-dd')}
								</p>

								{/* //! needs changes */}
								{/* <p className={styles.text_styles}>Last Modified By :</p> */}
							</div>
						)}

						<h2 style={{ color: '#4f4f4f', marginTop: 28 }}>Add Mastery</h2>
						<p className={styles.text_styles2}>
							Select the conditions and number of completions necessary to
							obtain the badge.
						</p>
					</div>
					<div className={styles.content_container}>
						{
						getAddMasteryControls.map((controlItem) => {
							const ele = { ...controlItem };
							const Element = getFieldController(ele.type);
							if (!Element) return null;

							return (
								<div className={styles.form_container}>
									<div>{ele.label}</div>
									<Element
										{...ele}
										control={control}
										key={ele.name}
										id={`${ele.name}_input`}
										style={ele.styles}
										disabled={!isEmpty(masteryListData) && ele.name === 'badges'}
										options={badgeList.length > 0 ? badge_options : ele.options}
									/>

									<div className={styles.error_message}>
										{errors?.[ele.name]?.message}
									</div>
								</div>
							);
						})
						}
						<div className={styles.lower_background}>
							<div style={{ flexBasis: '29%' }}>
								<p style={{ color: '#4f4f4f' }}>Badge PNG</p>
								<div className={styles.uploader}>
									<UploadController
										name="image_input"
										control={control}
										accept=".png, .jpeg"
										rules={isEmpty(masteryListData)
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
									{watch('image_input') ? (
										<div className={styles.preview}>
											<img src={watch('image_input')} alt="preview_image" />
										</div>
									) : null}
									{!isEmpty(masteryListData) && !watch('image_input') ? (
										<div className={styles.preview}>
											<img
												src={masteryListData.badge_details[0].image_url}
												alt="Modal img preview"
											/>
										</div>
									) : null}
								</div>
							</div>
							<div className={styles.text_area_container}>
								<p style={{ color: '#4f4f4f' }}>Description</p>
								<InputDesc
									name="description_input"
									className={styles.text_area}
									multiline
									placeholder="Multimodal maestro is awarded
                                				to users who complete gold 3 in all of these badges"
									control={control}
									rules={{ required: 'Description is required' }}
								/>
								<div className={styles.error_message}>
									{isEmpty(masteryListData) && errors?.description_input?.message}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.btncls}>
						<Button
							size="md"
							themeType="secondary"
							style={{ marginRight: 10, borderWidth: 0 }}
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
							disabled={loading}
						>
							Save
						</Button>
					</div>
				</section>
			</form>
		</div>
	);
}
export default CreateMastery;
