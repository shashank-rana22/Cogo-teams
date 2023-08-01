import { Button, Popover } from '@cogoport/components';
import { IcMFtick, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import Detention from '../Detention';

import styles from './styles.module.css';

const SUBSIDIARY_SERVICES = {
	EDT: {
		code       : 'EDT',
		value      : 'origin_detention',
		trade_type : 'export',
	},
	DET: {
		code       : 'DET',
		value      : 'destination_detention',
		trade_type : 'import',
	},
	DEA: {
		code       : 'DEA',
		value      : 'destination_demurrage',
		trade_type : 'import',
	},
	EDE: {
		code       : 'EDE',
		value      : 'origin_demurrage',
		trade_type : 'export',
	},
};
const isAlreadyPresent = (service_details = {}) => {
	const services = Object.values(service_details);

	const appliedServices = services.filter(
		(serviceItem) => Object.keys(SUBSIDIARY_SERVICES).includes(serviceItem.code),
	);

	return appliedServices;
};

function DetentionDemurrage({
	details = {},
	refetch = () => {},
}) {
	const [show, setShow] = useState(false);

	const alreadyPresentServices = isAlreadyPresent(details?.service_details);

	const defaultValues = alreadyPresentServices.reduce(
		(accumulator, current) => (
			{ ...accumulator, [SUBSIDIARY_SERVICES[current.code].value]: current.total_rate_quantity }
		),
		{},
	);

	const alreadyAddedServicesCodes = alreadyPresentServices.map((item) => item.code);

	return (
		<Popover
			placement="bottom"
			visible={show}
			onClickOutside={() => setShow(false)}
			render={(
				<Detention
					heading="Update No. of Free Days"
					showReset
					buttonTitle="Update"
					alreadyAddedServicesCodes={alreadyAddedServicesCodes}
					refetch={refetch}
					detail={details}
					defaultValues={defaultValues}
					setShow={setShow}
				/>
			)}
		>
			<Button
				size="md"
				themeType="link"
				className={styles.button}
				onClick={() => setShow(!show)}
			>
				<IcMPlus height={22} width={22} className={styles.add_icon} fill="black" />
				Add Free Days
				{alreadyPresentServices && !isEmpty(alreadyPresentServices)
				&& <IcMFtick width={20} height={20} fill="#ee3425" />}
			</Button>
		</Popover>
	);
}

export default DetentionDemurrage;
