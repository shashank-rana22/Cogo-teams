import { useRouter } from '@cogoport/next';

import PortPair from './PortPairs';
import ShippingLineDetails from './ShippingLineDetails';
import styles from './styles.module.css';
import TimeTable from './TimeTable';

function Cards({ item, loading }) {
	const { push } = useRouter();
	const onClickHandle = () => {
		push(
			'/schedules/service-lanes/[id]',
			`/schedules/service-lanes/${item?.id}`,
		);
	};

	return (
		<div role="presentation" className={styles.container} onClick={() => onClickHandle()}>
			<ShippingLineDetails item={item} loading={loading} />
			<div className={styles.details}>
				<PortPair item={item} loading={loading} />
				<TimeTable item={item} loadin={loading} />
			</div>
		</div>
	);
}

export default Cards;
