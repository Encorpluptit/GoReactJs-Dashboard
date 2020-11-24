import React from 'react';
import GridLayout from 'react-grid-layout';
import SimpleCard from './card.js';



export default class CenteredGrid extends React.Component {
  render() {
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2},
      {i: 'b', x: 5, y: 0, w: 1, h: 2},
      {i: 'c', x: 10, y: 0, w: 1, h: 2}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a"><SimpleCard/></div>
        <div key="b"><SimpleCard/></div>
        <div key="c"><SimpleCard/></div>
      </GridLayout>
    )
  }
}