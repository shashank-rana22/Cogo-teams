import { Loader, cl } from '@cogoport/components';
import React from 'react';

import useGetServiceWiseDetails from '../../../../../hooks/useGetServiceWiseDetails';

import ServiceWiseCard from './ServiceWiseCard';
import styles from './styles.module.css';

function ServiceDetails({
	organizationId = '',
	entityCode = '',
}) {
	const {
		serviceWiseDetailsLoading = false,
		serviceWiseData = [],
	} = useGetServiceWiseDetails({ organizationId, entityCode });

	return (
		<div className={cl`${styles.main_container} ${!serviceWiseDetailsLoading ? styles.loader : null}`}>
			{serviceWiseDetailsLoading
				? serviceWiseData?.map((item) => <ServiceWiseCard key={item?.serviceType} item={item} />)
				: <Loader />}
		</div>
	);
}

export default ServiceDetails;
