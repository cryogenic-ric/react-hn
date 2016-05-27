var React = require('react')
var Link = require('react-router/lib/Link')
var TimeAgo = require('react-timeago').default

var pluralise = require('../utils/pluralise')
var urlParse = require('url-parse')

var parseHost = function(url) {
  var hostname = (urlParse(url, true)).hostname
  var parts = hostname.split('.').slice(-3)
  if (parts[0] === 'www') {
    parts.shift()
  }
  return parts.join('.')
}

/**
 * Reusable logic for displaying an item.
 */
var ItemMixin = {
  /**
   * Render an item's metadata bar.
   */
  renderItemMeta(item, extraContent) {
    var itemDate = new Date(item.time * 1000)

    if (item.type === 'job') {
      return <div className="Item__meta">
        <TimeAgo date={itemDate} className="Item__time"/>
      </div>
    }

    return <div className="Item__meta">
      <span className="Item__by">
        by <Link to={`/user/${item.by}`}>{item.by}</Link>
      </span>{' '}
      <TimeAgo date={itemDate} className="Item__time"/>
      {extraContent}
    </div>
  },

  /**
   * Render an item's title bar.
   */
  renderItemTitle(item) {
    var hasURL = !!item.url
    var title
    if (item.dead) {
      title = '[dead] ' + item.title
    }
    else {
      title = (hasURL ? <a href={item.url}>{item.title}</a>
                      : <Link to={`/${item.type}/${item.id}`}>{item.title}</Link>)
    }
    return <div className="Item__left">
    {' '}
      {<div className="Item__host">{parseHost(item.url)}</div>}{' '}
    <div className="Item__score">
      {item.score}
    </div>{' '}
    <div className="Item__title">
      {title}{' '}
    <span>{'| '}<Link to={`/${item.type}/${item.id}`}>
      {item.descendants > 0 ? item.descendants + ' comment' + pluralise(item.descendants) : 'discuss'}
      </Link></span>
    </div>
    </div>
  }
}

module.exports = ItemMixin
