import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'gatsby' 

const Navbar = (props) => {
	/*
	Props should contains navbar items { name: string, link: string }
	 */
	const items = props.items || []
	return (
		<div className={styles.navbar}>
			<button className={styles.navbarMenu}>X</button>
			<ul className={styles.navbarItems}>
			{items.map((item, index) =>
			 <li className={styles.navbarItem} key={index}>
				 <Link to={item.link}>{item.name}</Link>
			 </li>
			 )}
			</ul>
			<div className={styles.overlay}>
			</div>
		</div>
	)
}

export default Navbar