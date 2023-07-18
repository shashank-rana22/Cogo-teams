import { Popover } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import SegmentedControl from '../../../../../../commons/SegmentedControl/index.tsx';
import Loader from '../../../../Loader';

import LineItemsHeader from './LineItemsHeader';
import styles from './styles.module.css';
import ViewDetailsModal from './ViewDetailsModal';

const ENTITY_TAB = Object.keys(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => (
	{
		label : `Entity ${entity}`,
		value : entity,
	}
));

const LAST_INDEX = 1;

const MAX_BANK_NAME_LENGTH = 20;
const MAX_BANK_ACCOUNT_LENGTH = 25;
const MIN_LENGTH = 0;

function Details({
	item, data, loading, setActiveEntityCode, activeEntityCode, filters,
	monthName,
}) {
	const { list = [] } = data || {};
	const [showMore, setShowMore] = useState(false);

	const { reportCurrency = '', reportTime = '' } = filters || {};

	const {
		date = '',
		year = '',
	} = item || {};

	const listTotal = list?.length;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.details}>
			<div className={styles.line} />
			<div className={styles.segmented_style}>
				<SegmentedControl
					options={ENTITY_TAB}
					activeTab={activeEntityCode}
					setActiveTab={setActiveEntityCode}
					background="#FDEBE9"
					color="#ED3726"
				/>
			</div>
			<div className={styles.table}>
				<LineItemsHeader />
				{list.map((singleitem, index) => (
					<div
						className={`${styles.col} ${listTotal - LAST_INDEX === index ? styles.islast : ''}`}
						key={singleitem?.id}
					>
						<div className={styles.account_number}>
							<Popover
								theme="light"
								interactive
								trigger="mouseenter"
								content={(
									<div className={styles.container_tooltip}>
										<div className={styles.text}>
											<div className={styles.lable}>Bank Name :</div>
											<div className={styles.value}>{singleitem?.bankName}</div>
										</div>
										<div className={styles.text}>
											<div className={styles.lable}>Acc. No :</div>
											<div className={styles.value}>{singleitem?.accountNumber}</div>
										</div>
									</div>
								)}
								placement="top"
							>

								<div className={styles.value}>
									{`${singleitem?.bankName.substring(MIN_LENGTH, MAX_BANK_NAME_LENGTH)}...`}
								</div>
								<div className={styles.text}>
									{`${singleitem?.accountNumber.substring(MIN_LENGTH, MAX_BANK_ACCOUNT_LENGTH)}`}
								</div>
							</Popover>
						</div>
						<div className={styles.currency}>{singleitem?.currency || '-'}</div>
						<div className={styles.alloted_amount}>
							{
                                getFormattedPrice(singleitem?.allocatedAmount, singleitem?.currency) || '-'
                            }
						</div>
						<div className={styles.utilized_amount}>
							{ getFormattedPrice(
								singleitem?.utilizedAmount,
								singleitem?.currency,
							) || '-'}
						</div>
						<div className={styles.processing}>
							{ getFormattedPrice(
								singleitem?.processingAmount,
								singleitem?.currency,
							) || '-'}
						</div>
						<div className={styles.settled}>

							{ getFormattedPrice(
								singleitem?.settledAmount,
								singleitem?.currency,
							) || '-'}
						</div>
						<div className={styles.flush}>

							{getFormattedPrice(
								singleitem?.flush,
								singleitem?.currency,
							) || '-'}
						</div>
						<div className={styles.view_more}>
							<div
								className={styles.text_button}
								onClick={() => {
									setShowMore(true);
								}}
								role="presentation"
							>
								View More
							</div>
						</div>

						{showMore && (
							<ViewDetailsModal
								date={date}
								year={year}
								showMore={showMore}
								setShowMore={setShowMore}
								fundAllocationDetails={singleitem?.fundAllocationDetails}
								selectedCurrency={reportCurrency}
								monthName={monthName}
								bankData={singleitem}
								activeTime={reportTime}
								activeEntityCode={activeEntityCode}
								loading={loading}
							/>
						)}

					</div>
				))}
			</div>
		</div>
	);
}

export default Details;
