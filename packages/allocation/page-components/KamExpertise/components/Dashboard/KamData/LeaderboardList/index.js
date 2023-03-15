import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import ListItem from './ListItem';
import LeaderboardLoading from './loading';
import styles from './styles.module.css';

const dummy_data = {
	leaderboardList: [
		{
			id                  : '11066f7c-0b7d-4d38-917e-7b02c159c87d',
			partner_user_id     : '000c8a06-75c8-498d-af19-5e14443eea92',
			kam_expertise_level : '2',
			score               : 200,
			status              : 'active',
			created_at          : '2023-03-14T14:02:15.318Z',
			updated_at          : '2023-03-14T14:02:15.318Z',
			milestone_mappings  : [
				{
					id                         : '6e14c3fa-5f67-4350-a3e1-ea92b9d6820a',
					kam_expertise_milestone_id : '5a8dd624-baf8-4e7b-a7e8-098512f8420a',
					expertise_type             : 'badge',
					expertise_id               : '5049ac05-d55e-4928-8247-09697aa58575',
					status                     : 'active',
					created_at                 : '2023-03-14T14:04:12.683Z',
					updated_at                 : '2023-03-14T14:04:12.683Z',
					badge_details              : {
						id                     : '5049ac05-d55e-4928-8247-09697aa58575',
						badge_configuration_id : 'd07cfcd2-f559-43b2-b005-f7e064e3f333',
						medal                  : 'gold',
						image_url              : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/514b4b2fac2b40c8f40657f982c1ac29/ascendant.webp',
						score                  : 5000,
						status                 : 'active',
						created_at             : '2023-03-14T06:03:57.044Z',
						updated_at             : '2023-03-14T13:58:50.619Z',
					},
				},
				{
					id                         : '6e14c3fa-5f67-4350-a3e1-ea92b9d6820a',
					kam_expertise_milestone_id : '5a8dd624-baf8-4e7b-a7e8-098512f8420a',
					expertise_type             : 'badge',
					expertise_id               : '5049ac05-d55e-4928-8247-09697aa58575',
					status                     : 'active',
					created_at                 : '2023-03-14T14:04:12.683Z',
					updated_at                 : '2023-03-14T14:04:12.683Z',
					badge_details              : {
						id                     : '5049ac05-d55e-4928-8247-09697aa58575',
						badge_configuration_id : 'd07cfcd2-f559-43b2-b005-f7e064e3f333',
						medal                  : 'gold',
						image_url              : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/514b4b2fac2b40c8f40657f982c1ac29/ascendant.webp',
						score                  : 5000,
						status                 : 'active',
						created_at             : '2023-03-14T06:03:57.044Z',
						updated_at             : '2023-03-14T13:58:50.619Z',
					},
				},
				{
					id                         : '6e14c3fa-5f67-4350-a3e1-ea92b9d6820a',
					kam_expertise_milestone_id : '5a8dd624-baf8-4e7b-a7e8-098512f8420a',
					expertise_type             : 'badge',
					expertise_id               : '5049ac05-d55e-4928-8247-09697aa58575',
					status                     : 'active',
					created_at                 : '2023-03-14T14:04:12.683Z',
					updated_at                 : '2023-03-14T14:04:12.683Z',
					badge_details              : {
						id                     : '5049ac05-d55e-4928-8247-09697aa58575',
						badge_configuration_id : 'd07cfcd2-f559-43b2-b005-f7e064e3f333',
						medal                  : 'gold',
						image_url              : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/514b4b2fac2b40c8f40657f982c1ac29/ascendant.webp',
						score                  : 5000,
						status                 : 'active',
						created_at             : '2023-03-14T06:03:57.044Z',
						updated_at             : '2023-03-14T13:58:50.619Z',
					},
				},
			],
			expertise_score: [
				{ expertise_type: 'commodity_expertise', score: 20 },
				{ expertise_type: 'customer_expertise', score: 0 },
				{ expertise_type: 'trade_expertise', score: 10 },
				{ expertise_type: 'miscellaneous', score: 0 }],
		},
		{
			id                  : '11066f7c-0b7d-4d34-917e-7b02c159c87d',
			partner_user_id     : '000c8a06-75c8-498d-af19-5e14443eea92',
			kam_expertise_level : '2',
			score               : 200,
			status              : 'active',
			created_at          : '2023-03-14T14:02:15.318Z',
			updated_at          : '2023-03-14T14:02:15.318Z',
			expertise_score     : [
				{ expertise_type: 'commodity_expertise', score: 20 },
				{ expertise_type: 'customer_expertise', score: 0 },
				{ expertise_type: 'trade_expertise', score: 10 },
				{ expertise_type: 'miscellaneous', score: 0 }],
		},
		{
			id                  : '11066f7c-0b7d-4d38-917e-7b02c109c87d',
			partner_user_id     : '000c8a06-75c8-498d-af19-5e14443eea92',
			kam_expertise_level : '2',
			score               : 200,
			status              : 'active',
			created_at          : '2023-03-14T14:02:15.318Z',
			updated_at          : '2023-03-14T14:02:15.318Z',
			expertise_score     : [
				{ expertise_type: 'commodity_expertise', score: 20 },
				{ expertise_type: 'customer_expertise', score: 0 },
				{ expertise_type: 'trade_expertise', score: 10 },
				{ expertise_type: 'miscellaneous', score: 0 }],
		},
		{
			id                  : '11066f7c-0b7d-4d34-917e-7b02c159c89d',
			partner_user_id     : '000c8a06-75c8-498d-af19-5e14443eea92',
			kam_expertise_level : '2',
			score               : 200,
			status              : 'active',
			created_at          : '2023-03-14T14:02:15.318Z',
			updated_at          : '2023-03-14T14:02:15.318Z',
			expertise_score     : [
				{ expertise_type: 'commodity_expertise', score: 20 },
				{ expertise_type: 'customer_expertise', score: 0 },
				{ expertise_type: 'trade_expertise', score: 10 },
				{ expertise_type: 'miscellaneous', score: 0 }],
		},
		{
			id                  : '11066f7c-0b7d-4d38-927e-7b02c159c87d',
			partner_user_id     : '000c8a06-75c8-498d-af19-5e14443eea92',
			kam_expertise_level : '2',
			score               : 200,
			status              : 'active',
			created_at          : '2023-03-14T14:02:15.318Z',
			updated_at          : '2023-03-14T14:02:15.318Z',
			expertise_score     : [
				{ expertise_type: 'commodity_expertise', score: 20 },
				{ expertise_type: 'customer_expertise', score: 0 },
				{ expertise_type: 'trade_expertise', score: 10 },
				{ expertise_type: 'miscellaneous', score: 0 }],
		},
		{
			id                  : '11066f7c-0b7d-4d34-917e-7b12c159c87d',
			partner_user_id     : '000c8a06-75c8-498d-af19-5e14443eea92',
			kam_expertise_level : '2',
			score               : 200,
			status              : 'active',
			created_at          : '2023-03-14T14:02:15.318Z',
			updated_at          : '2023-03-14T14:02:15.318Z',
			expertise_score     : [
				{ expertise_type: 'commodity_expertise', score: 20 },
				{ expertise_type: 'customer_expertise', score: 0 },
				{ expertise_type: 'trade_expertise', score: 10 },
				{ expertise_type: 'miscellaneous', score: 0 }],
		},
	],
	page        : 1,
	total       : 1,
	total_count : 1,
	page_limit  : 10,
};

function LeaderboardList(props) {
	const {
		leaderboardLoading = false,
		// ! using dummy data, as the api is still being written
		// leaderboardList = [],
		// paginationData,
		getNextPage,
	} = props;

	const { leaderboardList = [], ...paginationData } = dummy_data || {};

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	if ((leaderboardLoading)) {
		return (
			<div>
				{
				leaderboardList?.map((data) => (
					<LeaderboardLoading id={data?.id} />
				))
			}
			</div>
		);
	}

	// ! add empty state here
	if (isEmpty(leaderboardLoading)) {
		return 'Empty state';
	}

	return (
		<div className={styles.container}>

			{leaderboardList?.map((data, index) => (
				<ListItem data={data} index={index} />
			))}

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</div>
	);
}

export default LeaderboardList;
