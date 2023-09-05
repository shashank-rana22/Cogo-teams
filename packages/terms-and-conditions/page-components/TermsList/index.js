import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../EmptyState/index';

import styles from './style.module.css';
// import FREIGHT_DETAILS_MAPPING from '../../utlis/freight-details-mapping';
import TermCard from './TermCard/index';

function TermList({
	list = [],
	loading = false,
	refetch = () => {},
	setEditTncModalId,
	setTncLevel,
}) {
	const LABEL_MAPPING = {
		fcl_freight : 'Shipping Line',
		air_freight : 'Airline',
	};
	const [showHiddenContentId, setShowHiddenContentId] = useState(null);
	if (isEmpty(list)) {
		return <EmptyState />;
	}
	return (
		<div className={styles.container}>
			{!loading
        && list.map((listItem) => (
	<div key={listItem.id}>
		<TermCard
			listItem={listItem}
			refetch={refetch}
			description={listItem.description}
			showMoreTnC={showHiddenContentId === listItem.id}
			onClickShowMoreTnC={() => setShowHiddenContentId((pv) => (pv === listItem.id ? null : listItem.id))}
			onClickUpdateTerms={() => {
				setTncLevel('termsAndCondition'); setEditTncModalId(listItem.id);
			}}
		/>
	</div>
        ))}
		</div>
	);
}
export default TermList;
