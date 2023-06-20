import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';
import ViewCtcBreakup from './ViewCtcBreakup';

const COLOR_MAPPING = {
	accepted : '#82d682',
	active   : '#F0EE8E',
	approved : '#FAD1A5',
};

const getColumns = ({ setViewCtcBreakupModal, viewCtcBreakupModal }) => {
	const onClickView = (item) => {
		if (item?.status === 'accepted') {
			window.open(item?.signed_document_url, '_blank');
		} else setViewCtcBreakupModal(item);
	};

	return [
		{
			Header   : 'DOCUMENT TYPE',
			accessor : () => <div className={styles.name}>Offer letter</div>,
		},
		{
			Header   : 'UPLOAD DATE',
			accessor : (item) => (
				<div>
					{formatDate({
						date       : item.created_at || new Date(),
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
						formatType : 'date',
					})}
				</div>
			),
		},
		{
			Header   : 'View',
			accessor : (item) => (
				<div>
					<div
						role="presentation"
						onClick={() => onClickView(item)}
						className={styles.view_text}
					>
						view
					</div>

					{ viewCtcBreakupModal && (
						<ViewCtcBreakup
							viewCtcBreakupModal={viewCtcBreakupModal}
							setViewCtcBreakupModal={setViewCtcBreakupModal}
						/>
					)}
				</div>
			),
		},
		{
			Header   : 'ACTION/STATUS',
			accessor : (item) => (
				<div>
					{item?.status === 'rejected'
						? (
							<div style={{ display: 'flex' }}>
								<div className={styles.status} style={{ backgroundColor: '#FFCBD0' }}>Rejected</div>
								{' '}
								-

								<Tooltip
									interactive
									theme="light"
									content={(
										<div className={styles.mobile_number}>
											{item?.rejection_reason || '-'}
										</div>
									)}
								>
									<span style={{ textDecoration: 'underLine', paddingLeft: 4 }}> Reason</span>
								</Tooltip>
							</div>
						)
						: (
							<div
								className={styles.status}
								style={{ backgroundColor: COLOR_MAPPING[item?.status] }}
							>
								{startCase(item?.status)}
							</div>
						)}
				</div>
			),
		},
	];
};

export default getColumns;
