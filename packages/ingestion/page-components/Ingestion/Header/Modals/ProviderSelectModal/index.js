import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ProviderSelectModal({ setShow = () => {}, show = '', setUploadData = () => {}, uploadData, formProps }) {
	const { reset } = formProps;

	// console.log('ingestion_type', uploadData.ingestion_type);
	// const FINAL_MODAL_MAPPING_CP = {
	// 	CPBuy        : 'a. Upload Channel Partner (buy persona) CSV',
	// 	CPSell       : 'b. Upload Channel Partner (sell persona) CSV',
	// 	CPBuyAndSell : 'c. Channel Partner (buy and sell persona) CSV',
	// };

	const ProviderCpOptions = [
		{ key: 'a. Channel Partner (buy persona)', type: 'CPBuy' },
		{ key: 'b. Channel Partner (sell persona)', type: 'CPSell' },
		{ key: 'c. Channel Partner (buy and sell persona)', type: 'CPBuyAndSell' },
	];

	// const FINAL_MODAL_MAPPING_LEADS = {
	// 	IE : 'a. Upload Importer/Exporter CSV',
	// 	SP : 'b. Upload Service Provider CSV',
	// };

	const ProviderLeadOptions = [
		{ key: 'a. Importer/ Exporter', type: 'IE' },
		{ key: 'b. Service Provider', type: 'SP' },
	];

	const onClose = () => {
		setShow('');
		reset();
	};

	let ProviderButtonOptions = [];
	// let FINAL_MODAL_MAPPING = {};

	const PROVIDER_BUTTON_MAPPING = {
		lead    : ProviderLeadOptions,
		partner : ProviderCpOptions,
	};

	ProviderButtonOptions = PROVIDER_BUTTON_MAPPING[uploadData?.ingestion_type];

	// if (uploadData?.ingestion_type === 'lead') {
	// 	ProviderButtonOptions = ProviderLeadOptions;
	// 	// FINAL_MODAL_MAPPING = FINAL_MODAL_MAPPING_LEADS;
	// } else if (uploadData?.ingestion_type === 'partner') {
	// 	ProviderButtonOptions = ProviderCpOptions;
	// 	// FINAL_MODAL_MAPPING = FINAL_MODAL_MAPPING_CP;
	// }

	const IS_CHANNEL_PARTNER_MAPPING = {
		IE           : false,
		SP           : true,
		CPSell       : true,
		CPBuy        : true,
		CPBuyAndSell : true,
	};

	const onChoose = (input) => {
		setUploadData({
			...uploadData,
			finalModalHeading  : input?.key,
			is_channel_partner : IS_CHANNEL_PARTNER_MAPPING[input?.type],
		});
		reset();
		setShow('orgDetails');
	};

	return (
		<Modal size="md" show={show === 'providerSelect'} onClose={onClose} placement="center">
			<Modal.Header title={(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMUpload style={{ margin: '0 4px 0 0' }} />
					{' '}
					Upload CSV
				</div>
			)}
			/>
			<Modal.Body>
				<div style={{ margin: '0 0 12px 0' }}>What do you wish to upload CSV for?</div>

				<div className={styles.provider_container}>
					{ProviderButtonOptions.map((response) => (
						<Button
							themeType="secondary"
							onClick={() => {
								onChoose(response);
							}}
							key={response?.key}
							style={{ width: '80%', height: '44px' }}
						>
							{response?.key}

						</Button>
					))}

				</div>

			</Modal.Body>
			<Modal.Footer>

				<Button themeType="secondary" onClick={() => setShow('chooseModal')}>Back</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default ProviderSelectModal;
