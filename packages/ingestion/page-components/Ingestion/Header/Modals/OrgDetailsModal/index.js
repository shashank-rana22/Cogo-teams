import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import { getElementController } from '../../../../../utils/get-element-controls';

import { CpDiv, IeDiv, LeadDiv } from './NextHeading';
import styles from './styles.module.css';

function OrgDetailsModal({
	setShow = () => {}, show = '', uploadData, formProps = {}, modalControls = [],

}) {
	const BACK_PAGE_MAPPING = {
		organization : 'chooseModal',
		partner      : 'providerSelect',
		lead         : 'providerSelect',
	};

	const { control, formState: { errors }, handleSubmit, reset } = formProps;
	const onClose = () => {
		setShow('');
		reset();
	};

	const onBack = () => {
		setShow(BACK_PAGE_MAPPING[uploadData?.ingestion_type]);
		reset();
	};

	const CONSTANT_KEYS = {
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

	const onSubmit = () => {
		setShow('uploadModal');
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
			<div>
				<div className={styles.modal_container}>

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

				<div className={styles.close_button}>

					<Button
						themeType="secondary"
						style={{ marginRight: '8px' }}
						onClick={onBack}
					>
						Back

					</Button>
					<Button onClick={handleSubmit(onSubmit)}>Next</Button>
				</div>
			</div>

		</Modal>
	);
}

export default OrgDetailsModal;
