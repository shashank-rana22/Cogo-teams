import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../../common/EmptyState';
import LoadingState from '../../../../../../../common/LoadingState';

import DetailsCard from './DetailsCard';
import styles from './styles.module.css';

function List(props) {
	const {
		list = [],
		activeTab = '',
		loadingResponses = false,
		setDetailsForm = () => {},
	} = props;

	if (loadingResponses) {
		return (
			<div className={styles.main}>
				<LoadingState height="80px" arrayLength={4} />
			</div>

		);
	}

	if (isEmpty(list)) {
		return (
			<div className={styles.main}>
				<EmptyState />
			</div>

		);
	}

	return (
		<div className={styles.main}>
			{list.map((response) => (
				<DetailsCard
					activeTab={activeTab}
					key={response}
					response={response}
					setDetailsForm={setDetailsForm}
				/>
			))}

		</div>
	);
}

export default List;
