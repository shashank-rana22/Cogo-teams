import { Placeholder, Toggle } from '@cogoport/components';
import { useState, useMemo } from 'react';

import useGetOrganizationServices from '../../../../../hooks/useGetOrganizationServices';

import ServiceContent from './ServiceContent';
import styles from './styles.module.css';

function AgentWiseServices({ orgId = '' }) {
	const [toggleState, setToggleState] = useState(false);

	const { data = {}, loading = false } = useGetOrganizationServices({ orgId });

	const list = useMemo(
		() => Object?.entries(data || {})
			?.map(([key, val]) => ({
				...val,
				key,
			}))
			.filter((val) => (val?.key !== 'trailer_freight'
		&& !toggleState ? val?.status === 'inactive' : val?.status === 'active')),
		[data, toggleState],
	);

	return (
		<>
			<div className={styles.title}>
				Services
				<Toggle
					size="sm"
					disabled={false}
					checked={toggleState}
					onChange={() => setToggleState((p) => !p)}
					onLabel="Active"
					offLabel="Inactive"
				/>
			</div>
			{!toggleState
				? <div className={styles.warn_message}>Do not send any communication regarding inactive services</div>
				: null}

			{loading
				? <Placeholder width="100%" height="80px" margin="10px 0 0" />
				: <ServiceContent list={list} toggleState={toggleState} />}

		</>
	);
}

export default AgentWiseServices;
