import { Placeholder } from '@cogoport/components';
import {
	IcCFtick,
	IcMDocument,
	IcMCreditCard,
	IcCFcrossInCircle,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const goTo = (href) => {
	if (typeof window !== 'undefined') {
		window.open(href);
	}
};

function SupplierInformation({ data, loading }) {
	const { name = '', serialId = '', kycStatus = '', businessAddressProofUrl = '', panUrl = '' } = data || {};

	const documentConfig = [
		{
			name : 'ADDRESS PROOF',
			url  : businessAddressProofUrl,
			icon : IcMDocument,
		},
		{
			name : 'PAN PROOF',
			url  : panUrl,
			icon : IcMCreditCard,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.namecontainer}>{loading ? <Placeholder /> : name}</div>
			<div className={styles.datawrapper}>
				<div>
					{loading ? (
						<Placeholder height="10px" width="30px" />
					) : (
						` Serial Id:- ${serialId}`
					)}
				</div>
				<div className={styles.verifieddata}>
					{kycStatus === 'verified' ? <IcCFtick /> : <IcCFcrossInCircle />}
					{loading ? <Placeholder height="10px" width="30px" /> : kycStatus}
				</div>
			</div>

			{kycStatus === 'verified' ? (
				<div className={styles.wrapper}>
					{documentConfig.map((config) => (
						config.url ? (
							<div
								className={styles.documentcontainer}
								key={config.name}
								onClick={() => goTo(config.url)}
								role="presentation"
							>
								<config.icon />
								{config.name}
							</div>
						) : null))}
				</div>
			) : null}
		</div>
	);
}
export default SupplierInformation;
