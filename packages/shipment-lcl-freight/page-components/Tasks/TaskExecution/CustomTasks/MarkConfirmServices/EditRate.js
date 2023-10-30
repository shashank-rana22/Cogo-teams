import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetRateData from './helper/useGetRateData';
import Rate from './Rate';
import styles from './styles.module.css';

function EditRate({
	task = {},
	servicesList = [],
	onCancel = () => {},
	shipment_data = {},
	refetch = () => {},
	formattedRate = {},
}) {
	const editQuote = useGetRateData({
		servicesList,
		shipment_data,
		onCancel,
		task,
		taskListRefetch: refetch,
	});

	return (
		<div className={styles.container}>
			{isEmpty(editQuote?.service_charges_with_trade)
				? (
					<div className={styles.revert_rates}>
						Please wait for the rates to be reverted by RD
					</div>
				)
				: (
					<>
						<div className={styles.heading}>Quotation Update and Reallocation</div>
						{editQuote.serviceQuotationLoading ? (
							<div className={styles.loading_container}>
								Loading Task....
								<Loader themeType="primary" className={styles.loader_icon} />
							</div>
						) : (
							<Rate
								data={editQuote}
								servicesList={servicesList}
								task={task}
								formattedRate={formattedRate}
							/>
						)}
					</>
				)}
		</div>
	);
}

export default EditRate;
