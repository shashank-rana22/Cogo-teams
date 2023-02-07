import { cl, Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import useTeamStats from './useTeamStats';

function TeamStats({
	setParams = () => {},
	selectedBucket = '',
	setSelectedBucket = () => {},
}) {
	const { data = {}, loading } = useTeamStats();
	const {
		total_feedbacks_given = '',
		average = '',
		below_average = '',
		good_performing = '',
	} = data || {};

	const applyRatingGroupFilter = (name, filter) => {
		const unsetFilterValue = {
			rating_less_than    : undefined,
			rating_greater_than : undefined,
			rating              : undefined,
		};

		if (name !== selectedBucket) {
			setSelectedBucket(name);
			setParams((pv) => ({ ...pv, filters: { ...(pv.filters), ...filter } }));
			return;
		}

		setSelectedBucket(null);
		setParams((pv) => ({ ...pv, filters: { ...(pv.filters), ...unsetFilterValue } }));
	};

	const showLoading = () => (
		<div>
			{' '}
			<Placeholder style={{ marginBottom: '16px' }} width="100%" height="20px" />
			<Placeholder style={{ marginBottom: '16px' }} width="40%" />
			<Placeholder style={{ marginBottom: '24px' }} width="40%" />
		</div>
	);

	const teamStats = [
		{
			name        : 'all',
			filterValue : {
				rating_less_than    : undefined,
				rating_greater_than : undefined,
				rating              : undefined,
			},
			component: (
				<>
					<div className={styles.tile_heading}>
						<div className={styles.title}>All</div>
					</div>

					<div className={styles.main_title}>
						<div className={styles.blue}>
							{total_feedbacks_given || 0}
						</div>

						<div className={styles.stat_value_subtile}>Members</div>
					</div>
				</>),

		},
		{
			name        : 'average',
			filterValue : {
				rating_less_than    : undefined,
				rating_greater_than : undefined,
				rating              : 3,
			},
			component: (
				<>
					<div className={styles.tile_heading}>
						<div className={styles.title}>Average Performance</div>
					</div>

					<div className={styles.subheading}>Meets Expectation</div>

					<div className={styles.main_title}>
						<div className={styles.orange}>{average || 0}</div>

						<div className={styles.stat_value_subtile}>Members</div>
					</div>
				</>
			),

		},
		{
			name        : 'below_average',
			filterValue : {
				rating_less_than    : 3,
				rating_greater_than : undefined,
				rating              : undefined,
			},
			component: (

				<>
					<div className={styles.tile_heading}>
						<div className={styles.title}>Below Average Performance</div>
					</div>

					<div className={styles.subheading}>Needs Improvement</div>

					<div className={styles.main_title}>
						<div className={styles.red}>{below_average || 0}</div>

						<div className={styles.stat_value_subtile}>Members</div>
					</div>
				</>

			),
		},
		{
			name        : 'good_performing',
			filterValue : {
				rating_less_than    : undefined,
				rating_greater_than : 3,
				rating              : undefined,
			},
			component: (
				<>
					<div className={styles.tile_heading}>
						<div className={styles.title}>Good Performance</div>
					</div>

					<div className={styles.subheading}>Exceeds Expectation</div>

					<div className={styles.main_title}>
						<div className={styles.green}>{good_performing || 0}</div>

						<div className={styles.stat_value_subtile}>Members</div>
					</div>
				</>
			),

		},
	];

	return (
		<div className={styles.container}>
			{teamStats?.map((tile) => (
				<div
					key={tile.name}
					className={cl`${styles.tile_container} ${selectedBucket === tile.name
						? styles.bucket_container__selected
						: null}`}
					role="button"
					tabIndex={0}
					onClick={() => {
						applyRatingGroupFilter(tile.name, tile.filterValue);
					}}
				>
					{loading ? showLoading() : tile?.component}
				</div>
			))}
		</div>
	);
}

export default TeamStats;
