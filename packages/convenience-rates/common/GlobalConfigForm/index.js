import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getMandatoryControls from '../../configs/controls/getMandatoryControls';
import getOptionalControls from '../../configs/controls/getOptionalControls';
import Layout from '../Layout';

import styles from './styles.module.css';

function GlobalConfigForm(props) {
	const { activeService, data, service } = props;
	const [showAlternateCFConfig, setShowAlternateCFConfig] = useState(false);

	const isEmptyAlternateSlabDetails = isEmpty(
		data?.slab_details?.filter((item) => !item.is_default),
	);
	useEffect(() => {
		if (!isEmptyAlternateSlabDetails) {
			setShowAlternateCFConfig(true);
		}
	}, [isEmptyAlternateSlabDetails]);

	const handleCrossClick = () => {
		setShowAlternateCFConfig(false);
	};
	const DEFAULT_VALUES_ONE = {};
	const mandatoryControls = getMandatoryControls({ activeService });
	const optionalControls = getOptionalControls({ activeService, service });
	const alternateMandatoryControls = getMandatoryControls({});

	mandatoryControls.forEach((ctrl) => { DEFAULT_VALUES_ONE[ctrl.name] = ctrl?.value || ''; });

	const { control, formState:{ errors = {} } = {} } = useForm({
		defaultValues: DEFAULT_VALUES_ONE,
	});

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.heading}>Global Configuration</div>
				{/* CODE REMAINING HERE */}
			</div>
			<div
				className={styles.fees}
				style={{ fontStyle: 'italic' }}
			>
				Fees Configuration
			</div>
			<div className={styles.layoutContainer}>
				<Layout
					control={control}
					controls={mandatoryControls}
					errors={errors}
				/>
			</div>

			{
				showAlternateCFConfig ? (
					<>
						<div className={styles.altConfig}>
							<span className={styles.altConfigText}>
								Alternate Configuration
							</span>
							<span style={{ cursor: 'pointer' }}>
								<IcMCrossInCircle
									width={28}
									height={28}
									onClick={handleCrossClick}
								/>
							</span>
						</div>
						<div className={styles.layoutContainer}>
							<Layout
								control={control}
								controls={alternateMandatoryControls}
								errors={errors}
							/>
						</div>
					</>
				) : (
					<Button
						themeType="primary"
						style={{ fontSize: '14px', marginBottom: '20px', fontWeight: '700' }}
						onClick={() => {
							setShowAlternateCFConfig(true);
						}}
					>
						+ Add Alternate Config
					</Button>
				)
			}
			<div
				className={styles.fees}
				style={{ fontStyle: 'italic' }}
			>
				Fees Applicability (Input Fields in Priority!)
			</div>

			<div
				className={styles.layoutContainer2}
			>
				<Layout
					control={control}
					controls={optionalControls}
					errors={errors}
				/>
			</div>

			<div className={styles.btnContainer}>
				<Button
					className={styles.btn}
					themeType="primary"
					size="md"
					style={{ textTransform: 'capitalize' }}
				>
					SAVE
				</Button>
			</div>
		</div>
	);
}

export default GlobalConfigForm;
