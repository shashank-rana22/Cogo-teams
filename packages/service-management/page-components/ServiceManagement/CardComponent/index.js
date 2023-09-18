import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Link } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import SliderComponent from './SliderComponent';
import styles from './styles.module.css';

const ZERO = 0; const ONE = 1;
function CardComponent({ data = {}, key = '' }) {
	return (
		<div className={styles.container} key={key}>

			<div className={styles.flex}>
				<Link href="/details/supply/[id]" as={`/details/supply/${data?.organization_id}`}>
					<Button themeType="link">{data?.organization?.business_name}</Button>
				</Link>
				<div>{startCase(data?.service)}</div>
				<Link href="/service-management/[id]" as={`/service-management/${data?.id}`}>
					<Button>TAKE ACTION</Button>
				</Link>
			</div>
			<SliderComponent />
			<div className={styles.flex}>
				<div className={styles.flex_column}>
					<div className={styles.name}>{startCase(data?.service_approvers?.[ZERO]?.role?.name)}</div>
					<div>
						{(formatDate({
							date       : data?.service_approvers?.[ZERO]?.updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						}))}

					</div>
				</div>
				<div className={styles.flex_column}>
					<div className={styles.name}>{startCase(data?.service_approvers?.[ONE]?.role?.name)}</div>
					<div>
						{(formatDate({
							date       : data?.service_approvers?.[ONE]?.updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						}))}

					</div>
				</div>
			</div>
		</div>
	);
}
export default CardComponent;
