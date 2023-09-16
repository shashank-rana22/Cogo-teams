import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../common/EmptyState/index';

import styles from './style.module.css';
import TermCard from './TermCard/index';

function TermList({
	list = [],
	loading = false,
	refetch = () => {},
	setEditTncModalId = null,
	setTncLevel = () => {},
	tncLevel = 'basicInfo',
	editTncModalId = () => {},
	EditForm = () => {},
	handleSubmitForm = () => {},
}) {
	const [showHiddenContentId, setShowHiddenContentId] = useState(null);

	if (isEmpty(list)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			{!loading ? list?.map((listItem) => (
				<div key={listItem.id}>
					<TermCard
						EditForm={EditForm}
						tncLevel={tncLevel}
						setTncLevel={setTncLevel}
						editTncModalId={editTncModalId}
						listItem={listItem}
						refetch={refetch}
						handleSubmitForm={handleSubmitForm}
						description={listItem?.description}
						showMoreTnC={showHiddenContentId === listItem?.id}
						onClickShowMoreTnC={
							() => setShowHiddenContentId((pv) => (pv === listItem.id ? null : listItem.id))
}
						onClickUpdateTerms={() => {
							setTncLevel('termsAndCondition'); setEditTncModalId(listItem.id);
						}}
					/>
				</div>
			)) : null}
		</div>
	);
}
export default TermList;
