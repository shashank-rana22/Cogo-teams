import DetentionDemurrage from '../../../../../common/D&D';

import styles from './styles.module.css';

function Header({
	rateCardData = {},
	detail = {},
	refetch = () => {},
}) {
	const { source = 'cogo_assured_rate', shipping_line = {} } = rateCardData;

	return (
		<div className={styles.container}>
			<span className={styles.heading}>
				Selected:

				<span className={styles.shipping_line_name}>
					{source === 'cogo_assured_rate' ? 'Cogo Assured' : shipping_line?.short_name}
				</span>
			</span>

			<DetentionDemurrage details={detail} refetch={refetch} />
		</div>
	);
}

export default Header;
