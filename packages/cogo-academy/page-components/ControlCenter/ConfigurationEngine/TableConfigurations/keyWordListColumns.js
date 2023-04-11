import { Popover, Button } from '@cogoport/components';
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
	activeKeyword,
	sortType,
	onClickRestore = () => {},
}) {
	const onClickNoButton = () => {
		setShowPopOver(null);
	};

	const listColumns = [
		{
			Header   : 'KEYWORD',
			accessor : (items) => (
				<div className={styles.question}>
					{startCase(items?.display_name) || '--'}
				</div>
			),
		},
		{
			Header   : 'KEYWORD DESCRIPTION',
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
				>
					{format(items?.created_at, 'dd MMM yy') || '--'}
				</div>
			),
		},
		{
			Header   : 'ACTIONS',
			accessor : (item) => (
				<div>

					<div className={styles.button_container}>
						{activeKeyword === 'active' ? (
							<Popover
								placement="top"
								interactive
								visible={showPopOver === item?.id}
								styles={{ marginRight: '20px' }}
								render={(
									<PopOverContent
										source="keyword"
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
						) : (
							<Button
								themeType="secondary"
								onClick={() => onClickRestore({ id: item?.id })}
							>
								Restore
							</Button>
						)}
					</div>
				</div>
			),
		},
	];
	return { listColumns };
}

export default keyWordListColumns;
