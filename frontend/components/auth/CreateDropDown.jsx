import React from 'react';
import { FiPlus, FiImage } from 'react-icons/fi';
import dropdownStyles from './UserDropDown.module.css';
import styles from './CreateDropDown.module.css';

const mockupResponse = [
  {
    id: 1, name: '29 x 29 in', description: '', width: 2784, height: 2784, icon: <FiImage />,
  },
  {
    id: 2, name: '29 x 44 in', description: '', width: 2784, height: 4224, icon: <FiImage />,
  },
  {
    id: 3, name: '29 x 54 in', description: '', width: 2784, height: 5664, icon: <FiImage />,
  },
];

class CreateDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false, custom: false, width: '', height: '',
    };
    this.toggleCustom = this.toggleCustom.bind(this);
    this.submitCustom = this.submitCustom.bind(this);
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({ animate: true });
      });
    });
  }

  createDesign(item) {
    const { createDesign, currentUser, history } = this.props;
    const design = {
      creatorId: currentUser.id,
      title: `Untitled Design - ${item.name}`,
      description: '',
      public: false,
      width: item.width,
      height: item.height,
    };
    createDesign(design).then((res) => {
      history.push(`/design/${res.payload.design.id}`);
    });
  }

  submitCustom() {
    const { width, height } = this.state;
    this.createDesign({ width, height, name: 'Custom Design' });
  }

  toggleCustom() {
    const { custom } = this.state;
    this.setState({ custom: !custom });
  }

  handleChange(form) {
    return (e) => {
      this.setState({ [form]: e.currentTarget.value });
    };
  }

  render() {
    const {
      animate, custom, width, height,
    } = this.state;
    const error = width < 40 || width > 8000 || height < 40 || height > 8000;
    return (
      <div className={`${dropdownStyles.dropdownCard} ${animate ? dropdownStyles.animate : ''}`}>
        <ul className={styles.createDropDown}>
          <li className={styles.listItem} onClick={this.toggleCustom}>
            <FiPlus className={custom ? `${styles.rotate} ${styles.icon}` : styles.icon} />
            <span className="ml-8">Custom Dimensions</span>
          </li>
          {custom ? (
            <div className={styles.customForm}>
              <li className={styles.custom}>
                <div>
                  <input
                    type="number"
                    style={width !== '' && (width < 40 || width > 8000) ? { border: '1px solid red' } : {}}
                    inputMode="numeric"
                    pattern="\d*"
                    name="width"
                    placeholder="Width"
                    onChange={this.handleChange('width')}
                  />
                  px
                </div>
                <div>
                  <input
                    type="number"
                    style={height !== '' && (height < 40 || height > 8000) ? { border: '1px solid red' } : {}}
                    inputMode="numeric"
                    pattern="\d*"
                    name="height"
                    placeholder="Height"
                    onChange={this.handleChange('height')}
                  />
                  px
                </div>
              </li>
              {(width !== '' || height !== '') && error ? <li className={styles.error}>Dimensions must be at least 40px and no more than 8000px.</li> : ''}
              <li className={styles.submit}>
                <button type="submit" className="btn-red" onClick={this.submitCustom} disabled={error}>
                  Create Design
                </button>
              </li>
            </div>
          ) : (
            <>
              {mockupResponse.map((item) => (
                <li
                  key={item.id}
                  className={styles.listItem}
                  onClick={() => this.createDesign(item)}
                >
                  {item.icon}
                  <span className="ml-8">{item.name}</span>
                  <small className={styles.hidden}>{item.description}</small>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    );
  }
}

export default CreateDropDown;
