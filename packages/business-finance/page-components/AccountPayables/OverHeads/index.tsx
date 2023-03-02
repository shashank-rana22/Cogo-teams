/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import Expenses from './Expenses/index';
import styles from './styles.module.css';
import Vendors from './Vendors/index';

function Overheads() {
	const [activeTab, setActiveTab] = useState('vendors');
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.flex}>
					<div
						onClick={() => {
							setActiveTab('vendors');
						}}
					>
						<div
							className={
                  activeTab === 'vendors' ? styles.sub_container_click : styles.sub_container
                }
						>
							VENDORS
						</div>
					</div>

					<div
						onClick={() => {
							setActiveTab('expenses');
						}}
					>
						<div
							className={
                    activeTab === 'expenses' ? styles.sub_container_click : styles.sub_container
                }
						>
							EXPENSES
						</div>
					</div>

					<div
						onClick={() => {
							setActiveTab('reports');
						}}
					>
						<div
							className={
                    activeTab === 'reports' ? styles.sub_container_click : styles.sub_container
                }
						>
							REPORTS
						</div>
					</div>

				</div>
			</div>

			<div className={styles.section}>
				{activeTab === 'vendors' && (
					<div>
						<Vendors />
					</div>
				)}

				{activeTab === 'expenses' && (
					<div>
						<Expenses />
					</div>
				)}
			</div>

		</div>
	);
}

export default Overheads;
