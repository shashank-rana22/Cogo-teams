import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetTaggingBills from '../../hooks/useGetMappings';

import styles from './styles.module.css';
import { TagCard } from './TagCard';

function TagMap({
	serviceProviderId,
	shipmentId,
	isNormalTab,
}) {
	const [selectedProforma, setSelectedProforma] = useState([]);

	const { mappingsData, loading } = useGetTaggingBills({
		shipmentId, serviceProviderId,
	});

	const allTaggingMaps = ['merge', 'split', 'notTaggedIds'];

	if (isEmpty(mappingsData)) {
		return <div className={styles.empty}>No Invoices Found</div>;
	}

	return (
		<div className={styles.border}>
			{!loading ? (
				<>
					{allTaggingMaps.map((type) => (
						<div className={`${styles.flex} 
					${styles.column} ${type === 'merge' ? styles.merge : ''}`}
						>
							{ (
								mappingsData?.[type] || []
							).map((item) => (
								<div className={`${styles.flex} ${styles.bordernone}
									${styles.wrapper} ${type === 'merge' ? styles.flexend : styles.flexstart}`}
								>
									<TagCard
										item={item}
										classname={type}
										setSelectedProforma={setSelectedProforma}
										selectedProforma={selectedProforma}
										isNormalTab={isNormalTab}
										isfirst
									/>
								</div>
							))}
						</div>
					))}
				</>
			) : <Placeholder width="100%" height="200px" />}
		</div>

	);
}

export default TagMap;
