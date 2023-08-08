import { Modal, Button, Table } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useState } from 'react';

import useCreatePaymentLink from '../../../../../../hooks/useCreatePaymentLink';
import useGetSaasSubscriptionProfile from '../../../../../../hooks/useGetSaasSubscriptionProfile';
import { getSubscriptionColumns } from '../../configurations/getSubscriptionColumns';

import Header from './Header';
import styles from './styles.module.css';

const NULL_AMOUNT = 0;

const getTotalAmount = ({ quotas, quota }) => quotas.reduce(
	(acc, curr) => acc + (quota?.[curr?.id] || NULL_AMOUNT) * (curr?.addon_limit || NULL_AMOUNT),
	NULL_AMOUNT,
);

function AddOnModal({
	showAddOn = false, setShowAddOn = () => {},
	organizationData = {}, saasSubscriptionCustomerId = '',
}) {
	const [editable, setEditable] = useState({ show: false, data: {} });
	const [quota, setQuota] = useState({});

	const { createLink = () => {}, createLinkloading = false } = useCreatePaymentLink({ organizationData });

	const { subscriptionData = {}, loading = false } = useGetSaasSubscriptionProfile({ saasSubscriptionCustomerId });
	const { quotas = [] } = subscriptionData || {};

	const columns = getSubscriptionColumns({ editable, setEditable, quota, setQuota });

	return (
		<Modal show={showAddOn} placement="top" size="lg" closeOnOuterClick={false} onClose={() => setShowAddOn(false)}>
			<Modal.Header title="Add-On" />

			<Modal.Body className={styles.modal_body_content}>
				<Header organizationData={organizationData} subscriptionData={subscriptionData} />
				<div className={styles.table_container}>
					<div className={styles.title}>Add-On multiple features at once as per your need</div>
					<Table
						columns={columns}
						data={quotas}
						layoutType="table"
						loading={loading}
					/>
					<div className={styles.table_footer}>
						Total add-on price :
						{' '}
						{formatAmount({
							amount  : getTotalAmount({ quota, quotas }),
							options : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								compactDisplay        : 'short',
								minimumFractionDigits : 0,
							},
						})}
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					size="md"
					className={styles.cancel_button}
					onClick={() => setShowAddOn(false)}
					disabled={createLinkloading}
				>
					Cancel
				</Button>
				<Button
					size="md"
					loading={createLinkloading}
					onClick={() => createLink({ values: {} })}
				>
					Generate Link
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddOnModal;
