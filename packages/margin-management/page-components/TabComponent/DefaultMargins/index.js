import { Loader } from '@cogoport/components';
import React from 'react';

import useGetDefaultMargins from '../../../hooks/useGetDefaultMargins';
import Details from '../Details';

import styles from './styles.module.css';

function DefaultMargins({
	activeService = '',
	filterParams = {},
	marginBreakupData = {},
	setMarginBreakupData = () => { },
	activeTab = '',
	refetch = () => { },
}) {
	const { data = {}, loading = false } = useGetDefaultMargins({
		activeService,
		filterParams,
	});

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Loader width="90px" height="90px" />
			</div>
		);
	}

	return (
		<div key={filterParams}>
			{(data?.list || []).map((item) => (
				<Details
					showContainerDetails
					marginBreakupData={marginBreakupData}
					setMarginBreakupData={setMarginBreakupData}
					key={item?.id}
					data={item}
					activeTab={activeTab}
					refetch={refetch}
				/>
			))}
		</div>
	);
}

export default DefaultMargins;
