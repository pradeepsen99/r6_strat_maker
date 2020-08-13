import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';

const fabric = require("fabric").fabric;
const Nuclear = require("nuclear-js");
const createReactClass = require('create-react-class');

var keyMirror = function(obj) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = key;
    }
  }
  return ret;
};

var reactor = new Nuclear.Reactor({ debug: true });
var keys = keyMirror({ fabricData: null, activeObject: null });

// globally accessable fabricCanvas instance
var fabricCanvas = new fabric.Canvas();

// A place to put fabric data
var fabricStore = Nuclear.Store({
  getInitialState() {
    return Nuclear.toImmutable({
    	fabricData: {
      	objects: [],
      },
      activeObject: false,
    })
  },
  initialize() {
    this.on(keys.fabricData, this.saveFabricData)
    this.on(keys.activeObject, this.saveActiveObject)
  },
  saveFabricData(state, fabricData) {
		return state.set('fabricData', Nuclear.toImmutable(fabricData));
	},
  saveActiveObject(state, value) {
		return state.set('activeObject',value);
	}
});

reactor.registerStores({
  'fabricStore': fabricStore,
});

var Fabric = createReactClass({
	componentDidMount() {
  	var el = ReactDOM.findDOMNode(this);
    
    // Here we have the canvas so we can initialize fabric
    fabricCanvas.initialize(el, {
    	height: 300,
      width: 300,
    });
    
    // on mouse up lets save some state
    fabricCanvas.on('mouse:up', () => {
      reactor.dispatch(keys.fabricData, fabricCanvas.toObject());
      reactor.dispatch(keys.activeObject, !!fabricCanvas.getActiveObject());
    });
    
    // an event we will fire when we want to save state
    fabricCanvas.on('saveData', () => {
    	reactor.dispatch(keys.fabricData, fabricCanvas.toObject());
      reactor.dispatch(keys.activeObject, !!fabricCanvas.getActiveObject());
      fabricCanvas.renderAll(); // programatic changes we make will not trigger a render in fabric
    });
  }, 
  render() {
    return <canvas></canvas>
  }
});

var NewObjects = createReactClass({
	mixins: [reactor.ReactMixin],
  getDataBindings() {
  	return {
    	fabricData: ['fabricStore', 'fabricData'],
    	activeObject: ['fabricStore', 'activeObject'],
    };
  },
  render: function() {
  	if (this.state.fabricData.get('objects').size == 0) {
    	// no object is on the canvas so show interface to add one
      return (<div>
        <button onClick={this.addCircle}>Add Circle</button>
        <button onClick={this.addSquare}>Add Square</button>
      </div>);
    } else if (this.state.activeObject) {
    	// an object is selected so lets interact with it
    	return (<div>
      	<div style={{ border: '1px solid', padding: '10px 5px 5px', margin: '15px 10px 0 0' }}>
          Set Color:
          <button onClick={this.setRed}>Red</button>
          <button onClick={this.setGreen}>Green</button>
          <button onClick={this.setBlue}>Blue</button>
        </div>
        <br />
        <button onClick={this.remove}>Delete Object</button>
      </div>);
    } else {
    	// if there is an object but it is not selected then remove the buttons
    	return null;
    }
  },
  addCircle() {
  	// all our action handler can just talk directly to fabric
  	fabricCanvas.add(new fabric.Circle({
    	radius: 50,
      originX: 'center',
      originY: 'center',
      fill: '#FFF',
      top: fabricCanvas.height / 2,
      left: fabricCanvas.width / 2,
    }));
    fabricCanvas.setActiveObject(fabricCanvas.getObjects()[0]);
    
    // when we are done makeing changes send the state from fabric
    fabricCanvas.fire('saveData');
  },
  addSquare() {
  	fabricCanvas.add(new fabric.Rect({
    	height: 100,
    	width: 100,
      originX: 'center',
      originY: 'center',
      fill: '#FFF',
      top: fabricCanvas.height / 2,
      left: fabricCanvas.width / 2,
    }));
    fabricCanvas.setActiveObject(fabricCanvas.getObjects()[0]);
    fabricCanvas.fire('saveData');
  },
  setRed() {
  	// another instance where we are just talking to fabric directly
  	fabricCanvas.getActiveObject().fill = 'red';
    fabricCanvas.fire('saveData');
  },
  setGreen() {
  	fabricCanvas.getActiveObject().fill = 'green';
    fabricCanvas.fire('saveData');
  },
  setBlue() {
  	fabricCanvas.getActiveObject().fill = 'blue';
    fabricCanvas.fire('saveData');
  },
  remove() {
    fabricCanvas.remove(fabricCanvas.getActiveObject());
    fabricCanvas.fire('saveData');
  }
});

var ActiveObject = createReactClass({
	mixins: [reactor.ReactMixin],
  getDataBindings() {
  	return {
    	fabricObject: ['fabricStore', 'fabricData', 'objects', 0],
    };
  },
  render: function() {
  	if (this.state.fabricObject) {
    	// if an object exists in state we can acess the data from any where in the app
    	var fill = this.state.fabricObject.get('fill');
      return (<div>
        <div><b>Active Object</b></div>
        <div>fill: <span style={{ color: fill}}>{this.state.fabricObject.get('fill')}</span></div>
        <div>top: {this.state.fabricObject.get('top')}</div>
        <div>left: {this.state.fabricObject.get('left')}</div>
        <div>angle: {this.state.fabricObject.get('angle')}</div>
        <div>scaleX: {this.state.fabricObject.get('scaleX')}</div>
        <div>scaleY: {this.state.fabricObject.get('scaleY')}</div>
      </div>);
    } else {
    	return null;
    }
  },
});


function App() {
  return (
    <div className="App">
      <div style={{ float: 'left' }}>
    		<ActiveObject />
    		<NewObjects />
      </div>
    	<Fabric />
    </div>
  );
}

export default App;
