import { Tooltip } from '@cogoport/components';
import { IcMArrowBack, IcMPortArrow } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import DotLoader from '../../../commons/DotLoader';

import styles from './styles.module.css';

function Header({ firstSearch = {}, loading = false }) {
	const {
		origin_location = {},
		destination_location = {},
		profitability,
		forecasted_volume,
		fulfillment,
	} = firstSearch || {};

	const { display_name: originName } = origin_location;
	const { display_name: destinationName } = destination_location;

	const router = useRouter();

	const onClickBack = () => {
		router.push('/supply-allocation');
	};

	if (loading) {
		return (
			<div className={styles.loading_container}>
				<DotLoader />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.back_icon}>
				<IcMArrowBack
					height={20}
					width={20}
					onClick={onClickBack}
				/>
			</div>
			<div className={styles.border} />

			<Tooltip
				content={
					<div className={styles.location_name_tooltip}>{originName}</div>
				}
				placement="bottom"
				theme="light"
				style={{ marginBottom: '24px' }}
			>
				<div className={styles.location_name}>{originName}</div>
			</Tooltip>

			<div className={styles.port_icon}>
				<IcMPortArrow className="port_arrow_icon" width={20} height={20} />
			</div>

			<Tooltip
				content={
					<div className={styles.location_name_tooltip}>{destinationName}</div>
				}
				placement="bottom"
				theme="light"
				style={{ marginBottom: '24px' }}
			>
				<div className={styles.destination_location_name}>{destinationName}</div>
			</Tooltip>

			<div className={styles.border} />

			<div className={styles.sub_container}>
				<div className={styles.sub_heading}>Avg Profitability</div>

				<div className={styles.bold}>
					{profitability}
					{' '}
					%
				</div>

			</div>

			<div className={styles.sub_container}>
				<div className={styles.sub_heading}>% Fulfillment </div>

				<div className={styles.bold}>
					{fulfillment}
					{' '}
					%
				</div>

			</div>

			<div className={styles.sub_container}>
				<div className={styles.sub_heading}>Forecasted Vol</div>

				<div className={styles.volume}>
					{forecasted_volume}
					{' '}
					TEU
				</div>

			</div>

		</div>

	);
}

export default Header;
