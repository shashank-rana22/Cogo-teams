import { Button, Loader } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import GlobalConfigForm from '../../common/GlobalConfigForm';
import useGetConvenienceRateConfig from '../../hooks/useGetConvenienceRateConfig';
import useUpdateConvenienceRateConfigs from '../../hooks/useUpdateConvenienceRateConfigs';

import CustomConfig from './CustomConfig';
import styles from './styles.module.css';

function ConvenienceRateDetail() {
	const router = useRouter();
	const { service = '', convenience_rate_id = '' } = router?.query || {};

	const defaultParams = { id: convenience_rate_id, status: 'active' };
	const { data, loading } = useGetConvenienceRateConfig({
		defaultParams,
		initialCall: convenience_rate_id,
	});
	const isEmptyAlternateSlabDetails = isEmpty(
		data?.slab_details?.filter((item) => !item?.is_default),
	);

	const [defaultConfigFeeUnit, setDefaultConfigFeeUnit] = useState('');

	const { onClickDeactivate = () => {}, onSave = () => {} } = useUpdateConvenienceRateConfigs(
		{
			data,
			isUpdatable           : 'true',
			showAlternateCFConfig : !isEmptyAlternateSlabDetails,
			activeService         : service,
			setDefaultConfigFeeUnit,
		},
	);

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
				activeService={service}
				onSubmit={onSave}
				isEmptyAlternateSlabDetails={isEmptyAlternateSlabDetails}
				onClickDeactivate={onClickDeactivate}
				isUpdatable="true"
				data={data}
				loading={loading}
				setDefaultConfigFeeUnit={setDefaultConfigFeeUnit}
			/>
			<CustomConfig
				defaultConfigFeeUnit={defaultConfigFeeUnit}
			/>
		</div>
	);
}

export default ConvenienceRateDetail;
