var React = require('react'),
    DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li, input = DOM.input
var $ = require('jquery')
// This is just a simple example of a component that can be rendered on both
// the server and browser

module.exports = React.createClass({

  // We initialise its state by using the `props` that were passed in when it
  // was first rendered. We also want the button to be disabled until the
  // component has fully mounted on the DOM
  getInitialState: function() {
    return {items: this.props.items, disabled: true, shortUrls: [], urlInput: 'www.youtube.com'}
  },

  // Once the component has been mounted, we can enable the button
  componentDidMount: function() {
    this.setState({disabled: false,shortUrls:[]})
  },
  // Then we just update the state whenever its clicked by adding a new item to
  // the list - but you could imagine this being updated with the results of
  // AJAX calls, etc
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

  // For ease of illustration, we just use the React JS methods directly
  // (no JSX compilation needed)
  // Note that we allow the button to be disabled initially, and then enable it
  // when everything has loaded
  render: function() {
    return div({style: {padding:'50px'}},
      div({style:{
          textAlign: 'center',
          fontSize: '30px',
          fontFamily: 'sans-serif',
          padding: '15px'
        }
      },'Header' ),
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
