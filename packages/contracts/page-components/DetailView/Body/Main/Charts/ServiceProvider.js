import { Button, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsOrganization } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import Line from '../../../../../common/Line';
import Percentage from '../../../../../common/MiniCard/Percentage';

import styles from './styles.module.css';

const controls = {
	name        : 'service_provider_id',
	label       : 'Service Provider',
	span        : 4,
	type        : 'select',
	placeholder : 'Select',
};

function ServiceProvier({
	activePair,
	handleUpdateContract,
	statsData,
	stats,
	data,
}) {
	const [serviceProvider, setServiceProvider] = useState('');
	const [showServiceProvider, setShowServiceProvider] = useState('');
	const serviceProviderOptions = useGetAsyncOptions(
		merge(asyncFieldsOrganization(), {
			params: {
				filters: { account_type: 'service_provider', kyc_status: 'verified' },
			},
		}),
	);
	const newControl = { ...controls, ...serviceProviderOptions };

	const handleServiceProvider = (val) => {
		setServiceProvider(val);
		setShowServiceProvider(false);
		handleUpdateContract({
			payload: {
				id                  : activePair?.id,
				service_type        : activePair?.service_type,
				status              : activePair?.status,
				service_provider_id : val,
			},
		});
	};
	return (
		<div className={styles.service_provider}>
			<div className={styles.details}>
				{showServiceProvider ? (
					<>
						<Select
							style={{ width: '300px' }}
							{...newControl}
							value={serviceProvider}
							onChange={(val) => {
								handleServiceProvider(val);
							}}
						/>
						<Button
							themeType="link"
							style={{ color: '#0B44F9' }}
							onClick={() => {
								setShowServiceProvider(false);
							}}
						>
							Close
						</Button>
					</>
				) : (
					<>
						{stats?.overseas_agent?.short_name ? (
							<>
								<div>Name :</div>
								<div className={styles.name}>
									{stats?.overseas_agent?.short_name}
								</div>
							</>
						) : null}
						{data?.status === 'pending_approval'
            && (activePair?.status === 'quoted' || activePair?.status === 'pending') ? (
	<Button
		themeType="link"
		style={{ color: '#0B44F9' }}
		onClick={() => {
			setShowServiceProvider(true);
		}}
	>
		Change
	</Button>
							) : null}
					</>
				)}
			</div>
			<div className={styles.mini_container}>
				<div className={styles.box}>
					<div className={styles.label}>Requested Port Pair:</div>
					<div className={styles.value}>
						{stats?.service_provider_selected_for}
						/
						{(statsData?.port_pairs_data || []).length}
					</div>
				</div>
				<Line />
				<div>
					<Percentage heading="Fulfilment in %" data={stats?.fulfilment} />
				</div>
			</div>
		</div>
	);
}

export default ServiceProvier;
