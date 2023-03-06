import { Placeholder, Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import CreateResponse from './CreateResponse';
import ResponseCard from './ResponseCard';
import styles from './styles.module.css';

function List(props) {
	const {
		list,
		loading,
		activeTab,
		showAddPoc,
		setShowAddPoc,
		refetch,
	} = props;

	if (loading) {
		return (
			<Placeholder margin="16px" height="320px" width="100%" />
		);
	}

	if (isEmpty(list)) {
		return (
			<CreateResponse
				type="create"
				loading={loading}
				refetch={refetch}
				activeTab={activeTab}
			/>
		);
	}

	return (
		<section>
			{(list).map((user, index) => (
				<ResponseCard
					key={user.id}
					user={user}
					index={index}
					loading={loading}
					activeTab={activeTab}
				/>
			))}

			{showAddPoc && (
				<CreateResponse
					loading={loading}
					activeTab={activeTab}
					setShowAddPoc={setShowAddPoc}
					showAddPoc={showAddPoc}
					type="addPoc"
					refetch={refetch}
				/>

			)}

			{!showAddPoc && (
				<div className={styles.footer}>
					<Button
						themeType="secondary"
						size="md"
						type="button"
						onClick={() => setShowAddPoc(true)}
					>
						<IcMPlus className={styles.add_more_icon} />
						Add More
					</Button>
				</div>
			)}
		</section>
	);
}

export default List;
