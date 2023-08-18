import { Button, Modal } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useEditLineItems from '../../../../../../../../../hooks/useEditLineItems';

import Info from './Info';
import Layout from './Layout';
import styles from './styles.module.css';

const MOBILE_SCREEN_WIDTH_SIZE = 360;
const SCREEN_WIDTH_SIZE = 1030;

function EditInvoice({
	show = 'false',
	onClose,
	invoice = {},
	refetch = () => {},
	shipment_data = {},
}) {
	const { role_ids, isMobile } = useSelector(({ profile, general }) => ({
		role_ids : profile?.partner?.user_role_ids,
		isMobile : general?.isMobile,
	}));

	const geo = getGeoConstants();

	const isFclFreight = [geo.uuid.admin_id, geo.uuid.super_admin_id].some((ele) => role_ids?.includes(ele))
	&& shipment_data?.shipment_type === 'fcl_freight';

	const {
		control,
		controls,
		loading,
		onCreate,
		handleSubmit,
		onError,
		errors,
		isDirty,
	} = useEditLineItems({
		invoice,
		onClose,
		refetch,
		isFclFreight,
		shipment_data,
		info: <Info />,
	});

	return (
		<div>
			<Modal
				onClose={onClose}
				show={show}
				size="xl"
				styles={{
					dialog: { width: isMobile ? MOBILE_SCREEN_WIDTH_SIZE : SCREEN_WIDTH_SIZE },
				}}
			>
				<Modal.Header title={(
					<div className={styles.invoice_value}>
						Invoice Value -
						<span>
							{formatAmount({
								amount   : invoice?.invoicing_party_total,
								currency : invoice?.invoice_total_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</span>
					</div>
				)}
				/>
				<Modal.Body>
					<div>
						<div className={styles.forms}>
							<Layout
								control={control}
								fields={controls}
								errors={errors}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button_container}>
						<Button className="secondary md" onClick={onClose} disabled={loading}>
							Cancel
						</Button>
						<Button
							className="primary md save"
							onClick={handleSubmit(onCreate, onError)}
							disabled={loading || !isDirty}
						>
							Save
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default EditInvoice;
