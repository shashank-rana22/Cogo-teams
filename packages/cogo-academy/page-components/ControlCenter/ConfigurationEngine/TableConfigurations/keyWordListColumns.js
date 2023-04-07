import { Popover } from '@cogoport/components';
import { IcMArrowNext, IcMDelete } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import PopOverContent from '../../../../commons/PopoverContent';

import styles from './styles.module.css';

function keyWordListColumns({
	setSortType = () => {},
	onClickDeleteIcon,
	showPopOver,
	setShowPopOver,
	updateApiLoading,
	sortType,
}) {
	const onClickNoButton = () => {
		setShowPopOver(null);
	};

	const listColumns = [
		{
			Header   : 'KEY WORD NAME',
			accessor : (items) => (
				<div className={styles.question}>
					{startCase(items?.name) || '--'}
				</div>
			),
		},
		{
			Header   : 'KEY WORD DESCRIPTION',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.description) || '--'}
				</div>
			),
		},
		{
			Header   : 'UPDATED BY',
			accessor : (items) => {
				const { author = {} } = items || {};
				return (
					<div className={styles.tags}>
						{startCase(author?.name) || '--'}
					</div>
				);
			},
		},
		{
			id     : 'last updated at',
			Header : (
				<div role="presentation" className={styles.sort_title} onClick={() => setSortType((prev) => !prev)}>
					LAST UPDATED AT

					<IcMArrowNext
						height={14}
						width={14}
						className={styles.sort_arrow}
						style={{ transform: sortType ? 'rotate(270deg)' : '' }}
					/>
				</div>
			),
			accessor: (items) => (
				<div
					className={styles.tags}
					role="presentation"
					onClick={() => setSortType((prev) => !prev)}
				>
					{format(items.created_at, 'dd MMM yy') || '--'}
				</div>
			),
		},
		{
			Header   : 'ACTIONS',
			accessor : (item) => (
				<div className={styles.button_container}>
					<Popover
						placement="top"
						interactive
						visible={showPopOver === item?.id}
						styles={{ marginRight: '20px' }}
						render={(
							<PopOverContent
								source="tag"
								onCLickYesButton={() => onClickDeleteIcon(item)}
								onClickNoButton={() => onClickNoButton(item)}
								loading={updateApiLoading}
							/>
						)}
					>

						<div className={styles.delete_button}>
							<IcMDelete
								height={20}
								width={20}
								onClick={() => {
									setShowPopOver(() => (showPopOver === item?.id ? null : item?.id));
								}}
							/>
						</div>
					</Popover>
				</div>
			),
		},
	];
	return { listColumns };
}

export default keyWordListColumns;
