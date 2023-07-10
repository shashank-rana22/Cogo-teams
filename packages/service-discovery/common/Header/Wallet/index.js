import { Placeholder } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { countrieCodeHash } from '@cogoport/globalization/utils/getCountriesHash';
import React, { useState } from 'react';

import useCreateKamPromotion from './hooks/useCreateKamPromotions';
import useGetKamPromotionStats from './hooks/useGetKamPromotionStats';
import styles from './styles.module.css';
import SuccessModal from './SuccessModal';
import WalletModal from './WalletModal';

function Wallet({ data, service_key }) {
	const [showModal, setShowModal] = useState(false);
	const [showSuccesModal, setShowSuccessModal] = useState(false);

	const formProps = useForm();
	const { reset } = formProps;

	const service = data[service_key];
	const { importer_exporter_id = '' } = data;

	const {
		statsData,
		refetchStats,
		loading: getLoading,
	} = useGetKamPromotionStats();

	const {
		generatePromotion,
		loading: createLoading,
		promotionData,
	} = useCreateKamPromotion();

	const onClose = () => {
		setShowModal(false);
		reset();
	};

	const handleGenerateCode = async (values) => {
		await generatePromotion(values);
		onClose();
		setShowSuccessModal(true);
		refetchStats();
		reset();
	};

	return (
		<>
			<div
				role="presentation"
				className={styles.container}
				onClick={() => setShowModal(true)}
			>
				<span className={styles.heading}>Wallet Balance:</span>

				{getLoading ? (
					<Placeholder height="20px" width="80px" margin="4px 0 0 0" />
				) : (
					<span className={styles.amount_value}>
						{formatAmount({
							amount   : statsData?.alloted_amount_left,
							currency : statsData?.alloted_budget_currency,
							options  : {
								style                 : 'currency',
								notation              : 'compact',
								compactDisplay        : 'short',
								minimumFractionDigits : 2,
							},
						})}
					</span>
				)}
			</div>

			{showModal ? (
				<WalletModal
					show={showModal}
					onClose={onClose}
					organization_id={importer_exporter_id}
					service={service}
					data={statsData}
					formProps={formProps}
					handleGenerateCode={handleGenerateCode}
					createLoading={createLoading}
				/>
			) : null}

			{showSuccesModal ? (
				<SuccessModal
					show={showSuccesModal}
					setShow={setShowSuccessModal}
					promocode={promotionData?.promocode}
					validityEnd={promotionData?.validity_end}
					allotedAmountLeft={data.alloted_amount_left}
				/>
			) : null}
		</>
	);
}

export default Wallet;
