import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../../common/EmptyState';
import LoadingState from '../../../../../../../common/LoadingState';
import getResponseKeysMapping from '../../../../../configurations/response-keys-mapping';
import getFilteredData from '../../../../../utils/get-filtered-data';

import DetailsCard from './DetailsCard';
import styles from './styles.module.css';

function List({ list = [], activeTab = '', loadingResponses = false }) {
	const LABEL_KEYS = getResponseKeysMapping({ activeTab });

	const data = getFilteredData({ list, activeTab, LABEL_KEYS }) || [];

	if (loadingResponses) {
		return (
			<div className={styles.main}>
				<LoadingState height="80px" arrayLength={4} />
			</div>

		);
	}

	if (isEmpty(data)) {
		return (
			<div className={styles.main}>
				<EmptyState />
			</div>

		);
	}

	return (
		<div className={styles.main}>
			{data.map((response) => (
				<DetailsCard key={response} response={response} />
			))}

		</div>
	);
}

export default List;
