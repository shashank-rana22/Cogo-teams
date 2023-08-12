import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Empty from '../../Empty';

import Card from './Card';
import styles from './styles.module.css';

function CardList(props) {
	const {
		serviceProviderData = {},
		currentTab = '',
		shipment_data = {},
		similarServiceIds = {},
		otherLoading = false,
		ratesLoading = false,
	} = props;
	const { source = '', id = '' } = shipment_data || {};

	const ratesData = serviceProviderData[currentTab] || [];

	if (otherLoading || ratesLoading) {
		return (
			<div className={styles.loader_container}>
				<Loader className={styles.loader} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!isEmpty(ratesData) && !(otherLoading || ratesLoading) ? (
				<div>
					{ratesData.map((rate) => (
						<Card
							key={rate?.id}
							singleServiceProvider={rate}
							{...props}
						/>
					))}
				</div>
			) : (
				<Empty
					source={source}
					id={id}
					service_ids={similarServiceIds[currentTab]}
				/>
			)}
		</div>
	);
}

export default CardList;
