import { Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import LoadingState from '../../../../../../../common/LoadingState';

import styles from './styles.module.css';

function AgentsList(props) {
	const { loading, list } = props;

	if (loading) {
		return (
			<div className={styles.card_container}>
				<LoadingState loadingRows={3} />
			</div>
		);
	}

	return (
		<div className={styles.agents_list}>
			{list.map((item) => {
				const { role = {}, user = {}, partner = {} } = item || {};

				return (
					<div key={user?.id} className={styles.list_item}>
						<p className={styles.agent}>
							{role?.name}
							:
							{' '}
							<b>{user?.name}</b>
						</p>

						{!isEmpty(partner) && (
							<Pill>
								Entity:
								{' '}
								{partner.business_name}
							</Pill>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default AgentsList;
