import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';
import { TagCard } from './TagCard';

const TABS = ['merge', 'split', 'notTaggedIds'];

function TagMap({
	selectedProforma,
	setSelectedProforma = () => {},
	activeTab,
	showCheck,
	mappingsData,
	loading,
}) {
	const allTaggingMaps = ['merge', 'split'].includes(activeTab) ? [activeTab] : TABS;

	if (activeTab === 'normal') {
		if (isEmpty(mappingsData)) {
			return (
				<div className={styles.empty}>
					No Invoices Found
				</div>
			);
		}
		return (
			<div className={styles.border}>
				{(TABS).map((type) => (
					<div
						className={`${styles.flex} 
					${styles.column} ${type === 'merge' ? styles.merge : ''}`}
						key={type}
					>
						{(mappingsData?.[type] || []).map((item) => (
							<div
								className={`${styles.commontags}
								${type === 'merge' ? styles.flexend : styles.flexstart}`}
								key={item?.billId}
							>
								<TagCard
									item={item}
									classname={type}
									setSelectedProforma={setSelectedProforma}
									selectedProforma={selectedProforma}
									isNormalTab
									activeTab={type}
									key={item?.billId}
									showCheck={showCheck}
									isfirst
								/>
							</div>
						))}
					</div>
				))}
			</div>
		);
	}

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
			{loading ? <Placeholder width="100%" height="200px" /> : (
				(allTaggingMaps).map((type) => (
					<div
						className={`${styles.flex} 
					${styles.column} ${type === 'merge' ? styles.merge : ''}`}
						key={type}
					>
						{(mappingsData?.[type] || []).map((item) => (
							<div
								className={`${styles.commontags}
								${type === 'merge' ? styles.flexend : styles.flexstart}`}
								key={item?.billId}
							>
								<TagCard
									item={item}
									classname={type}
									setSelectedProforma={setSelectedProforma}
									selectedProforma={selectedProforma}
									activeTab={activeTab}
									key={item?.billId}
									showCheck={showCheck}
									isfirst
								/>
							</div>
						))}
					</div>
				))
			)}
		</div>

	);
}

export default TagMap;
