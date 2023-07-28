import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../../../../common/EmptyState';
import ObjectiveDetailsCard from '../../../../../../../common/ObjectiveDetailsCard';
import useGetObjectiveDetails from '../../../../../../../hooks/useGetObjectiveDetails';

import styles from './styles.module.css';

function ObjectiveDetails(props) {
	const { activeObjectiveId } = props;

	const { data, loading } = useGetObjectiveDetails({ activeObjectiveId });

	if (loading) {
		return (
			<div className={styles.loading_state_container}>
				<Loader width={20} height={20} />
			</div>
		);
	}

	if (isEmpty(data)) return <EmptyState flexDirection="column" />;

	return <ObjectiveDetailsCard objectiveData={data} />;
}

export default ObjectiveDetails;
