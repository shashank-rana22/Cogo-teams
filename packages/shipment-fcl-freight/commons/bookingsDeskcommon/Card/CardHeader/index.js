import { startCase } from '@cogoport/utils';
import {IcCCogoassured} from '@cogoport/icons-react';
import styles from './styles.module.css'

const CardHeader = ({ data = {} }) => {
	const tradeType = data?.trade_type;

	return (
		<div className={styles.container}>
			{data?.is_cogo_assured && (
				<div className={styles.cogoAssured}>
					<div className={styles.iconWrapper}>
						<IcCCogoassured />
					</div>

					<div className={styles.text}>Cogoport Assured</div>
				</div>
			)}

			{tradeType ? (
				tradeType == "export" ?
				<p className = {(`${styles.tradeType} ${styles.yellow}`)}>
					{startCase(tradeType)}
				</p>
				:	
				<p className = {(`${styles.tradeType} ${styles.blue}`)}>
				{startCase(tradeType)}
				</p>

			) : null}

			{(data.importer_exporter.tags || []).includes('partner') ? (
				<p className = {(`${styles.tradeType} ${styles.customer}`)}>Channel Partner</p>
			) : null}

			{data?.source ? (
				<p className = {styles.source}>
					{data.source === 'direct'
						? 'Sell Without Buy'
						: startCase(data.source)}
				</p>
			) : null}
		</div>
	);
};

export default CardHeader;