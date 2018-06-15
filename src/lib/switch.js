const Subdevice = require('./subdevice')

class Switch extends Subdevice {
  constructor (opts) {
    super({ sid: opts.sid, type: 'switch' })
  }

  _handleState (state) {
    super._handleState(state)

    if (typeof state.status === 'undefined') return // might be no_close

    switch (state.status) {
      case 'click':
        this.emit('click')
        break
      case 'double_click':
        this.emit('doubleClick')
        break
      case 'long_click_press':
        this.emit('longClickPress')
        break
      case 'long_click_release':
        this.emit('longClickRelease')
        break
    }
  }
}

const STEP_TIMEOUT = 2000;
class Switch86 extends Subdevice {
  constructor(opts) {
    super({sid: opts.sid, type: 'switch'});
    this.step = 0;
    this.stepTime = Date.now();
  }

  _handleState(state) {
    super._handleState(state);

    if(state.channel_0) {
      this.step = Date.now() - this.stepTime < STEP_TIMEOUT ? ++this.step : 1;
      this.stepTime = Date.now();
      this.emit('click', this.step);
    }
  }
}

class Switch86Double extends Subdevice {
  constructor(opts) {
    super({sid: opts.sid, type: 'switch'});
    this.step0 = 0;
    this.step1 = 0;
    this.stepTime0 = Date.now();
    this.stepTime1 = Date.now();
  }

  _handleState(state) {
    super._handleState(state);

    if(state.channel_0 == 'click') {
      this.step0 = Date.now() - this.stepTime0 < STEP_TIMEOUT ? ++this.step0 : 1;
      this.stepTime0 = Date.now();
      this.emit('click', this.step0);
    }

    if(state.channel_1 == 'click') {
      this.step1 = Date.now() - this.stepTime1 < STEP_TIMEOUT ? ++this.step1 : 1;
      this.stepTime1 = Date.now();
      this.emit('click', this.step1);
    }
  }
}

module.exports = {Switch, Switch86, Switch86Double};
