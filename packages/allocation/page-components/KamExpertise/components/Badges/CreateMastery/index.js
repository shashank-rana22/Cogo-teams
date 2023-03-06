import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateMasterConfiguration from '../../../hooks/useCreateMasterConfiguration';
import useCreateNewMastery from '../../../hooks/useCreateNewMastery';
import Header from '../CreateBadge/header';

import styles from './styles.module.css';

function CreateMastery({ setToggleScreen, badgeList = {}, masteryListData = {} }) {
	const { formProps, getAddMasteryControls } = useCreateNewMastery(masteryListData);

	const InputDesc = getFieldController('text');

	const { control, watch, handleSubmit } = formProps;

	const UploadController = getFieldController('fileUpload');

	const onClose = () => {
		setToggleScreen(1);
	};

	const { loading, onSave } = useCreateMasterConfiguration({ onClose });

	const badge_options = []; // for multi-select badges
	(badgeList || {}).forEach((badge_data) => {
		if (badge_data.medal_collection.length === 0) {
			badge_options.push(
				{ value: badge_data.badge_name, label: badge_data.badge_name },
			);
		}
	});

	if (loading) {
		return null;
	}
	return (
		<div>
			<form onSubmit={handleSubmit(onSave)}>
				<section className={styles.container}>
					<Header badge_type="Mastery" />
					<div className={styles.content_container}>
						{
						getAddMasteryControls.map((controlItem) => {
							const ele = { ...controlItem };

							const Element = getFieldController(ele.type);

							if (!Element) return null;

							return (
								<div>
									<div>{ele.label}</div>
									<Element
										{...ele}
										control={control}
										key={ele.name}
										id={`${ele.name}_input`}
										style={ele.styles}
										options={badgeList.length > 0 ? badge_options : ele.options}
									/>
								</div>
							);
						})
					}
						<div className={styles.lower_background}>
							<div style={{ flexBasis: '29%' }}>
								<p style={{ color: '#4f4f4f' }}>Badge PNG</p>
								<UploadController
									name="image_input"
									control={control}
									// value={masteryListData ? masteryListData.badge_details[0].image_url : ''}
								/>

								<div>
									{
									watch('image_input')
										? 										(
											<div className={styles.preview}>
												<img src={watch('image_input')} alt="preview_image" />
											</div>
										)
										: null
									}
									{
									!isEmpty(masteryListData) && !watch('image_input')
										? (
											<div className={styles.preview}>
												<img
													src={masteryListData.badge_details[0].image_url}
													alt="Modal img preview"
												/>
											</div>
										)
										: null
								}
								</div>

							</div>
							<div className={styles.text_area_container}>
								<p style={{ color: '#4f4f4f' }}>Description</p>
								<InputDesc
									name="description_input"
									className={styles.text_area}
									size="sm"
									placeholder="Multimodal maestro is awarded
                                to users who complete gold 3 in all of these badges"
									control={control}
									value={masteryListData ? masteryListData.description : ''}
								/>
							</div>
						</div>
					</div>
					<div className={styles.btncls}>
						<Button
							size="md"
							themeType="secondary"
							style={{ marginRight: 10, borderWidth: 0 }}
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							size="md"
							themeType="primary"
							type="submit"
							id="save_button"
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
