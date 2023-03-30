import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetTaggingBills from '../../../hook/useGetMappings';

import styles from './styles.module.css';
import { TagCard } from './TagCard';

function TagMap({ shipmentId, serviceProviderId, billId }:
{ shipmentId: string, serviceProviderId: string, billId: string }) {
	const { mappingsData, loading } = useGetTaggingBills({
		shipmentId,
		serviceProviderId,
	});
	console.log(loading, billId, 'loading');

	return (
		<div className={`${styles.wrapper} ${styles.flex}`}>
			{!isEmpty(mappingsData)
				? (
					mappingsData || []
				).map((item) => (
					<div className={`${styles.flex} ${styles.bordernone}`}>
						<TagCard
							item={item}
							isfirst
						/>
					</div>
				))
				: null}
		</div>
	);
}

export default TagMap;
