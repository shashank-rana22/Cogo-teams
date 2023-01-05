import { Pills } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ activePair }) {
	const originCode = activePair?.origin_code;
	const originName = activePair?.origin.split('(')[0];
	const destinationCode = activePair?.destination_code;
	const destinationName = activePair?.destination.split('(')[0];

	return (
		<div className={styles.heading}>
			<div className={styles.port_pair}>

				<div>
					{`${originName}(${originCode})`}
				</div>
				<IcMPortArrow />
				<div>
					{`${destinationName}(${destinationCode})`}
				</div>
			</div>
			<div className={styles.line} />
			{activePair?.total_price ? (
				<div>
					Request Price:
					{' '}
					{`${activePair?.currency} ${activePair?.total_price}`}
					/ctr.
				</div>
			) : null}

			<Pills
				size="md"
				color="#CFEAED"
			>
				{activePair?.trade_type}
			</Pills>
		</div>
	);
}

export default Header;
