import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import Stats from './Stats';
import StatsTabs from './StatsTabs';
import styles from './styles.module.css';

function Header({
	data,
	handleUpdateContract,
	statsData,
	loadingUpdate,
	state,
	setState,
	setServiceType,
}) {
	const router = useRouter();
	return (
		<div>
			<div
				role="presentation"
				className={styles.heading}
				onClick={() => {
					router.push('/contracts');
				}}
			>
				<IcMArrowBack
					style={{ width: '1.5em', height: '1.5em' }}

				/>
				<div className={styles.head}>Back to Contracts</div>
			</div>
			<div className={styles.contract}>Contract Details</div>
			<StatsTabs data={data} state={state} setState={setState} setServiceType={setServiceType} />
			<Stats
				data={data}
				handleUpdateContract={handleUpdateContract}
				statsData={statsData}
				loadingUpdate={loadingUpdate}
			/>
		</div>
	);
}

export default Header;
