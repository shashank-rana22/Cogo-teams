import { Tags } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ activePair }) {
	console.log(activePair?.trade_type, 'values');
	const originCode = activePair?.origin_port?.port_code;
	const originName = activePair?.origin_port?.name.split('(')[0];
	const destinationCode = activePair?.destination_port?.port_code;
	const destinationName = activePair?.destination_port?.name.split('(')[0];
	const items = [{ children: activePair?.trade_type }];
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
			<Tags items={items} closable />
		</div>
	);
}

export default Header;
