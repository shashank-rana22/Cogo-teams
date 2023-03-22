import { Placeholder, Tooltip } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyState';

import styles from './styles.module.css';

function StarCollection() {
	return (
		<div className={styles.stars_container}>
			{[1, 2, 3].map((i) => (
				<div key={i}>
					<IcCStar width={10} stroke="#FFDF33" />
				</div>
			))}
		</div>
	);
}

function BadgeList(props) {
	const { listLoading = false, userBadges, showBadgeDetails } = props;

	const { badges_got: badgesGot = [], badges_not_got : badgesNotGot = [] } = userBadges || {};

	if (isEmpty(userBadges)) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="column"
					emptyText="Badges not found"
				/>
			</div>
		);
	}

	if (listLoading) {
		return (
			<div className={styles.badge_list_container}>
				<p className={styles.heading}>Badges List</p>
				<div className={styles.badges_container}>
					{
                        badgesGot?.map((item) => (
	<div key={item.id} className={styles.container}>
		<div className={styles.image_container}>
			<Placeholder height={64} width={64} />
		</div>
	</div>
                        ))
                    }
					{
                        badgesNotGot?.map((item) => (
	<div key={item.id} className={styles.container}>
		<div className={styles.image_container}>
			<Placeholder height={64} width={64} />
		</div>
	</div>
                        ))
                }
				</div>
			</div>
		);
	}

	return (
		<div className={styles.badge_list_container}>
			<p className={styles.heading}>Badges List</p>
			<div className={styles.badges_container}>
				{
                    badgesGot?.map((item) => (
	<Tooltip content={item.medal}>
		<div
			key={item.id}
			className={styles.container}
			role="presentation"
			style={{ cursor: 'pointer' }}
			onClick={() => showBadgeDetails(item)}
		>
			<div className={styles.image_container}>
				<img className={styles.badge} src={item.image_url} alt="" />
			</div>
			<StarCollection />
		</div>
	</Tooltip>
                    ))
                }
				{
                    badgesNotGot?.map((item) => (
	<Tooltip content={item.medal}>
		<div
			key={item.id}
			style={{ opacity: 0.2 }}
			className={styles.container}
			role="presentation"
			onClick={() => showBadgeDetails(item)}
		>
			<div className={styles.image_container}>
				<img className={styles.badge} src={item.image_url} alt="" />
			</div>
			<StarCollection />
		</div>
	</Tooltip>
                    ))
                }
			</div>
		</div>
	);
}

export default BadgeList;
