import React from 'react';
import styles from './DesignTools.module.css';

class DesignTools extends React.Component {
  constructor(props) {
    super(props);
    this.updateStuff = this.updateStuff.bind(this);
    this.deleteElement = this.deleteElement.bind(this);
    // if(props.update_header)props.headerUpdated();
  }

  changeValue(attr) {
    const { selected, receiveElement } = this.props;
    if (attr === 'posX' || attr === 'posY' || attr === 'transparency' || attr === 'zIndex') {
      return (e) => {
        selected[attr] = e.target.value;
        receiveElement({ selected });
      };
    }
    return (e) => {
      selected.elementableAttributes[attr] = e.target.value;
      receiveElement({ selected });
    };
  }

  deleteElement() {
    const { selected, receiveElement, setSelection } = this.props;
    receiveElement({ ...selected, _destroy: true });
    setSelection(null);
  }

  updateStuff(e) {
    e.preventDefault();
    const { selected, receiveElement } = this.props;
    receiveElement({ ...selected, elementableAttributes: { ...selected.elementableAttributes, color: selected.elementableAttributes.color } });
  }

  render() {
    const { selected } = this.props;

    if (!selected) {
      return (
        <div className={styles.designTools}>
          <span className={styles.nothingSelected}>Nothing Selected</span>
        </div>
      );
    }
    return (
      <div className={styles.designTools}>
        <form
          className={styles.designForm}
          onChange={this.updateStuff}
          // onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.leftNav}>
            {(selected.elementableType === 'Text' || selected.elementableType === 'Shape') && (
              <label className="btn-color" style={{ backgroundColor: selected.elementableAttributes.color }}>
                <input type="color" className={styles.hidden} size={selected.elementableAttributes.color.length + 1} value={selected.elementableAttributes.color} onChange={this.changeValue('color')} />
              </label>
            )}
            {selected.elementableType === 'Text' && (
              <>
                {/* <span>Text:</span>
                <input type="text" className="input-attr" size={selected.elementableAttributes.text.length + 1} value={selected.elementableAttributes.text} onChange={this.changeValue('text')} /> */}
                <span>Size:</span>
                <input
                  type="number"
                  className="input-attr"
                  size={
                    selected.elementableAttributes.fontSize.toString().length +
                    1
                  }
                  value={selected.elementableAttributes.fontSize}
                  onChange={this.changeValue("fontSize")}
                />
                <span>Font:</span>
                <select
                  className="input-attr"
                  defaultValue={selected.elementableAttributes.fontFamily}
                  onChange={this.changeValue("fontFamily")}
                >
                  {[
                    "Open Sans",
                    "ArchitectsDaughter",
                    "LobsterTwo",
                    "AbrilFatface",
                    "AmaticSC",
                    "Italianno",
                    "Parisienne",
                    "FredokaOne",
                    "Nunito",
                    "Raleway",
                    "Roboto",
                    "Sarabun",
                    "Teko",
                    "Work Sans",
                    "NanumMyeongjo",
                    "Chakra Petch",
                    "Qahiri-Regular",
                    "Fuggles-Regular",
                    "ZenTokyoZoo-Regular",
                  ].map((font) => (
                    <option key={font}>{font}</option>
                  ))}
                </select>
                <span>Weight:</span>
                <input
                  id="attr-weight"
                  type="number"
                  className="input-attr"
                  size={
                    selected.elementableAttributes.fontWeight.toString()
                      .length + 1
                  }
                  value={selected.elementableAttributes.fontWeight}
                  onChange={this.changeValue("fontWeight")}
                />
              </>
            )}
          </div>
          <div className={styles.rightNav}>
            {/* <span>X:</span>
            <input type="text" className="input-attr" size={selected.posX.toString().length + 1} value={selected.posX} onChange={this.changeValue('posX')} />
            <span>Y:</span>
            <input type="text" className="input-attr" size={selected.posY.toString().length + 1} value={selected.posY} onChange={this.changeValue('posY')} /> */}
            <span>Opacity:</span>
            <input
              type="number"
              minimum="0"
              max="100"
              name="opacity"
              className="input-attr"
              size={selected.transparency.toString().length + 1}
              value={selected.transparency}
              onChange={this.changeValue("transparency")}
            />
            <span>Order:</span>
            <input
              type="number"
              minimum="0"
              max="100"
              className="input-attr"
              name="order"
              size={selected.zIndex.toString().length + 1}
              value={selected.zIndex}
              onChange={this.changeValue("zIndex")}
            />
            <button
              type="button"
              className="btn-color"
              onClick={this.deleteElement}
            >
              Delete
            </button>
            {/* <button type="submit" className="btn-color">Submit</button> */}
          </div>
        </form>
      </div>
    );
  }
}

export default DesignTools;
