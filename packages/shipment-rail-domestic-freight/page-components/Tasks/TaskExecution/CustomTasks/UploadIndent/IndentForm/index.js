import { Loader, cl, Button } from '@cogoport/components';
import { useRef } from 'react';

import useGenerateIndentPdf from '../../../../../../hooks/useGenerateIndentPdf';
import useGetImageSource from '../../../../../../hooks/useGetImageSource';
import { indentRows } from '../helpers/indentFormRows';
import { indentStyles } from '../helpers/indentStyles';

import styles from './styles.module.css';

const IMAGE = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/1c989c0ffa90bbdfe2bddbfacc7cb9b3/concor-logo.png';

function IndentForm({
	showModal = false,
	setShowModal = () => {},
	services = [],
	setIndentURL = () => {},
}) {
	const finalRows = indentRows(services);

	const { imageSource } = useGetImageSource({ imageURL: IMAGE });

	const { loading, generatePdf = () => {} } = useGenerateIndentPdf();

	const ref = useRef(null);

	const callback = (response) => {
		setIndentURL(response?.data?.pdf_url);
		setShowModal(!showModal);
	};

	const generateIndent = () => {
		const html = `<html><head><style>${indentStyles}</style></head><body>${ref.current?.innerHTML}</body></html>`;

		generatePdf({ html, scale: 0.6, callback });
	};

	return (
		<div className={styles.indent_form}>
			{loading ? (
				<div>
					<Loader />
				</div>
			) : null}

			<div ref={ref}>
				<div className={styles.container}>
					<div className={styles.header}>
						<div className={styles.box}>
							<img className={styles.logo} src={imageSource} alt="concor-logo" />
						</div>

						<div className={styles.sub_header}>
							<h3 className={styles.heading}>
								Container Corporation of India Limited
							</h3>

							<h5 className={styles.sub_heading}>
								(A government of India Undertaking)
							</h5>

							<h5 className={styles.address}>
								Multi Modal Logistics Park, Atal Nagar, Naya Raipur, Chhattisgarh - 492101
							</h5>
						</div>

						<div className={cl`${styles.box} ${styles.date_box}`}>
							<div className={styles.single_input}>
								<div className={cl`${styles.input} ${styles.key}`}>Indent No. :</div>
								<div className={cl`${styles.input} ${styles.line}`} />
							</div>

							<div className={styles.single_input}>
								<div className={cl`${styles.input} ${styles.key}`}>Date :</div>
								<div className={cl`${styles.input} ${styles.line}`} />
							</div>
						</div>
					</div>

					<div className={styles.upper_container}>
						<h3 className={styles.upper_container_heading}>
							Indent Note For Domestic Container
						</h3>
					</div>

					<div className={styles.content_container}>
						{finalRows.map((item) => (
							<div className={styles.single_content} key={item?.key}>
								<div className={cl`${styles.input} ${styles.key} ${item.isSubType ? styles.end : ''}`}>
									{item.key}
								</div>
								<div className={styles.colon}>{!item.isMain ? ':' : ''}</div>
								<div className={cl`${styles.input} ${styles[item?.className]}`}>
									{item.value}
									{' '}

									{item?.className === 'empty-box' ? (
										<div className={styles.empty_box_entry}>{item.boxValue}</div>
									) : null}
								</div>
							</div>
						))}

						<div className={styles.footer}>
							<div className={styles.footer_left}>
								<span>Concor :</span>
								<span>Date :</span>
							</div>
							<div className={styles.footer_right}>
								<span>Agent&apos;s Signature</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.action_button}>
				<Button onClick={generateIndent}>Upload Indent</Button>
			</div>
		</div>
	);
}

export default IndentForm;
