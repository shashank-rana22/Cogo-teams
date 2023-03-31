import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ProviderSelectModal({ setShow = () => {}, show = '', setUploadData = () => {}, uploadData, formProps }) {
	const { reset } = formProps;

	console.log('ingestion_type', uploadData.ingestion_type);
	const FINAL_MODAL_MAPPING_CP = {
		// IE           : 'a. Upload Importer/Exporter CSV',
		CPBuy        : 'a. Upload Channel Partner (buy persona) CSV',
		CPSell       : 'b. Upload Channel Partner (sell persona) CSV',
		CPBuyAndSell : 'c. Channel Partner (buy and sell persona) CSV',
	};

	const ProviderCpOptions = [
		// { key: 'a. Importer/ Exporter', type: 'IE' },
		{ key: 'a. Channel Partner (buy persona)', type: 'CPBuy' },
		{ key: 'b. Channel Partner (sell persona)', type: 'CPSell' },
		{ key: 'c. Channel Partner (buy and sell persona)', type: 'CPBuyAndSell' },
	];

	const FINAL_MODAL_MAPPING_LEADS = {
		IE : 'a. Upload Importer/Exporter CSV',
		SP : 'b. Upload Service Provider CSV',
		// CPBuy  : 'c. Upload Channel Partner (buy persona) CSV',
		// CPSell : 'd. Upload Channel Partner (sell persona) CSV',
	};

	const ProviderLeadOptions = [
		{ key: 'a. Importer/ Exporter', type: 'IE' },
		{ key: 'b. Service Provider', type: 'SP' },
		// { key: 'c. Channel Partner (buy persona)', type: 'CPBuy' },
		// { key: 'd. Channel Partner (sell persona)', type: 'CPSell' },
	];

	// const FINAL_MODAL_MAPPING_IE = {
	// 	IE: 'Upload Importer/Exporter CSV',

	// };

	// const ProviderIeOptions = [
	// 	{ key: 'Importer/ Exporter', type: 'IE' },

	// ];

	const onClose = () => {
		setShow('');
		reset();
	};

	let ProviderButtonOptions = [];
	let FINAL_MODAL_MAPPING = {};

	if (uploadData?.ingestion_type === 'lead') {
		ProviderButtonOptions = ProviderLeadOptions;
		FINAL_MODAL_MAPPING = FINAL_MODAL_MAPPING_LEADS;
	} else if (uploadData?.ingestion_type === 'partner') {
		ProviderButtonOptions = ProviderCpOptions;
		FINAL_MODAL_MAPPING = FINAL_MODAL_MAPPING_CP;
	}

	const IS_CHANNEL_PARTNER_MAPPING = {
		IE : false,
		SP : true,
	};

	const onChoose = (input) => {
		// console.log('input', input);
		setUploadData({
			...uploadData,
			finalModalHeading  : input?.key,
			is_channel_partner : IS_CHANNEL_PARTNER_MAPPING[input?.type],
		});
		reset();
		setShow('orgDetails');
	};
	// console.log('ingestionData::', uploadData);

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
				{/* <Button style={{ marginRight: '8px' }} onClick={() => setShow('uploadModal')}>Next</Button> */}

			</Modal.Footer>
		</Modal>
	);
}

export default ProviderSelectModal;
