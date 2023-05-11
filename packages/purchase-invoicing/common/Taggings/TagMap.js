import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetTaggingBills from '../../hooks/useGetMappings';

import styles from './styles.module.css';
import { TagCard } from './TagCard';

function TagMap({
	serviceProviderId = '',
	shipmentId = '',
	isNormalTab,
	selectedProforma,
	setSelectedProforma,
	activeTab,
}) {
	const { mappingsData, loading } = useGetTaggingBills({
		shipmentId, serviceProviderId,
	});

	const allTaggingMaps = ['merge', 'split'].includes(activeTab) ? [activeTab] : ['merge', 'split', 'notTaggedIds'];

	if ((!isEmpty(activeTab) && isEmpty(mappingsData?.[activeTab]))
		|| (isEmpty(activeTab) && isEmpty(mappingsData) && !loading)) {
		return (
			<div className={styles.empty}>
				No Invoices Found
				{' '}
				{['merge', 'split'].includes(activeTab)
					? <span className={styles.activetab}>{`In ${activeTab}`}</span> : null}
			</div>
		);
	}

	return (
		<div className={styles.border}>
			{!loading ? (
				<>
					{(allTaggingMaps).map((type) => (
						<div
							className={`${styles.flex} 
					${styles.column} ${type === 'merge' ? styles.merge : ''}`}
							key={type}
						>
							{ (
								mappingsData?.[type] || []
							).map((item) => (
								<div
									className={`${styles.flex} ${styles.bordernone}
									${styles.wrapper} ${type === 'merge' ? styles.flexend : styles.flexstart}`}
									key={item?.billId}
								>
									<TagCard
										item={item}
										classname={type}
										setSelectedProforma={setSelectedProforma}
										selectedProforma={selectedProforma}
										isNormalTab={isNormalTab}
										activeTab={activeTab}
										key={item?.billId}
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
