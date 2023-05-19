import { IcMDownload, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import downloadFileFromUrl from '../../../../../utils/downloadFileFromUrl';

import styles from './styles.module.css';

function ExcelComponent({
	Element,
	name,
	label,
	controlItem,
	control,
	errors,
	cogo_academy_sheets = [],
	getCogoAcademyCourse = () => [],
}) {
	const { dropareaProps, draggable, multiple, placeholder, rules, accept } = controlItem || {};

	const { MAPPING, sheetData } = useMemo(() => {
		const cogoAcademySheet = cogo_academy_sheets?.[0] || {};

		return {
			sheetData : cogoAcademySheet,
			MAPPING   : {
				true: {
					button_text  : 'Refresh',
					icon         : IcMRefresh,
					funcionToUse : getCogoAcademyCourse,
					funcProps    : {},
				},
				false: {
					button_text  : 'Download User list',
					icon         : IcMDownload,
					funcionToUse : downloadFileFromUrl,
					funcProps    : { sheetData: cogoAcademySheet },
				},
			},
		};
	}, [getCogoAcademyCourse, cogo_academy_sheets]);

	const { button_text, icon:IconToUse, funcionToUse, funcProps } = MAPPING[isEmpty(sheetData)];

	return (
		<div key={name} className={`${styles.excel_container} ${styles[name]}`}>
			<div className={styles.excel_label_container}>
				<div className={styles.excel_label}>{label}</div>
				<div className={styles.refresh_div}>
					Refresh to see if list has been Generated
				</div>
			</div>

			<div className={styles.excel_buttons_container}>
				<div className={styles.left_section}>
					<div
						className={styles.sample_div}
						role="presentation"
						onClick={() => window.open(
							`https://cogoport-testing.sgp1.digitaloceanspaces.com/
							06331898043d2379280ea32e6770a0f3/audience-sample-set.xlsx`,
							'_blank',
						)}
					>
						<IcMDownload />
						<div className={styles.sample_text}>
							Download Default Excel Format
						</div>
					</div>
				</div>

				<div className={styles.right_section}>
					<div
						className={styles.sample_div}
						role="presentation"
						onClick={() => {
							funcionToUse({ ...funcProps });
						}}
					>
						<IconToUse />
						<div className={styles.sample_text}>{button_text}</div>
					</div>

				</div>
			</div>

			<div className={`${styles.input_group} ${styles[name]}`}>
				<Element
					key={name}
					control={control}
					id={`${name}_input`}
					name={name}
					dropareaProps={dropareaProps}
					draggable={draggable}
					multiple={multiple}
					placeholder={placeholder}
					accept={accept}
					rules={rules}
				/>
			</div>

			{errors?.[name]?.message ? (
				<div className={styles.error_message}>{errors?.[name]?.message}</div>
			) : null}
		</div>
	);
}

export default ExcelComponent;
