import { Button } from '@cogoport/components';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateMasterConfiguration from '../../../hooks/useCreateMasterConfiguration';
import useCreateNewMastery from '../../../hooks/useCreateNewMastery';
import Header from '../CreateBadge/header';

import styles from './styles.module.css';

function CreateMastery({ setWindow }) {
	const { formProps, getAddMasteryControls } = useCreateNewMastery();
	const InputDesc = getFieldController('text');

	const { control, handleSubmit } = formProps;

	const UploadController = getFieldController('fileUpload');

	const { loading, onMasterSubmit } = useCreateMasterConfiguration();

	const onClose = () => {
		setWindow(1);
	};

	const onSave = async (formValues, e) => {
		e.preventDefault();
		const { name, image_input, description_input } = formValues;

		const payload_data = {

			mastery_name           : name,
			description            : description_input,
			event_configuration_id : '',
			status                 : 'active',
			image_url              : image_input,
			// ToDo: add  badges data
			// badges,
		};

		await onMasterSubmit(payload_data);
	};
		// ToDo: add loading states

	if (loading) {
		return null;
	}
	return (
		<div>
			<form onSubmit={handleSubmit(onSave)}>
				<section className={styles.container}>
					<Header />
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
								/>
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
