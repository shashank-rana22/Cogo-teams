import { IcMArrowBack } from '@cogoport/icons-react';

import PreviewDocumet from '../../../commons/PreviewDocumet';

import styles from './styles.module.css';
import useCompanyPolicyDetails from './useGetCompanyPolicyDetails';

function CompanyPolicies({ setInformationPage }) {
	const { list } = useCompanyPolicyDetails();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>COMPANY POLICIES</div>
			</div>

			<div className={styles.flex_wrapper}>
				{
				(list || []).map((element) => {
					const { document_url, id, name } = element || {};

					return (
						<div key={id} style={{ padding: '10px' }}>
							<div className={styles.header_wrapper}>
								{name}
							</div>

							<PreviewDocumet document_url={document_url} preview />

						</div>
					);
				})
			}
			</div>

		</div>
	);
}

export default CompanyPolicies;
