import React from 'react';
import styles from './Editor.module.css';
import EditorNav from './EditorNav';
import DesignDrawer from './DesignDrawer';
import WorkArea from './WorkArea';
import isMobile from '../../util/mobile_util';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      design: {}, // design attributes
      elements: [], // key-value pair elementId and the current element, array index=z-index order
      zoom: 0.5,
      selection: null,
      editable: null,
      selected: null, // kv pair or array index and element, with or without eleId
      loading: false,
      // undoHistory: [], array of key-value pair of elementId and the element copy before
    };
    this.changeZoomFactor = this.changeZoomFactor.bind(this);
    this.updateDesign = this.updateDesign.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.setEditable = this.setEditable.bind(this);
    this.updateElement = this.updateElement.bind(this);
    this.addElement = this.addElement.bind(this);
  }

  componentDidMount() {
    // only loads when refresh page, not changing routes
    const { requestDesign } = this.props;
    requestDesign().then(() => {
      const { design, elements } = this.props;
      this.setState({ design, elements });
    });
  }

  setSelection(idx) {
    const { elements } = this.props;
    this.setState({
      selected: elements.find((el) => el.id === idx),
      selection: idx,
      editable: null,
    });
  }

  setEditable(idx) {
    const { selection } = this.state;
    if (selection === idx) {
      this.setState({ editable: idx });
    } else {
      this.setSelection(idx);
    }
  }

  changeZoomFactor(fact) {
    this.setState({ zoom: fact });
  }

  updateElement(idx, element) {
    const { receiveElement } = this.props;
    receiveElement(element);
  }

  // addElement(element) {
  //   const { elements } = this.state;
  //   elements.push(element);
  //   this.setState({ elements, selected: { [elements.length - 1]: element } });
  // }
  addElement(element) {
    const { createElement, design } = this.props;
    if (isMobile()) {
      $('#drawer-door').click();
      // close the drawer
    }

    createElement(design.id, { ...element, id: `temp-${Date.now()}` });
  }

  screenshot() {
    const { design: { id, width, height } } = this.state;
    return fetch(`${process.env.SCREENSHOT_URL}screenshot?id=${id}&width=${width}&height=${height}`)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'File name', { type: 'image/png' });
        return file;
      });
  }

  updateDesign() {
    const { design } = this.state;
    const { updateDesign, elements } = this.props;
    elements.forEach((element) => {
      if (typeof element.id === 'string') {
        delete element.id;
      }
    });
    design.elementsAttributes = elements;
    delete design.thumbnail;
    this.setState({ loading: true });
    updateDesign(design)
      .then(() => {
        this.screenshot().then(
          (file) => {
            const formData = new FormData();
            formData.append('design[id]', design.id);
            formData.append('design[thumbnail]', file);
            $.ajax({
              url: `/api/designs/${design.id}`,
              method: 'PATCH',
              data: formData,
              processData: false,
              contentType: false,
            }).then(() => this.setState({ loading: false }));
          },
        );
      });
  }

  render() {
    const {
      design, zoom, selected, loading, selection, editable,
    } = this.state;
    const { elements } = this.props;

    // return <Viewer design={design} elements={elements} zoom={zoom} />
    return (
      <div className={styles.editorContainer}>
        <EditorNav updateDesign={this.updateDesign} loading={loading} />
        <div className={styles.editorBottomContainer}>
          <DesignDrawer addElement={this.addElement} zoom={zoom} />
          <WorkArea
            design={design}
            elements={elements}
            zoom={zoom}
            updateElementPos={this.updateElementPos}
            selected={selected}
            updateElement={this.updateElement}
            selection={selection}
            editable={editable}
            setSelection={this.setSelection}
            setEditable={this.setEditable}
          />
          <div className={styles.zoomBar}>
            <button type="button" className="btn-icon" onClick={() => this.changeZoomFactor(1)}>100%</button>
            <button type="button" className="btn-icon" onClick={() => this.changeZoomFactor(0.75)}>75%</button>
            <button type="button" className="btn-icon" onClick={() => this.changeZoomFactor(0.5)}>50%</button>
            <button type="button" className="btn-icon" onClick={() => this.changeZoomFactor(0.25)}>25%</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
