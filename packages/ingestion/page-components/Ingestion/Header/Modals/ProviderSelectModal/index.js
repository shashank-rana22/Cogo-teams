import { Button } from '@cogoport/components';

import {
	ProviderCpOptions,
	ProviderLeadOptions,
	IS_CHANNEL_PARTNER_MAPPING,
} from '../../../../../constants/org-details-mapping';

import styles from './styles.module.css';

function ProviderSelectModal({ setShow = () => {}, setUploadData = () => {}, uploadData, formProps = {} }) {
	const { reset } = formProps;

	const PROVIDER_BUTTON_MAPPING = {
		lead    : ProviderLeadOptions,
		partner : ProviderCpOptions,
	};

	const ProviderButtonOptions = PROVIDER_BUTTON_MAPPING[uploadData?.ingestion_type] || '';

	const onChoose = (input) => {
		setUploadData({
			...uploadData,
			finalModalHeading  : input?.key,
			is_channel_partner : IS_CHANNEL_PARTNER_MAPPING[input?.type],
		});
		reset();
		setShow((pv) => ({
			...pv,
			screen: 'orgDetails',
		}));
	};

	return (

		<>
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

		</>

	);
}

export default ProviderSelectModal;
