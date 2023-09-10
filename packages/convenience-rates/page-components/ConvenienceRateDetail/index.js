import { Button, Loader } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import GlobalConfigForm from '../../common/GlobalConfigForm';
import useGetConvenienceRateConfig from '../../hooks/useGetConvenienceRateConfig';

import CustomConfig from './CustomConfig';
import styles from './styles.module.css';

function ConvenienceRateDetail() {
	const router = useRouter();
	const { service = '', convenience_rate_id = '' } = router?.query || {};

	const [activeList, setActiveList] = useState('active');
	const [defaultConfigFeeUnit, setDefaultConfigFeeUnit] = useState('');

	const defaultParams = { id: convenience_rate_id, status: activeList };
	const { data, loading } = useGetConvenienceRateConfig({
		defaultParams,
		initialCall: convenience_rate_id && activeList,
	});
	if (loading) {
		return (
			<div className={styles.spinner}>
				<Loader
					themeType="primary"
				/>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			<Button
				className={styles.back_div}
				themeType="link"
				onClick={() => {
					router.push(
						'/convenience-rates',
						'/convenience-rates',
					);
				}}
			>
				<div className={styles.arrow_back}>
					<IcMArrowBack />
				</div>
				<div className={styles.back_text}>
					Back to All Convenience Fees
				</div>
			</Button>
			<div className={styles.heading}>
				Fee Details
			</div>
			<GlobalConfigForm
				data={data}
				loading={loading}
				activeService={service}
				setDefaultConfigFeeUnit={setDefaultConfigFeeUnit}
			/>
			<CustomConfig
				data={data}
				loading={loading}
				activeList={activeList}
				setActiveList={setActiveList}
				service={service}
				defaultConfigFeeUnit={defaultConfigFeeUnit}
			/>
		</div>
	);
}

export default ConvenienceRateDetail;
