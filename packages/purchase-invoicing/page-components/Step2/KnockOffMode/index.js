import { Placeholder } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import getFormattedAmount from '../../../common/helpers/formatAmount';
import getPurchaseReplica from '../../../helpers/get-purchase-replica';
import mappingsFunc from '../../../helpers/mappingsFunc';
import useGetVarience from '../../../hooks/useGetVarience';
import toastApiError from '../../../utils/toastApiError';

import styles from './styles.module.css';

function KnockOffMode({
	purchaseInvoiceValues = [],
	data = {},
	globalSelected = {},
	collectionPartyId,
}) {
	const [loading, setLoading] = useState(false);
	const { varianceFullData, trigger } = useGetVarience();

	const purchase_replica = getPurchaseReplica(
		data,
		globalSelected,
		purchaseInvoiceValues,
	);

	let finalMapping = mappingsFunc(data, globalSelected, purchaseInvoiceValues);

	if (purchase_replica?.length) {
		finalMapping = finalMapping?.map((mapping) => ({
			...mapping,
			buy_line_items: purchase_replica,
		}));
	}

	const getVaraince = async () => {
		setLoading(true);

		try {
			const payload = {
				collection_party_id : collectionPartyId,
				mappings            : !isEmpty(finalMapping) ? finalMapping : undefined,
			};

			const res = await trigger({ data: payload });
			if (res.hasError) {
				toastApiError('Something went wrong! Please try again after sometime');
				setLoading(false);
			}
		} catch (err) {
			toastApiError(err);
			setLoading(false);
		}
		setLoading(false);
	};

	const getVarainceRef = useRef(getVaraince);

	const handleVarience = useCallback(
		() => { getVarainceRef?.current(); },
		[getVarainceRef],
	);

	useEffect(() => {
		handleVarience();
	}, [handleVarience]);

	const { data: varianceData, currency } = varianceFullData || {};

	if (loading) {
		return (
			<div>
				{[1, 2, 3].map((item) => (
					<div className={styles.margintop} key={item}>
						<Placeholder height="80px" />
					</div>
				))}
			</div>
		);
	}
	return (
		<div className={styles.listcontainer}>
			{(varianceData || []).map((item) => (
				<div className={styles.box} key={item}>
					<div className={styles.flexcontainer}>
						<div className={styles.flexwrap}>
							<div className={styles.flexdiv}>
								<div className={styles.label}>Purchase Invoice</div>
								<div className={styles.value}>
									{getFormattedAmount(item?.purchase_invoice, currency)}
								</div>
							</div>

							<div className={styles.lineitem}>
								{(item?.purchase_line_items || []).map((pi) => (
									<div className={styles.lineitemwrap} key={pi.code}>
										{pi?.name}
										<div className={styles.lineitemvalue}>
											{getFormattedAmount(pi?.tax_total_price, pi?.currency)}
										</div>
									</div>
								))}
							</div>
						</div>

						<div className={styles.flexwrap}>
							<div className={styles.flexdiv}>
								<div className={styles.label}>Live Invoice</div>
								<div className={styles.value}>
									{getFormattedAmount(item?.live_invoice, currency)}
								</div>
							</div>

							<div className={`${styles.top} ${styles.lineitem}`}>
								{(item?.buy_line_items || []).map((li) => (
									<div className={styles.lineitemwrap} key={li?.code}>
										{startCase(li?.service_type)}
										{' '}
										-
										{li?.code}
										<div className={styles.lineitemvalue}>
											{getFormattedAmount(li?.tax_total_price, li?.currency)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className={`${styles.variance} ${styles.flexdiv}`}>
						<div className={styles.label}>Variance</div>
						<div className={styles.value}>
							{getFormattedAmount(item?.variance, currency)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default KnockOffMode;