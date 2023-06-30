import { Checkbox } from '@cogoport/components';
import { IcMShare } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import LikeDislike from '../LikeDislike';

import styles from './styles.module.css';

const SHOW_TAG_IN_SERVICES = ['fcl_freight', 'fcl_freight_local'];

function RateCardTop({ rateCardData = {}, detail = {}, setComparisonCheckbox = () => {} }) {
	const { shipping_line = {}, card } = rateCardData;

	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		if (isChecked) {
			setComparisonCheckbox((pv) => ({
				...pv,
				[card]: shipping_line?.id,
			}));
		} else {
			setComparisonCheckbox((pv) => {
				const temp = { ...pv };
				delete temp[card];
				return temp;
			});
		}
	}, [card, isChecked, setComparisonCheckbox, shipping_line.id]);

	return (
		<div className={styles.container}>
			<div className={styles.container}>

				<Checkbox
					checked={isChecked}
					onChange={() => {
						setIsChecked(!isChecked);
					}}
				/>

				<img
					src={shipping_line?.logo_url}
					alt={rateCardData?.shipping_line?.short_name || rateCardData?.airline?.short_name}
					style={{ height: 24, objectFit: 'cover' }}
				/>

			</div>

			<div style={{ display: 'flex', marginRight: 20 }}>

				<LikeDislike rateCardData={rateCardData} detail={detail} />

				<IcMShare width="20px" height="16px" />
			</div>
		</div>
	);
}

export default RateCardTop;
