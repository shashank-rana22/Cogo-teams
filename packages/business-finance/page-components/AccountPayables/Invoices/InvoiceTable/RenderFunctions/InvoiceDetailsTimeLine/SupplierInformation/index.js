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
					{businessAddressProofUrl && (
						<div
							className={styles.documentcontainer}
							onClick={() => goTo(businessAddressProofUrl)}
							role="presentation"
						>
							<IcMDocument />
							ADDRESS PROOF
						</div>
					)}
					{panUrl && (
						<div className={styles.documentcontainer} onClick={() => goTo(panUrl)} role="presentation">
							<IcMCreditCard width="20px" height="20px" />
							PAN PROOF
						</div>
					)}
				</div>
			) : null}
		</div>
	);
}
export default SupplierInformation;
