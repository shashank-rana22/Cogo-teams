import {
	Pill,
	Placeholder,
	Tooltip,

} from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import {
	IcCFtick,
	IcMInfo,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import useGetVendorDetails from '../../../hook/useGetVendorDetails';

import styles from './styles.module.css';

interface DocumentData {
	list: Array<object>;
}

interface BillAdditionalObject {
	shipmentType: string;
}

interface ServiceProviderDetail {
	organizationName: string;
	organizationId: string;
	entityCode: number
}

interface DataProps {
	serviceProviderCategory?: string;
	serviceProviderDocuments: DocumentData;
	billAdditionalObject? : BillAdditionalObject;
	serviceProviderDetail? : ServiceProviderDetail;
}

interface SupplierDetailsProps {
	data: DataProps;

}
function VendorDetail({
	data,
}: SupplierDetailsProps) {
	const {
		serviceProviderCategory = '',
		serviceProviderDocuments,
		serviceProviderDetail,
	} = data || {};

	const { organizationId = '', entityCode = '' } = serviceProviderDetail || {};

	const {
		vendorDetailsData,
		apiLoading,
	} = useGetVendorDetails({ organizationId, entityCode });

	const { accountPayables = '', ledCurrency = '', accountReceivable = '' } = vendorDetailsData?.[0] || {};

	return (
		<div className={styles.container}>
			<h3>Supplier Details</h3>

			<div className={styles.small_hr} />

			<div className={styles.card}>
				<div className={styles.org_name_and_verified}>
					<div className={styles.flex}>
						Name -
						{!apiLoading ? (
							<Tooltip
								content={(
									<div style={{ fontSize: '10px' }}>
										{serviceProviderDetail?.organizationName || ''}
									</div>
								)}
							>
								<div className={styles.organization_name}>
									{serviceProviderDetail?.organizationName || ''}
								</div>
							</Tooltip>
						) : (
							<div>
								<Placeholder height="20px" width="148px" />
							</div>
						)}
					</div>
					<div className={styles.tags_container}>
						{serviceProviderCategory && (
							<Pill color="blue" size="sm">
								{serviceProviderCategory}
							</Pill>
						)}
						{!isEmpty(serviceProviderDocuments?.list) && (
							<div className={styles.kyc_verified}>
								<IcCFtick />
								<div>kyc verified</div>
							</div>
						)}
					</div>
				</div>

				<div className={styles.account_details}>
					<div className={styles.accounts}>
						<Tooltip
							content={(
								<div style={{ fontSize: '10px' }}>
									This amount is the overall outstanding Cogoport has against
									the vendor.
								</div>
							)}
						>
							<div className={styles.tooltip}>
								<IcMInfo width={15} height={15} />
							</div>
						</Tooltip>
            &nbsp; Amount Payables : &nbsp;
						{' '}
						<div className={styles.text_decoration}>
							{!apiLoading ? (
								<div className={styles.values}>
									{showOverflowingNumber(getFormattedPrice(
										accountPayables,
										ledCurrency,
									) || 0, 10)}
								</div>
							) : (
								<div>
									<Placeholder height="20px" width="100px" />
								</div>
							)}
						</div>
					</div>
					<div className={styles.accounts}>
						<Tooltip
							content={(
								<div style={{ fontSize: '10.3px' }}>
									This amount is the overall outstanding the vendor has against
									Cogoport. (Freight Forwarders etc.)
								</div>
							)}
						>
							<div className={styles.tooltip}>
								<IcMInfo width={15} height={15} />
							</div>
						</Tooltip>
            &nbsp; Amount Receivables : &nbsp;
						{' '}
						<div className={styles.text_decoration}>
							{!apiLoading ? (
								<div className={styles.values}>
									{showOverflowingNumber(getFormattedPrice(
										accountReceivable,
										ledCurrency,
									) || 0, 10)}
								</div>
							) : (
								<div>
									<Placeholder height="20px" width="100px" />
								</div>
							)}
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
export default VendorDetail;
