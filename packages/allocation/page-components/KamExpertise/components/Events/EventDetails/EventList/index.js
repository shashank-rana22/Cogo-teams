import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';

import EventListItem from './EventListItem';
import styles from './styles.module.css';

function EventList(props) {
	const { list, setEventListData, loading } = props;

	if (loading) {
		return (
			<>
				{[1, 2, 3].map((item) => (
					<section className={styles.list_item_container} key={item}>
						<div className={styles.top_div}>
							<Placeholder width="20px" style={{ marginBottom: '4px' }} />

							<Placeholder width="20px" style={{ marginBottom: '4px' }} />
						</div>

						<div>
							<p className={styles.info_tag}>
								<Placeholder width="200px" style={{ marginBottom: '4px' }} />
							</p>

							<div className={styles.info_tag}>
								<Placeholder width="200px" style={{ marginBottom: '12px' }} />
							</div>

							<p className={styles.info_tag}>
								<Placeholder width="200px" style={{ marginBottom: '4px' }} />
							</p>
						</div>

						<div className={styles.rule}>
							<p className={styles.rule_head}>
								<Placeholder width="200px" style={{ marginBottom: '12px' }} />
							</p>

							{[11, 12].map(() => (
								<div className={styles.rule_body}>
									{[21, 22, 23, 24, 25].map(() => (
										<Placeholder
											width="120px"
											style={{
												margin: '0 12px 4px 0',
											}}
										/>
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
			<div
				style={{
					padding    : '48px 0',
					background : '#fff',
					margin     : '0 0 60px 0',
				}}
			>
				<EmptyState height="400px" width="600px" flexDirection="column" />
			</div>
		);
	}

	return (
		<div>
			{list.map((data, index) => (
				<EventListItem
					key={data.id}
					data={data}
					index={index}
					setEventListData={setEventListData}
				/>
			))}
		</div>
	);
}
export default EventList;
