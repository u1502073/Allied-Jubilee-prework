import React from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import svgHome from '../../../images/home.svg';
import svgFire from '../../../images/fire.svg';

import theme from './SideBar.scss';

const BarItem = ({ name, image}) => {
  let history = useHistory();
  const handleClick = () => {
    history.push(`/${name.toLowerCase()}`)
  }
  return (
    <div className={theme.barItem} role="button" tabIndex={0} onClick={handleClick}>
      <img src={image} alt="" />
      <span>{name}</span>
    </div>
  )
}

BarItem.propTypes = {
  name: Proptypes.string,
  image: Proptypes.any
}

const SideBar = () => {
  return (
    <div className={theme.sideBar}>
      <BarItem name={'Main'} image={svgHome}/>
      <BarItem name={'Favorite'} image={svgFire}/>
    </div>
  )
}

export default SideBar
