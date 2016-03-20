import React, { Component } from 'react'
import Item from './Item'
// import ItemGroup from './ItemGroup'

import { _get, arraysEqual, keyBy } from '../utils'

export default class Items extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !(arraysEqual(nextProps.groups, this.props.groups) &&
             arraysEqual(nextProps.items, this.props.items) &&
             nextProps.keys === this.props.keys &&
             nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.selectedItem === this.props.selectedItem &&
             nextProps.lineHeight === this.props.lineHeight &&
             nextProps.dragSnap === this.props.dragSnap &&
             nextProps.minResizeWidth === this.props.minResizeWidth &&
             nextProps.canChangeGroup === this.props.canChangeGroup &&
             nextProps.canMove === this.props.canMove &&
             nextProps.canResize === this.props.canResize &&
             nextProps.dimensionItems === this.props.dimensionItems &&
             nextProps.topOffset === this.props.topOffset
    )
  }

  getGroupOrders () {
    const { groupIdKey } = this.props.keys

    let groupOrders = {}

    for (let i = 0; i < this.props.groups.length; i++) {
      groupOrders[_get(this.props.groups[i], groupIdKey)] = i
    }

    return groupOrders
  }

  getVisibleItems (canvasTimeStart, canvasTimeEnd, groupOrders) {
    const { itemTimeStartKey, itemTimeEndKey } = this.props.keys

    return this.props.items.filter(item => {
      return _get(item, itemTimeStartKey) <= canvasTimeEnd && _get(item, itemTimeEndKey) >= canvasTimeStart
    })
  }

  render () {
    const { canvasTimeStart, canvasTimeEnd, dimensionItems } = this.props
    const { itemIdKey, itemGroupKey } = this.props.keys

    const groupOrders = this.getGroupOrders()
    const visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders)
    const sortedDimensionItems = keyBy(dimensionItems, 'id')

    // const timeDiff = Math.floor((canvasTimeEnd - canvasTimeStart) / 24)

    // const start = Math.floor(canvasTimeStart / timeDiff) * timeDiff
    // const end = Math.floor(canvasTimeEnd / timeDiff) * timeDiff

    // const canvasTimeLength = (canvasTimeEnd - canvasTimeStart)
    // const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
    //
    // let itemGroups = []
    //
    // for (let i = start; i < end + timeDiff; i += timeDiff) {
    //   itemGroups.push({
    //     start: i,
    //     end: i + timeDiff,
    //     left: Math.round((i - canvasTimeStart) * ratio, 2),
    //     items: visibleItems.filter(item => item.start >= i && item.start < i + timeDiff)
    //   })
    // }

    let popover = <Popover title="popover">very popover. such engagement</Popover>;
    let tooltip = <Tooltip>wow.</Tooltip>;

    return (

      <div className='rct-items'>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
        {visibleItems.map(item => <Item key={_get(item, itemIdKey)}
                                        item={item}
                                        keys={this.props.keys}
                                        order={groupOrders[_get(item, itemGroupKey)]}
                                        dimensions={sortedDimensionItems[_get(item, itemIdKey)].dimensions}
                                        selected={this.props.selectedItem === _get(item, itemIdKey)}
                                        canChangeGroup={_get(item, 'canChangeGroup') !== undefined ? _get(item, 'canChangeGroup') : this.props.canChangeGroup}
                                        canMove={_get(item, 'canMove') !== undefined ? _get(item, 'canMove') : this.props.canMove}
                                        canResize={_get(item, 'canResize') !== undefined ? _get(item, 'canResize') : this.props.canResize}
                                        useResizeHandle={this.props.useResizeHandle}
                                        topOffset={this.props.topOffset}
                                        groupHeights={this.props.groupHeights}
                                        groupTops={this.props.groupTops}
                                        canvasTimeStart={this.props.canvasTimeStart}
                                        canvasTimeEnd={this.props.canvasTimeEnd}
                                        canvasWidth={this.props.canvasWidth}
                                        lineHeight={this.props.lineHeight}
                                        dragSnap={this.props.dragSnap}
                                        minResizeWidth={this.props.minResizeWidth}
                                        onResizing={this.props.itemResizing}
                                        onResized={this.props.itemResized}
                                        moveResizeValidator={this.props.moveResizeValidator}
                                        onDrag={this.props.itemDrag}
                                        onDrop={this.props.itemDrop}
                                        onItemDoubleClick={this.props.onItemDoubleClick}
                                        onSelect={this.props.itemSelect}/>)}
      </div>
    )

    // NB: itemgroups commented out for now as they made performacne horrible when zooming in/out
    //
    // return (
    //   <div>
    //     {itemGroups.map(group => (
    //       <div key={`timegroup-${group.start}-${group.end}`} style={{position: 'absolute', top: '0', left: `${group.left}px`}}>
    //         <ItemGroup {...this.props} items={group.items} canvasTimeStart={group.start} canvasTimeEnd={group.start + canvasTimeLength} groupOrders={groupOrders} />
    //       </div>
    //     ))}
    //   </div>
    // )
  }
}

Items.propTypes = {
  groups: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
  items: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,

  canvasTimeStart: React.PropTypes.number.isRequired,
  canvasTimeEnd: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,

  dragSnap: React.PropTypes.number,
  minResizeWidth: React.PropTypes.number,
  selectedItem: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),

  canChangeGroup: React.PropTypes.bool.isRequired,
  canMove: React.PropTypes.bool.isRequired,
  canResize: React.PropTypes.bool.isRequired,

  keys: React.PropTypes.object.isRequired,

  moveResizeValidator: React.PropTypes.func,
  itemSelect: React.PropTypes.func,
  itemDrag: React.PropTypes.func,
  itemDrop: React.PropTypes.func,
  itemResizing: React.PropTypes.func,
  itemResized: React.PropTypes.func
}
Items.defaultProps = {
}
