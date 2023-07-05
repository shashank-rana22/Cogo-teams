import { IcCFtick } from '@cogoport/icons-react';

import TRADE_PARTY_MAPPING from '../../../../../constants/TRADE_PARTY_MAPPING';

import styles from './styles.module.css';

function Detail({ data = [] }) {
	return (
		<div>
			{data?.map((item) => (
				<div className={styles.trade_party} key={item?.trade_party_type}>
					<IcCFtick />

					<span className={styles.trade_party_display}>
						{TRADE_PARTY_MAPPING[item?.trade_party_type]}
					</span>
				</div>
			))}
		</div>
	);
}
export default Detail;
