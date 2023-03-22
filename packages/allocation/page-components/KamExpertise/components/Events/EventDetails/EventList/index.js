import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';

import EventListItem from './EventListItem';
import styles from './styles.module.css';

function EventList(props) {
	const { list, setEventListData, setToggleEvent, loading } = props;

	if (true) {
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
							{[11, 12].map(() => (
								<div className={styles.rule_body}>
									{[21, 22, 23, 24, 25].map(() => (
										<Placeholder
											width="120px"
											style={{
												marginBottom : '4px',
												marginRight  : '12px',
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
}
export default EventList;
