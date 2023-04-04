import { Modal, Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ProviderSelectModal({ setShow = () => {}, show = '', setUploadData = () => {}, uploadData, formProps }) {
	const { reset } = formProps;

	const ProviderCpOptions = [
		{ key: 'a. Channel Partner (buy persona)', type: 'CPBuy' },
		{ key: 'b. Channel Partner (sell persona)', type: 'CPSell' },
		{ key: 'c. Channel Partner (buy and sell persona)', type: 'CPBuyAndSell' },
	];

	const ProviderLeadOptions = [
		{ key: 'a. Importer/ Exporter', type: 'IE' },
		{ key: 'b. Service Provider', type: 'SP' },
	];

	const onClose = () => {
		setShow('');
		reset();
	};

	let ProviderButtonOptions = [];

	const PROVIDER_BUTTON_MAPPING = {
		lead    : ProviderLeadOptions,
		partner : ProviderCpOptions,
	};

	ProviderButtonOptions = PROVIDER_BUTTON_MAPPING[uploadData?.ingestion_type];

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
			<div>
				<div className={styles.heading}>What do you wish to upload CSV for?</div>

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
				<div className={styles.close_button}>

					<Button themeType="secondary" onClick={() => setShow('chooseModal')}>Back</Button>

				</div>

			</div>

		</Modal>
	);
}

export default ProviderSelectModal;
