import { Placeholder } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';
import Toggler from './Toggler';

function ShippingLineDetails({ item, loading }) {
	const imageContent = item?.operator?.logo_url ? (
		<img
			src={item?.operator?.logo_url}
			alt="Company Logo"
			style={{ width: '52px' }}
		/>
	) : null;
	return (
		<div className={styles.container}>
			{ loading ? <Placeholder width="300px" height="30px" />
				: <div className={styles.shipping_line}>{item?.name || '--'}</div>}
			<div className={styles.company_logo_name}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{loading ? <Placeholder width="100px" /> : (
						imageContent
					)}
				</div>

				{loading ? <Placeholder width="100px" /> : <div>{item?.operator?.short_name}</div>}
			</div>

			<div className={styles.date_type}>
				<div>
					{loading ? <Placeholder width="100px" /> : (
						<Toggler
							item={item}
						/>
					)}
				</div>
				{loading ? <Placeholder height="30px" width="100px" /> : (
					<div className={styles.updated_on}>
						Updated On :
						{' '}
						{format(item?.updated_at, 'dd MMM yyyy', null, true)}
						{' '}
					</div>
				)}
			</div>
		</div>
	);
}

export default ShippingLineDetails;
