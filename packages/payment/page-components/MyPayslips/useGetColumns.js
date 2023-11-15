import { ButtonIcon } from '@cogoport/components';
import { IcMEyeopen, IcMDownload } from '@cogoport/icons-react';
import { getMonth } from '@cogoport/utils';

import { MONTHS } from '../../Constants/contants';

import styles from './styles.module.css';

const useGetColumns = (
	setShowModal = () => {},
	setModalUrl = () => {},
	setDocumentType = () => {},
	setOpenUrl = () => {},
) => {
	const handleDownload = (url) => {
		window.open(url, '_self');
	};

	const handleShow = (url) => {
		setOpenUrl(url);
		setModalUrl({});
		setShowModal(true);
	};

	return ([
		{
			Header   : 'MONTH',
			id       : 'month',
			accessor : (item) => (
				<div>
					<span>{MONTHS[getMonth(new Date(item?.payroll_month))].label}</span>
				</div>
			)

			,
		},
		{
			Header   : 'PAY SLIP',
			id       : 'pay_slip',
			accessor : (item) => (
				<div className={styles.table_items}>
					<ButtonIcon
						size="md"
						icon={<IcMEyeopen />}
						onClick={() => { handleShow(item?.payslip_link); setDocumentType('Pay slip'); }}
						themeType="primary"
					/>
					<ButtonIcon
						size="md"
						icon={<IcMDownload />}
						onClick={() => { handleDownload(item?.payslip_link); setDocumentType('Pay slip'); }}
						themeType="primary"
					/>
				</div>
			),
		},
		{
			Header   : 'TAX SLIP',
			id       : 'tax_slip',
			accessor : (item) => (
				<div className={styles.table_items}>
					<ButtonIcon
						size="md"
						icon={<IcMEyeopen />}
						onClick={() => { handleShow(item?.taxslip_link); setDocumentType('Tax slip'); }}
						themeType="primary"
					/>
					<ButtonIcon
						size="md"
						icon={<IcMDownload />}
						onClick={() => { handleDownload(item?.taxslip_link); setDocumentType('Tax slip'); }}
						themeType="primary"
					/>
				</div>
			),
		},
		{
			Header   : 'DETAILED SLIP',
			id       : 'detailed_slip',
			accessor : (item) => (
				<div className={styles.table_items}>
					<ButtonIcon
						size="md"
						icon={<IcMEyeopen />}
						onClick={() => { handleShow(item?.detailed_payslip_link); setDocumentType('Detailed slip'); }}
						themeType="primary"
					/>
					<ButtonIcon
						size="md"
						icon={<IcMDownload />}
						onClick={
							() => { handleDownload(item?.detailed_payslip_link); setDocumentType('Detailed slip'); }
}
						themeType="primary"
					/>
				</div>
			),
		},
	]);
};

export default useGetColumns;
