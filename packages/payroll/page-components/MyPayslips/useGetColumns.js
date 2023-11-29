import { ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen, IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

const ZERO = GLOBAL_CONSTANTS.zeroth_index;
const ONE = GLOBAL_CONSTANTS.one;

const useGetColumns = (setShowModal = () => {}, setModalUrl = () => {}, setDocumentType = () => {}) => {
	const handleDownload = (url) => {
		window.open(url, '_self');
	};

	const handleShow = (url) => {
		setModalUrl(url);
		setShowModal(true);
	};

	return ([
		{
			Header   : 'MONTH',
			id       : 'month',
			accessor : (item) => {
				let date = formatDate({
					date       : item?.payroll_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				});

				const dates = date.split(' ');
				dates.splice(ZERO, ONE);
				date = dates.join(' ');

				return (
					<span>{date}</span>
				);
			},
		},
		{
			Header   : 'PAY SLIP',
			id       : 'pay_slip',
			accessor : (item) => (
				<div className={styles.table_items}>
					<ButtonIcon
						size="md"
						icon={<IcMEyeopen />}
						onClick={() => { handleShow(item?.payslip); setDocumentType('Pay slip'); }}
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
						onClick={() => { handleShow(item?.detailedpayslip_link); setDocumentType('Detailed slip'); }}
						themeType="primary"
					/>
					<ButtonIcon
						size="md"
						icon={<IcMDownload />}
						onClick={
							() => { handleDownload(item?.detailedpayslip_link); setDocumentType('Detailed slip'); }
}
						themeType="primary"
					/>
				</div>
			),
		},
	]);
};

export default useGetColumns;
