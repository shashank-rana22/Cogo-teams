import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ProviderSelectModal({ setShow = () => {}, show = '', setIngestionData = () => {}, ingestionData }) {
	const FINAL_MODAL_MAPPING_ORGS = {
		IE           : 'a. Upload Importer/Exporter CSV',
		CPBuy        : 'b. Upload Channel Partner (buy persona) CSV',
		CPSell       : 'c. Upload Channel Partner (sell persona) CSV',
		CPBuyAndSell : 'd. Channel Partner (buy and sell persona) CSV',
	};

	const ProviderOrgsOptions = [
		{ key: 'a. Importer/ Exporter', type: 'IE' },
		{ key: 'b. Channel Partner (buy persona)', type: 'CPBuy' },
		{ key: 'c. Channel Partner (sell persona)', type: 'CPSell' },
		{ key: 'd. Channel Partner (buy and sell persona)', type: 'CPBuyAndSell' },
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

	const onClose = () => {
		setShow('');
	};

	let ProviderButtonOptions = [];
	let FINAL_MODAL_MAPPING = {};

	if (ingestionData?.option1 === 'org') {
		ProviderButtonOptions = ProviderOrgsOptions;
		FINAL_MODAL_MAPPING = FINAL_MODAL_MAPPING_ORGS;
	} else {
		ProviderButtonOptions = ProviderLeadOptions;
		FINAL_MODAL_MAPPING = FINAL_MODAL_MAPPING_LEADS;
	}

	const onChoose = (input) => {
		setIngestionData({
			...ingestionData,
			finalModalHeading: input,
		});
		setShow('uploadModal');
	};
	console.log('ingestionData::', ingestionData);

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
							onClick={() => onChoose(FINAL_MODAL_MAPPING[response?.type])}
							key={response?.key}
							style={{ width: '80%', height: '52px' }}
						>
							{response?.key}

						</Button>
					))}

				</div>

			</Modal.Body>
			<Modal.Footer>

				<Button themeType="secondary" onClick={() => setShow('orgDetails')}>Back</Button>
				{/* <Button style={{ marginRight: '8px' }} onClick={() => setShow('uploadModal')}>Next</Button> */}

			</Modal.Footer>
		</Modal>
	);
}

export default ProviderSelectModal;
