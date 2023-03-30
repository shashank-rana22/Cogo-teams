import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import { getElementController } from '../../../../../utils/get-element-controls';

import styles from './styles.module.css';

function OrgDetailsModal({
	setShow = () => {}, show = '', setUploadData = () => {}, uploadData, formProps, modalControls,

}) {
	const NEXT_PAGE_MAPPING = {
		organization : 'chooseModal',
		partner      : 'providerSelect',
		lead         : 'providerSelect',
	};

	console.log('upload', uploadData);
	const { control, formState: { errors }, handleSubmit, reset } = formProps;
	console.log('okform::', formProps.getValues());
	const onClose = () => {
		setShow('');
		// setUploadData({
		// 	...uploadData,

		// });
		reset();
	};

	const onBack = () => {
		setShow(NEXT_PAGE_MAPPING[uploadData?.ingestion_type]);
		reset();
	};

	function LeadDiv() {
		return (
			<div>
				Please provide more details about Leads
			</div>
		);
	}

	function CpDiv() {
		return (
			<div>
				Please provide more details about Channel Partners
			</div>
		);
	}

	function IeDiv() {
		return (
			<div>
				Please provide more details about Importer Exporter
			</div>
		);
	}

	const CONSTANT_KEYS = {
		// LANDING     : '',
		LEAD              : 'lead',
		CHANNEL_PARTNER   : 'partner',
		IMPORTER_EXPORTER : 'organization',
	};

	const {
		LEAD, CHANNEL_PARTNER, IMPORTER_EXPORTER,
	} = CONSTANT_KEYS;

	const INGESTION_COMPONENTS_MAPPING = {
		[LEAD]              : LeadDiv,
		[CHANNEL_PARTNER]   : CpDiv,
		[IMPORTER_EXPORTER] : IeDiv,
	};

	const TopDiv = INGESTION_COMPONENTS_MAPPING[uploadData?.ingestion_type] || null;

	// console.log('controls::', controls);

	// console.log('formprops', formProps);

	// console.log('inges', ingestionData);
	// const IsCpOptions = [
	// 	{ label: 'Yes', value: true },
	// 	{ label: 'No', value: false },
	// ];

	// console.log('ingestionData::', ingestionData?.option1);

	const onSubmit = () => {
		// console.log('values', values);
		setShow('uploadModal');
		// setUploadData({
		// 	...uploadData,
		// 	// country_id : values?.country_id,
		// 	// partner_id : values?.partner,
		// });
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
					{/* {
                    ingestionData?.option1 === 'org' ? (
	<div>
		Please provide more details about
		Organizations
	</div>
                    )	: (
	<div>
		Please provide more details about the leads

		<div className={styles.form_section}>
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
		</div>
	</div>

                    )
                } */}

					{
						TopDiv && <TopDiv />

				}

					{

						modalControls.map((controlItem) => {
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
					onClick={onBack}
				>
					Back

				</Button>
				<Button onClick={(onSubmit)}>Next</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default OrgDetailsModal;
