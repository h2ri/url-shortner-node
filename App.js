var React = require('react'),
    DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li, input = DOM.input
var $ = require('jquery')

module.exports = React.createClass({

  getInitialState: function() {
    return {items: this.props.items, disabled: true, shortUrls: [], urlInput: 'https://www.youtube.com/'}
  },

  componentDidMount: function() {
    this.setState({disabled: false,shortUrls:[]})
  },
  handleClick: function() {
    this.setState({
      items: this.state.items.concat('Item ' + this.state.items.length)
    })
  },
  inputChanged: function(e) {
    console.log(e.target.value);
    this.setState({
      urlInput: e.target.value
    })
  },
  send: function() {
       var that = this;
       $.post('https://fierce-reaches-42372.herokuapp.com/',
         {
         "original_url" : that.state.urlInput
         }
     )
     .done(function(res){
         console.log('>>> ',res);
       var newArr = that.state.shortUrls.slice();
       newArr.push(res.url);
       that.setState({
           shortUrls: newArr
       });
     })
   },

  render: function() {
    return div({style: {padding:'50px'}},
      div({style:{
          textAlign: 'center',
          fontSize: '30px',
          fontFamily: 'sans-serif',
          padding: '15px'
        }
      },'Url Shotner' ),
      input({
        style: {
          width: '100%',
          padding: '12px 20px',
          margin: '8px 0',
          boxSizing: 'border-box',
          fontSize: '20px',
        },
        type: 'url',
        value: this.state.urlInput,
        onChange: this.inputChanged
      }),
      button({
        style: {
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '16px 32px',
          textDecoration: 'none',
          margin: '4px 2px',
          cursor: 'pointer'
        },
        onClick: this.send,
        disabled: !this.state.urlInput
      }, 'Add Item'),

      ul({style: {
          padding: '16px 32px',
          fontSize: '20px'
        },
        children: this.state.shortUrls.map(function(item) {
        return li(null, "https://fierce-reaches-42372.herokuapp.com/" + item.short_url)
      })})

    )
  },
})
