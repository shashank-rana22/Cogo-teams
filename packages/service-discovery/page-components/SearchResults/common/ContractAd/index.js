import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ContractAd({ loading = false, importerExporterId = '', contractDetail = {}, style = {}, isMobile = false }) {
	const { query = {} } = useSelector(({ general }) => ({ query: general.query }));

	const { partner_id = '' } = query;

	const { count = 0 } = contractDetail || {};

	const redirectToContract = () => {
		const newHref = `${window.location.origin}/${partner_id}/contract-rates/dashboard
		?activeTab=active&page=1&importerExporterId=${importerExporterId}`;
		window.open(newHref, '_blank');
	};

	if (!count || isEmpty(count) || loading) {
		return null;
	}

	return (
		<div className={styles.container} style={style}>
			<img
				src={GLOBAL_CONSTANTS.image_url.cogo_contract_banner}
				alt="cogo-contract-banner"
				className={styles.contract_tag}
			/>

			<div className={styles.content}>
				<div className={styles.label}>
					This organization already have
					{' '}
					{count}
					{' '}
					active contracts in this port pair.
				</div>

				<Button
					size="md"
					themeType={isMobile ? 'secondary' : 'accent'}
					onClick={redirectToContract}
					className={styles.button}
				>
					View Contracts
				</Button>
			</div>
		</div>
	);
}

export default ContractAd;
