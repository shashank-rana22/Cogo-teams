import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';

import EventListItem from './EventListItem';
import styles from './styles.module.css';

function EventList(props) {
	const { list, setEventListData, setToggleEvent, loading } = props;

	if (loading) {
		return (
			<>
				{[1, 2, 3].map(() => (

					<section className={styles.list_item_container}>
						<div className={styles.top_div}>
							<Placeholder width="20px" style={{ marginBottom: '4px' }} />
						</div>

						<div>
							<p className={styles.info_tag}>
								<Placeholder width="160px" style={{ marginBottom: '4px' }} />
							</p>

							<div className={styles.info_tag}>
								<Placeholder width="120px" style={{ marginBottom: '12px' }} />
							</div>

							<p className={styles.info_tag}>
								<Placeholder width="360px" style={{ marginBottom: '4px' }} />
							</p>
						</div>

						<div className={styles.rule}>
							<p className={styles.rule_head}>
								<Placeholder width="100px" height="20px" style={{ marginBottom: '4px' }} />
							</p>
							{[1, 2].map(() => (
								<div className={styles.rule_body}>
									{[1, 2, 3, 4, 5].map(() => (
										<Placeholder width="120px" style={{ marginBottom: '4px' }} />
									))}
								</div>
							))}
						</div>

					</section>
				))}

			</>
		);
	}

	if (isEmpty(list)) {
		return (
			<div style={{ padding: '48px 0', backgroundColor: '#fff', marginBottom: '12px' }}>
				<EmptyState height="400px" width="600px" flexDirection="column" />
			</div>
		);
	}

	return (
		<div>
			{list.map((data, index) => (
				<EventListItem
					data={data}
					index={index}
					setEventListData={setEventListData}
					setToggleEvent={setToggleEvent}
				/>
			))}
		</div>
	);
}
export default EventList;
