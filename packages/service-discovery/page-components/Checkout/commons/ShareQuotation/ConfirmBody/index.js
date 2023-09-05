import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getBreakdown from '../../../utils/getBreakdown';

import styles from './styles.module.css';

const LOCALS_SERVICES = [
	'fcl_freight_local',
	'lcl_freight_local',
	'air_freight_local',
];

function ConfirmBody({ setShow = () => {}, handleUpdateSearch = () => {}, rate = {} }) {
	const actualRate = getBreakdown(rate);

	const checkRates = (actualRate || []).filter((item) => {
		if (
			isEmpty(item?.line_items)
			&& item?.service_type
			&& !LOCALS_SERVICES.includes(item?.service_type)
		) {
			return item;
		}
		return null;
	});

	return (
		<>
			<div>
				The margins on this quote will be locked before you can send this link.
				Proceed?
			</div>

			<div className={styles.btn_container}>
				<Button
					style={{ marginRight: 16 }}
					onClick={() => setShow(false)}
					themeType="tertiary"
				>
					Cancel
				</Button>
				<Button
					disabled={!isEmpty(checkRates)}
					themeType="accent"
					onClick={() => handleUpdateSearch()}
				>
					Yes, lock margin and copy link to quote
				</Button>
			</div>
		</>
	);
}

export default ConfirmBody;
