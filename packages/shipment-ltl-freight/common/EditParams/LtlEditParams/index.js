import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useEffect } from 'react';

import useCreateParamDetails from '../../../hooks/useUpdateParamDetails';

import getControls from './controls';
import styles from './styles.module.css';

function LtlEditParams({ detail = {}, closeModal = () => {} }) {
	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const shipmentNumber = detail?.shipment_id || '';

	const { createParamDetails, loading } = useCreateParamDetails(
		shipmentNumber,
		closeModal,
	);

	useEffect(() => {
		const formattedArray = (detail?.packages || []).map((item) => ({
			packing_type   : item?.packing_type,
			packages_count : item?.packages_count,
			package_weight : item?.package_weight,
			dimensions     : {
				length : item?.length,
				width  : item?.width,
				height : item?.height,
			},
		}));
		setValue('packages', formattedArray);
	}, [detail?.packages, setValue]);

	const onSubmit = (values) => {
		createParamDetails({ values });
	};

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={getControls}
				errors={errors}
				theme="admin"
			/>
			<div className={styles.button_container}>
				<Button
					className="secondary md"
					style={{ marginRight: '10px' }}
					onClick={() => closeModal()}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					className="primary md"
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}

export default LtlEditParams;
