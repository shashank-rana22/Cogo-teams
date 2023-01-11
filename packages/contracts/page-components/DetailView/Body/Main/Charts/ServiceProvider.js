import { Button, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsOrganization } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import Line from '../../../../../common/Line';

import styles from './styles.module.css';

const controls = {
	name        : 'service_provider_id',
	label       : 'Service Provider',
	span        : 4,
	type        : 'select',
	placeholder : 'Select',

};

function ServiceProvier() {
	const [serviceProvider, setServiceProvider] = useState('');
	const [showServiceProvider, setShowServiceProvider] = useState('');
	const serviceProviderOptions = useGetAsyncOptions(
		merge(
			asyncFieldsOrganization(),
			{ params: { filters: { account_type: 'service_provider', kyc_status: 'verified' } } },
		),
	);
	const newControl = { ...controls, ...serviceProviderOptions };

	const handleServiceProvider = (val) => {
		setServiceProvider(val);
		setShowServiceProvider(false);
	};
	return (
		<div className={styles.service_provider}>
			<div className={styles.details}>
				{showServiceProvider ? (
					<Select
						style={{ width: '300px' }}
						{...newControl}
						value={serviceProvider}
						onChange={(val) => { handleServiceProvider(val); }}
					/>
				)
					: (
						<>
							<div>
								Name:
							</div>
							<div className={styles.name}>
								Avarak Prabhusinghan
							</div>
							<Button
								themeType="link"
								style={{ color: '#0B44F9' }}
								onClick={() => { setShowServiceProvider(true); }}
							>
								Change
							</Button>
						</>

					)}

			</div>
			<div className={styles.mini_container}>
				<div>
					<div className={styles.label}>
						Requested Port Pair:
					</div>
					<div className={styles.value}>
						1/3
					</div>
				</div>
				<Line />
				<div>
					<div className={styles.label}>
						Servicable Port Pair:
					</div>
					<div className={styles.value}>
						3/3
					</div>
				</div>
				<Line />
				<div>
					<div className={styles.label}>
						Fulfilment in %
					</div>
					<div className={styles.value}>
						83%
					</div>
				</div>
			</div>
		</div>
	);
}

export default ServiceProvier;
