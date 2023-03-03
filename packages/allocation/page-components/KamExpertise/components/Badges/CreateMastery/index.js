import { Textarea, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { useState } from 'react';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useCreateMasterConfiguration from '../../../hooks/useCreateMasterConfiguration';
import useCreateNewMastery from '../../../hooks/useCreateNewMastery';
import Header from '../CreateBadge/header';

import styles from './styles.module.css';

function CreateMastery({ setWindow }) {
	const { formProps, getAddMasteryControls } = useCreateNewMastery();
	const InputDesc = getFieldController('text');

	const { control, watch, handleSubmit } = formProps;

	// console.log(watch());

	const UploadController = getFieldController('fileUpload');

	const { loading, onMasterSubmit } = useCreateMasterConfiguration();

	const onClose = () => {
		setWindow(1);
	};

	const [value, setValue] = useState([]);
	// const [file, setFile] = useState([]);

	// const params = {
	// 	name: {
	// 		size                     : 'md',
	// 		placeholder_singleSelect : 'Multi modal maestro',
	// 	},
	// 	badges: {
	// 		value,
	// 		onChange    : (val) => setValue(val),
	// 		placeholder : 'Select Badges',
	// 		options     : [
	// 			{
	// 				label : 'B',
	// 				value : 'n',
	// 			},
	// 			{
	// 				label : 'uy',
	// 				value : 'dfs',
	// 			},
	// 		],
	// 		isClearable : true,
	// 		style       : { width: '200px' },
	// 	},
	// 	description: {
	// 		size: 'md',
	// 		placeholder_singleSelect:
	//         'Multimodal maestro is awarded to users who complete gold 3 in all of these badges',
	// 	},

	// };
	// const labelInputPairsdata = [
	// 	{
	// 		labelName          : 'Mastery Name',
	// 		multiInput         : false,
	// 		singleSelectParams : params.name,
	// 		multiSelectParams  : {},
	// 		style              : { flexBasis: '20%' },
	// 	},
	// 	{
	// 		labelName          : 'Badges',
	// 		multiInput         : true,
	// 		singleSelectParams : {},
	// 		multiSelectParams  : params.badges,
	// 		style              : { flexBasis: '20%' },
	// 	},
	// ];

	// const onClose = () => {
	// 	setWindow(1);
	// };

	// const handleSubmit = async () => {
	// 	await onMasterSubmit();
	// 	// onClose();
	// };

	const onSave = async (formValues, e) => {
		// console.log('formvalues :', formValues);
		e.preventDefault();
		const { name, image_input, description_input } = formValues;

		const payload_data = {

			mastery_name           : name,
			description            : description_input,
			event_configuration_id : '',
			status                 : 'active',
			image_url              : image_input,
			// badges,
		};

		await onMasterSubmit(payload_data);
	};

	return (
		// <div size="xl" show onClose={onClose} placement="center"></div>
		<div>
			<form onSubmit={handleSubmit(onSave)}>
				<section className={styles.container}>
					<Header />
					<div className={styles.content_container}>
						{/* {
					labelInputPairsdata.map((data) => (
						<GetLabelInputPair
							data={data}
							// labelName={data.labelName}
							// multiInput={data.multiInput}
							// singleSelectParams={data.singleSelectParams}
							// multiSelectParams={data.multiSelectParams}
							// style={data.style}
						/>
					))
					} */}
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
