/* eslint-disable react-hooks/exhaustive-deps */
import { Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import getPurchaseReplica from '../../../helpers/get-purchase-replica';
import mappingsFunc from '../../../helpers/getPurchaseLineItems';
import toastApiError from '../../../utils/toastApiError';

import styles from './styles.module.css';

function KnockOffMode({
	purchaseInvoiceValues = [],
	data = {},
	globalSelected = {},
	collectionPartyId,
}) {
	const [loading, setLoading] = useState(false);
	const [{ data: varianceFullData }, trigger] = useRequest({
		url    : '/get_collection_party_variance',
		method : 'post',
	}, { manual: false });

	const purchase_replica = getPurchaseReplica(
		data,
		globalSelected,
		purchaseInvoiceValues,
	);

	let finalMapping = mappingsFunc(data, globalSelected, purchaseInvoiceValues);

	if (purchase_replica.length) {
		finalMapping = finalMapping.map((mapping) => ({
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
			// eslint-disable-next-line no-console
			console.log(err);
			setLoading(false);
		}
		setLoading(false);
	};

	useEffect(() => {
		getVaraince();
	}, []);

	const { data: varianceData, currency } = varianceFullData || {};

	if (loading) {
		return (
			<div>
				<Placeholder />
				<Placeholder />
				<Placeholder />
			</div>
		);
	}
	return (
		<div className={styles.listcontainer}>
			{(varianceData || []).map((item) => (
				<div className={styles.box}>
					<div className={styles.flexcontainer}>
						<div className={styles.invoiceswrap}>
							<div className={styles.flexwrap}>
								<div className={styles.flexdiv}>
									<div className={styles.label}>Purchase Invoice</div>
									<div className={styles.value}>
										{formatAmount({
											amount  : item?.purchase_invoice,
											currency,
											options : {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 2,
											},
										})}
									</div>
								</div>

								<div className={styles.lineitem}>
									{(item?.purchase_line_items || []).map((pi) => (
										<div className={styles.lineitemwrap}>
											{pi?.name}
											<div className={styles.lineitemvalue}>
												{formatAmount({
													amount   : pi?.tax_total_price,
													currency : pi?.currency,
													options  : {
														style                 : 'currency',
														currencyDisplay       : 'code',
														maximumFractionDigits : 2,
													},
												})}
											</div>
										</div>
									))}
								</div>
							</div>

							<div className={styles.flexwrap}>
								<div className={styles.flexdiv}>
									<div className={styles.label}>Live Invoice</div>
									<div className={styles.value}>
										{formatAmount({
											amount  : item?.live_invoice,
											currency,
											options : {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 2,
											},
										})}
									</div>
								</div>

								<div className={`${styles.top} ${styles.lineitem}`}>
									{(item?.buy_line_items || []).map((li) => (
										<div className={styles.lineitemwrap}>
											{startCase(li?.service_type)}
											{' '}
											-
											{li?.code}
											<div className={styles.lineitemvalue}>
												{formatAmount({
													amount   : li?.tax_total_price || 0,
													currency : li?.currency,
													options  : {
														style                 : 'currency',
														currencyDisplay       : 'code',
														maximumFractionDigits : 2,
													},
												})}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className={`${styles.variance} ${styles.flexdiv}`}>
						<div className={styles.label}>Variance</div>
						<div className={styles.value}>
							{formatAmount({
								amount  : item?.variance,
								currency,
								options : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default KnockOffMode;
