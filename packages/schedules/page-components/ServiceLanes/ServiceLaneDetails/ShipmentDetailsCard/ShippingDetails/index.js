import styles from './styles.module.css';
import Toggler from './Toggler';

const ZERO = 0;
function ShippingDetails({ data }) {
	const imageContent = data?.[ZERO]?.operator?.logo_url ? (
		<img
			src={data?.[ZERO]?.operator?.logo_url}
			alt="Company Logo"
			style={{ width: '52px' }}
		/>
	) : null;
	return (
		<div className={styles.container}>
			<div className={styles.shipping_line}>
				{data?.[ZERO]?.name || '--'}
			</div>
			<div className={styles.company_logo_name}>
				<div style={{ display: 'flex', alignMapTabs: 'center' }}>
					{imageContent}
				</div>

				<div>{data?.[ZERO]?.operator?.short_name}</div>
			</div>

			<div className={styles.date_type}>
				<div>
					<Toggler data={data} />
				</div>
			</div>
		</div>
	);
}

export default ShippingDetails;
