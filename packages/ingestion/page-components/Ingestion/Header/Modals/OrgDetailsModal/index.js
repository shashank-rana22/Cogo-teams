import { Modal, Button, Select } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import controls from '../../../../../utils/controls';
import { getElementController } from '../../../../../utils/get-element-controls';

import styles from './styles.module.css';

function OrgDetailsModal({
	setShow = () => {}, show = '', setIngestionData = () => {}, ingestionData, formProps,

}) {
	const { control, formState: { errors }, handleSubmit, reset } = formProps;
	const onClose = () => {
		setShow('');
		setIngestionData({
			...ingestionData,

		});
	};

	// console.log('controls::', controls);

	// console.log('formprops', formProps);

	// console.log('inges', ingestionData);
	// const IsCpOptions = [
	// 	{ label: 'Yes', value: true },
	// 	{ label: 'No', value: false },
	// ];

	// console.log('ingestionData::', ingestionData?.option1);

	const onSubmit = (values) => {
		console.log('values', values);
		setShow('providerSelect');
		setIngestionData({
			...ingestionData,
			country : values?.country_id,
			partner : values?.partner,
		});
	};

	return (
		<Modal size="md" show={show === 'orgDetails'} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					{' '}
					Upload CSV
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.modal_container}>
					{
                    ingestionData?.option1 === 'org' ? (
	<div>
		Please provide more details about
		Organizations
	</div>
                    )	: (
	<div>
		Please provide more details about the leads

		{/* <div className={styles.form_section}>
			Is Channel Partner
			<Select
				value={ingestionData?.isCp}
				onChange={(e) => setIngestionData({
					...ingestionData,
					isCp: e,
				})}
				placeholder="Is Channel Partner"
				isClearable
				options={IsCpOptions}
			/>
		</div> */}
	</div>

                    )
                }

					{

						controls.map((controlItem) => {
							const el = { ...controlItem };
							const Element = getElementController(el.type);
							if (!Element) return null;
							return (
								<div style={el.style} className={styles.control_container}>
									<span className={styles.control_label}>{el.label}</span>

									<Element
										{...el}
										size="md"
										key={el.name}
										control={control}
										id={`${el.name}_input`}
									/>

									<div className={styles.error_message}>
										{errors?.[el.name]?.message}
									</div>
								</div>
							);
						})

                }

				</div>

			</Modal.Body>
			<Modal.Footer>

				<Button
					themeType="secondary"
					style={{ marginRight: '8px' }}
					onClick={() => {
						setShow('chooseModal');
						reset();
					}}
				>
					Back

				</Button>
				<Button onClick={handleSubmit(onSubmit)}>Next</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default OrgDetailsModal;
