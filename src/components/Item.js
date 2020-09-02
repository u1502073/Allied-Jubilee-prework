import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import theme from './Item.scss'


const Item = ({ data }) => {
  const isProcessing = data.status.code === 1 || data.status.code === 2;
  return (
    <div className={theme.self}>
      <img className={theme.image} src={data.logo} alt="logo" />
      <div className={theme.content}>
        <div className={theme.up}>
          <div className={classNames(theme.status, {[theme.green]: isProcessing })}>
            {data.status.type}
          </div>
          {isProcessing && (
            <div className={theme.date}>
                預計出貨:{data.date}
            </div>
          )}
        </div>
        <div className={theme.name}>
          {data.name}
        </div>
      </div>
      <div className={theme.arrowRight}/>
    </div>
  )
}

Item.propTypes = {
  data: PropTypes.object
}

export default Item
