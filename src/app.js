import React from 'react';
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import { TweenOneGroup } from 'rc-tween-one';
import Icon from 'antd/lib/icon';
import PropTypes from 'prop-types';
import BG01 from './static/01.jpg';
import BG02 from './static/02.jpg';
import BG03 from './static/04.jpg';
import loadCanvas from './canvas';

import 'index.css';
import 'antd/dist/antd.css';

const Element = BannerAnim.Element;

let dataArray = [
  {
    pic: BG02,
    color: '#FFF43D',
    background: '#F6B429',
    title: '不具名的主题',
    content: (<span>
      嗨~
      <br /><br />不知道从哪里说起，现如今的通信那么方便，不过请求、响应之间，但总觉着少了点什么，也许是称作仪式感的东西。
      <br /><br />从前的马车很慢，书信很远，要维持一份友情，悠悠思念足矣。
      <br /><br />而现在，短信穿过小山，拂过湖面，余温早已不再。
    </span>)
  },
  {
    pic: BG01,
    color: '#FF4058',
    background: '#FC1E4F',
    title: '独白',
    content: (
      <span>
        我自制力特别差，一直不敢加你；这不，听说你说你有女朋友了，想想总不会胡思乱想了，哈哈～
        <br /><br />原本是想加了你，安安静静放在列表里，但是，我自制力着实差了些，你得感谢我的列表里一直没有你。
        <br /><br />我有个习惯，想一个人了，会找个人聊天，聊着聊着，感觉那份思念是不存在的。
        <br /><br />但是，我忘记了一件事情，有些东西是愈酿愈醇～
        <br /><br />从前的我总爱口是心非、言不由衷，现在的我仍旧是任性的，明知不可为而为之。就让我再自私一次吧。
        <br /><br />一直没跟你说，认识你，是我的小幸运。
        <br /><br />另，我半夜智商为零●ω●，请忽略。
      </span>
    )
  },
  {
    pic: BG03,
    color: '#9FDA7F',
    background: '#64D487',
    title: 'Best Wishes',
    content: (
      <span>
        最后，送上我诚挚的祝福！
        <br /><br />你值得拥有最好的～
        <br /><br />愿你被岁月温柔以待，愿你温暖如初！
      </span>
    )
  },
];
// dataArray = dataArray.map(item => ({ ...item, ...textData }));

class DetailSwitchDemo extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'details-switch-demo',
  };

  constructor(props) {
    super(props);
    this.state = {
      showInt: 0,
      delay: 0,
      imgAnim: [
        { translateX: [0, 300], opacity: [1, 0] },
        { translateX: [0, -300], opacity: [1, 0] },
      ],
    };
    this.oneEnter = false;
  }

  onChange = () => {
    if (!this.oneEnter) {
      this.setState({ delay: 300 });
      this.oneEnter = true;
    }
  }

  onLeft = () => {
    let showInt = this.state.showInt;
    showInt -= 1;
    const imgAnim = [
      { translateX: [0, -300], opacity: [1, 0] },
      { translateX: [0, 300], opacity: [1, 0] },
    ];
    if (showInt <= 0) {
      showInt = 0;
    }
    this.setState({ showInt, imgAnim });
    this.bannerImg.prev();
    this.bannerText.prev();
  };

  onRight = () => {
    let showInt = this.state.showInt;
    const imgAnim = [
      { translateX: [0, 300], opacity: [1, 0] },
      { translateX: [0, -300], opacity: [1, 0] },
    ];
    showInt += 1;
    if (showInt > dataArray.length - 1) {
      showInt = dataArray.length - 1;
    }
    this.setState({ showInt, imgAnim });
    this.bannerImg.next();
    this.bannerText.next();
  };

  getDuration = (e) => {
    if (e.key === 'map') {
      return 800;
    }
    return 1000;
  };

  componentDidMount() {
    loadCanvas(document.getElementById('Mycanvas'));
  }

  render() {
    const imgChildren = dataArray.map((item, i) =>
      <Element key={i} style={{ background: item.color }} hideProps>
        <QueueAnim
          animConfig={this.state.imgAnim}
          duration={this.getDuration}
          delay={[!i ? this.state.delay : 300, 0]}
          ease={['easeOutCubic', 'easeInQuad']}
          key="img-wrapper"
        >
          <div className={`${this.props.className}-map map${i}`} key="map">
            <img src={item.map} width="100%" alt="" />
          </div>
          <div className={`${this.props.className}-pic pic${i}`} key="pic">
            <img src={item.pic} width="100%" alt="" />
          </div>
        </QueueAnim>
      </Element>);
    const textChildren = dataArray.map((item, i) => {
      const { title, content, background } = item;
      return (<Element key={i}>
        <QueueAnim type="bottom" duration={1000} delay={[!i ? this.state.delay + 500 : 800, 0]}>
          <h1 key="h1">{title}</h1>
          <em key="em" style={{ background }} />
          <p key="p">{content}</p>
        </QueueAnim>
      </Element>);
    });
    return (<div
      className={`${this.props.className}-wrapper`}
      style={{ background: dataArray[this.state.showInt].background }}
    >
      <canvas id="Mycanvas" />
      <div className={this.props.className}>
        <BannerAnim
          prefixCls={`${this.props.className}-img-wrapper`}
          sync
          type="across"
          duration={1000}
          ease="easeInOutExpo"
          arrow={false}
          thumb={false}
          ref={(c) => { this.bannerImg = c; }}
          onChange={this.onChange}
          dragPlay={false}
        >
          {imgChildren}
        </BannerAnim>
        <BannerAnim
          prefixCls={`${this.props.className}-text-wrapper`}
          sync
          type="across"
          duration={1000}
          arrow={false}
          thumb={false}
          ease="easeInOutExpo"
          ref={(c) => { this.bannerText = c; }}
          dragPlay={false}
        >
          {textChildren}
        </BannerAnim>
        <TweenOneGroup enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }}>
          {this.state.showInt && <Icon type="left" key="left" onClick={this.onLeft} />}
          {this.state.showInt < dataArray.length - 1 && <Icon type="right" key="right" onClick={this.onRight} />}
        </TweenOneGroup>
      </div>
    </div>);
  }
}

export default DetailSwitchDemo;
