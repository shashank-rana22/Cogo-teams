import { Button } from '@cogoport/components';

import {
	PROVIDER_LEAD_OPTIONS,
	IS_CHANNEL_PARTNER_MAPPING,
	ACCOUNT_TYPE_MAPPING,
} from '../../../../../constants/org-details-mapping';

import styles from './styles.module.css';

function ProviderSelectModal({ setShow = () => {}, setUploadData = () => {}, uploadData, formProps = {} }) {
	const { reset } = formProps;

	const onChoose = (input) => {
		setUploadData({
			...uploadData,
			final_modal_header : input?.label,
			is_channel_partner : IS_CHANNEL_PARTNER_MAPPING[input?.type],
			account_type       : ACCOUNT_TYPE_MAPPING[input?.type],
		});
		reset();
		setShow((pv) => ({
			...pv,
			activeMode: 'orgDetails',
		}));
	};

	return (

		<>
			<div className={styles.heading}>What do you wish to upload CSV for?</div>

			<div className={styles.provider_container}>
				{(PROVIDER_LEAD_OPTIONS || []).map((response) => (
					<Button
						themeType="secondary"
						onClick={() => {
							onChoose(response);
						}}
						key={response?.label}
						style={{ width: '80%', height: '44px' }}
					>
						{response?.label}

					</Button>
				))}

			</div>

		</>

	);
}

export default ProviderSelectModal;
