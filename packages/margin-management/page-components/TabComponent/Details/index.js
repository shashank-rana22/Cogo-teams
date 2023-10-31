import { Button, Tooltip, Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

// import getOriginMarginType from '../../../helpers/getOriginMarginType';
import MarginValues from '../../MarginValues';
import DeactiveModal from '../../MarginValues/Buttons/DeactivateModal';
import StatusUpdateModal from '../../MarginValues/Buttons/StatusUpdateModal';
import UpdateDicountSetting from '../../MarginValues/Buttons/UpdateDicountSetting';

import ActionButtons from './ActionButtons';
import Info from './Info';
import styles from './styles.module.css';

function DisplayContent({ typeValues = [] }) {
	if (typeof typeValues === 'string') {
		return typeValues;
	}

	const newRateType = (typeValues || [])?.slice(1) || [];

	return (
		<>
			{(newRateType || []).map((it) => <li key={it}>{startCase(it)}</li>)}
		</>
	);
}

function Details({
	data = {}, marginBreakupData = {}, activeTab = '', refetch = () => { },
	setMarginBreakupData = () => { },
	// showContainerDetails = true,
	isMobile = false,
}) {
	const router = useRouter();
	const {
		margin_type = '', filters = {}, partner = {}, updated_at,
		// service = '', margin_slabs_currency = '',
	} = data || {};

	const {
		// commodity = '', container_type = '', container_size = '', destination_location = {},
		// origin_location = {}, location = {},
		trade_type = '',
		organization_type = '',
		organization_sub_type = '',
		rate_type = '',
	} = filters || {};

	const { business_name } = partner || {};

	const [showPopover, setShowPopover] = useState(false);

	const [openModal, setOpenModal] = useState(false);

	const [openUpdateModal, setOpenUpdateModal] = useState(false);

	const [showMarginDetails, setShowMarginDetails] = useState('');

	const [updateDiscountSetting, setUpdateDiscountSetting] = useState(false);

	// const { origin } = getOriginMarginType({ origin_location, location });

	const setData = () => {
		if (showMarginDetails === marginBreakupData?.id) {
			setShowMarginDetails('');
			setMarginBreakupData({});
		} else {
			setShowMarginDetails(data?.id);
			setMarginBreakupData(data);
		}
	};

	const handleEdit = () => {
		router.push('/margins/edit/[id]', `/margins/edit/${marginBreakupData?.id}`);
	};

	const handleDeactivateModal = () => {
		setOpenModal(true);
	};

	return (
		<div className={styles.container}>
			<div role="presentation">
				<Info data={data} />
				<div className={styles.styled_flex}>
					{!isMobile ? (
						<div className={styles.slab}>
							<div className={styles.small_title}>Partner Entity</div>
							<div className={styles.small_title_value}>
								{startCase(business_name) || '--'}
							</div>
						</div>
					) : null}
					{!isMobile ? (
						<div className={styles.slab}>
							<div className={styles.small_title}>Margin Type</div>
							<div className={styles.small_title_value}>
								{startCase(margin_type) || '--'}
							</div>
						</div>
					) : null}
					{!isMobile ? (
						<div className={styles.slab}>
							<div className={styles.small_title}>Rate Type</div>
							<div className={styles.small_title_value}>
								{startCase(rate_type?.[GLOBAL_CONSTANTS.zeroth_index]) || 'All Rate Types'}
								<Tooltip
									theme="light"
									placement="top"
									content={<DisplayContent typeValues={rate_type} />}
									style={{ padding: 16 }}
								>
									<div className={styles.description}>
										{rate_type?.length > 1 ? `+${rate_type.length - 1} More` : ''}
									</div>
								</Tooltip>
							</div>
						</div>
					) : null}
					{!isMobile ? (
						<div className={styles.slab}>
							<div className={styles.small_title}>Organization Type</div>
							<div className={styles.small_title_value}>
								{startCase(organization_type) || '--'}
							</div>
						</div>
					) : null}
					{!isMobile ? (
						<div className={styles.slab}>
							<div className={styles.small_title}>Organization Sub Type</div>
							<div className={styles.small_title_value}>
								{typeof organization_sub_type === 'string'
									? startCase(organization_sub_type) || '--'
									: startCase(organization_sub_type?.[GLOBAL_CONSTANTS.zeroth_index]) || '--'}
								{typeof organization_sub_type === 'string' ? (
									''
								) : (
									<Tooltip
										theme="light"
										placement="top"
										content={<DisplayContent typeValues={organization_sub_type} />}
										style={{ padding: 16 }}
									>
										<div className={styles.description}>
											{organization_sub_type?.length > 1
												? `+${organization_sub_type.length - 1} More` : ''}
										</div>
									</Tooltip>
								)}
							</div>
						</div>
					) : null}
					{!isMobile ? (
						<div className={styles.slab}>
							<div className={styles.small_title}>Trade Type</div>
							<div className={styles.small_title_value}>
								{startCase(trade_type) || '--'}
							</div>
						</div>
					) : null}
					{data?.agent?.name ? (
						<div className={styles.slab}>
							<div className={styles.small_title}>Agent</div>
							<div className={styles.small_title_value}>{data?.agent?.name}</div>
						</div>
					) : null}
					{!isMobile ? (
						<div className={styles.slab}>
							<div className={styles.small_title}>Updated at</div>
							<div className={styles.small_title_value}>
								{formatDate({
									date       : updated_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									separator  : ' ',
									timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:aaa'],
									formatType : 'dateTime',
								})}
							</div>
						</div>
					) : null}
					<div
						role="presentation"
						className={styles.slab}
						onClick={(e) => {
							e.stopPropagation();
							setShowPopover(true);
							setMarginBreakupData(data);
						}}
					>
						<Popover
							show={showPopover}
							visible={showPopover}
							onClickOutside={() => setShowPopover(false)}
							placement="left"
							theme="light"
							interactive
							content={(
								<ActionButtons
									handleEdit={handleEdit}
									setOpenModal={setOpenModal}
									activeTab={activeTab}
									setOpenUpdateModal={setOpenUpdateModal}
									handleDeactivateModal={handleDeactivateModal}
									setUpdateDiscountSetting={setUpdateDiscountSetting}
								/>
							)}
						>
							<div className={styles.small_title}>
								<IcMOverflowDot height={20} width={20} />
							</div>
						</Popover>
					</div>
				</div>
			</div>

			{showMarginDetails === marginBreakupData?.id ? (
				<MarginValues
					data={marginBreakupData}
					setMarginBreakupData={setMarginBreakupData}
					activeTab={activeTab}
					refetch={refetch}
				/>
			) : null}

			<div className={styles.btn_container}>
				<Button
					style={{ display: 'block' }}
					size="sm"
					themeType="secondary"
					onClick={() => {
						setShowPopover(false);
						setData();
					}}
				>
					{showMarginDetails === marginBreakupData?.id ? 'Hide Details' : 'View details'}
				</Button>
			</div>

			{openModal && (
				<DeactiveModal
					setOpenModal={setOpenModal}
					id={data?.id}
					refetch={refetch}
					setMarginBreakupData={setMarginBreakupData}
					openModal={openModal}
				/>
			)}

			{openUpdateModal && (
				<StatusUpdateModal
					show={openUpdateModal}
					setShow={setOpenUpdateModal}
					id={data?.id}
					refetch={refetch}
					setMarginBreakupData={setMarginBreakupData}
				/>
			)}

			{updateDiscountSetting ? (
				<UpdateDicountSetting
					id={data?.id}
					show={updateDiscountSetting}
					setShow={setUpdateDiscountSetting}
					marginBreakupData={marginBreakupData}
					refetch={refetch}
				/>
			) : null}
		</div>

	);
}
export default Details;
