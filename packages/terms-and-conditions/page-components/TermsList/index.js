import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../common/EmptyState/index';

import styles from './style.module.css';
import TermCard from './TermCard/index';

function TermList({
	data = {},
	loading = false,
	refetch = () => {},
	setEditTncModalId = null,
	setTncLevel = () => {},
	tncLevel = 'basicInfo',
	editTncModalId = () => {},
	EditForm = () => {},
}) {
	const [showHiddenContentId, setShowHiddenContentId] = useState(null);
	if (isEmpty(data?.list)) {
		return <EmptyState />;
	}
	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!loading ? data?.list?.map((listItem) => (
				<div key={listItem?.id}>
					<TermCard
						EditForm={EditForm}
						tncLevel={tncLevel}
						setTncLevel={setTncLevel}
						editTncModalId={editTncModalId}
						listItem={listItem}
						refetch={refetch}
						showMoreTnC={showHiddenContentId === listItem?.id}
						onClickShowMoreTnC={
							() => setShowHiddenContentId((pv) => (pv === listItem?.id ? null : listItem.id))
}
						onClickUpdateTerms={() => {
							setTncLevel('termsAndCondition'); setEditTncModalId(listItem?.id);
						}}
					/>
				</div>
			)) : null}
		</div>
	);
}
export default TermList;
