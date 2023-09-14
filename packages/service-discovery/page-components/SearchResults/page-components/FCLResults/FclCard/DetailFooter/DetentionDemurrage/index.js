import { Popover } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import Detention from '../../../../../common/Detention';

import styles from './styles.module.css';

const DEFAULT_DAYS_VALUE = 0;
const ADDITIONAL_DAYS_KEYS = ['destination_demurrage', 'origin_detention', 'origin_demurrage', 'destination_detention'];

function DetentionDemurrage({
	rateCardData = {},
	refetch = () => {},
	detail = {},
}) {
	const [showDnD, setShowDnD] = useState(false);

	const { service_rates = {} } = rateCardData;

	const mainServices = Object.values(service_rates).filter((item) => {
		const { service_type = '' } = item;
		return ['fcl_freight', 'rail_domestic_freight'].includes(service_type);
	});

	const slabsData = (key) => {
		const slabs = mainServices.map((item) => item?.[key]?.slabs || []);
		return slabs.filter((item) => !isEmpty(item));
	};

	const minDays = (key) => {
		const min_days = mainServices.map((item) => item?.[key]?.free_limit || DEFAULT_DAYS_VALUE);
		return Math.min(...min_days);
	};

	const getMinDaysForAll = () => {
		let mindays = {};

		ADDITIONAL_DAYS_KEYS.forEach((item) => {
			mindays = {
				...mindays,
				[item]: minDays(item),
			};
		});

		return mindays;
	};

	const additionalDays = (key, countOnly) => {
		const additionalDaysPresent = mainServices.find(
			(service) => service?.[key]?.additional_days > DEFAULT_DAYS_VALUE,
		) || {};

		if (isEmpty(additionalDaysPresent)) {
			return minDays(key);
		}

		const { free_limit = 0, additional_days = 0 } = additionalDaysPresent?.[key] || {};

		if (countOnly) {
			return (free_limit || DEFAULT_DAYS_VALUE) + (additional_days || DEFAULT_DAYS_VALUE);
		}

		if (additional_days) {
			return `${free_limit || DEFAULT_DAYS_VALUE} Free + ${additional_days} Add'l `;
		}

		return `${free_limit || DEFAULT_DAYS_VALUE} Free`;
	};

	const minDaysForAllServices = getMinDaysForAll();

	const originDetentionSlabs = slabsData('origin_detention');
	const originDemurrageSlabs = slabsData('origin_demurrage');
	const destinationDetentionSlabs = slabsData('destination_detention');
	const destinationDemurrageSlabs = slabsData('destination_demurrage');

	const howMuchToShowInDnD = {
		origin_detention      : !isEmpty(originDetentionSlabs),
		origin_demurrage      : !isEmpty(originDemurrageSlabs),
		destination_detention : !isEmpty(destinationDetentionSlabs),
		destination_demurrage : !isEmpty(destinationDemurrageSlabs),
	};

	let defaultValues = {};

	ADDITIONAL_DAYS_KEYS.forEach((item) => {
		defaultValues = {
			...defaultValues,
			[item]: additionalDays(item, true),
		};
	});

	const notToShowDnD = Object.values(howMuchToShowInDnD).every((val) => {
		if (!val) {
			return true;
		}
		return false;
	});

	return (
		<div className={styles.container}>
			<div className={styles.tag}>Origin</div>

			<div className={styles.days_count}>
				<div>{`DET. ${additionalDays('origin_detention')} Days,`}</div>
				<div style={{ marginLeft: '4px' }}>{`Demurrage. ${additionalDays('origin_demurrage')} Days`}</div>
			</div>

			<div className={styles.tag} style={{ marginLeft: '24px' }}>Destination</div>

			<div className={styles.days_count}>
				<div>{`DET. ${additionalDays('destination_detention')} Days,`}</div>
				<div style={{ marginLeft: '4px' }}>{`Demurrage. ${additionalDays('destination_demurrage')} Days`}</div>
			</div>

			{notToShowDnD ? null : (
				<Popover
					placement="bottom"
					visible={showDnD}
					caret={false}
					onClickOutside={() => setShowDnD(false)}
					render={(
						<Detention
							heading="Update No. of Free Days"
							buttonTitle="Update"
							defaultValues={defaultValues}
							refetch={refetch}
							rateCardData={rateCardData}
							detail={detail}
							setShow={setShowDnD}
							minDays={minDaysForAllServices}
							source={rateCardData?.source}
							howMuchToShowInDnD={howMuchToShowInDnD}
							showDnd={!notToShowDnD}
						/>
					)}
				>
					<IcMPlusInCircle
						className={styles.plus_icon}
						onClick={() => setShowDnD(true)}
					/>
				</Popover>
			)}
		</div>
	);
}

export default DetentionDemurrage;
