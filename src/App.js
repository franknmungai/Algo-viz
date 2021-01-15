import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';

import './App.css';

function App() {
	return (
		<div>
			<NavBar>
				<NavItem icon={<PlusIcon />} />
				<NavItem icon={<BellIcon />} />
				<NavItem icon={<MessengerIcon />} />

				<NavItem icon={<CaretIcon />}>
					<DropDown />
				</NavItem>
			</NavBar>
		</div>
	);
}

const NavBar = (props) => {
	return (
		<nav className="navbar">
			<ul className="navbar-nav">{props.children}</ul>
		</nav>
	);
};

const NavItem = (props) => {
	const [open, setOpen] = useState(false);

	return (
		<li className="nav-item">
			<a
				className="icon-button"
				href="#!"
				onClick={() => setOpen((open) => !open)}
			>
				{props.icon}
			</a>
			{open && props.children}
		</li>
	);
};

const DropDown = () => {
	const [active, setActive] = useState('main');
	const [menuHeight, setMenuHeight] = useState(null);

	const DropDownItem = (props) => (
		<div
			className="menu-item"
			onClick={() => props.goToMenu && setActive(props.goToMenu)}
		>
			<span className="icon-button">{props.leftIcon}</span>
			{props.children}
			<span className="icon-right">{props.rightIcon}</span>
		</div>
	);

	const calcHeight = (el) => {
		const height = el.offsetHeight;
		setMenuHeight(height); //el.offsetHeight gives the height of an element
	};
	return (
		<div className="dropdown" style={{ height: menuHeight }}>
			<CSSTransition
				in={active === 'main'}
				unmountOnExit
				timeout={500}
				classNames="menu-primary"
				onEntered={calcHeight}
			>
				<div className="menu">
					<DropDownItem goToMenu="settings" leftIcon={<BoltIcon />}>
						My Profile
					</DropDownItem>
					<DropDownItem
						leftIcon={<CogIcon />}
						rightIcon={<ChevronIcon />}
						goToMenu="settings"
					>
						Settings
					</DropDownItem>
				</div>
			</CSSTransition>
			<CSSTransition
				in={active === 'settings'}
				unmountOnExit
				timeout={500}
				classNames="menu-secondary"
				onEntered={calcHeight}
			>
				<div className="menu">
					<DropDownItem leftIcon={<ArrowIcon />} goToMenu="main" />
					<DropDownItem>Settings</DropDownItem>
					<DropDownItem>Settings</DropDownItem>
					<DropDownItem>Settings</DropDownItem>
					<DropDownItem>Settings</DropDownItem>
				</div>
			</CSSTransition>
		</div>
	);
};

export default App;
