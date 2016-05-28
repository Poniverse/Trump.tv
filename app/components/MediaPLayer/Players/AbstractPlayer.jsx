import React, { Component } from 'react';

export const PLAYER_STATE_LOADING = 'loading';
export const PLAYER_STATE_PAUSED = 'paused';
export const PLAYER_STATE_PLAYING = 'playing';

class AbstractPlayer extends Component {
  constructor() {
    super();
    this.state = {
      state: PLAYER_STATE_LOADING,
      lastSetTime: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { state, lastSetTime } = this.state;

    if (nextProps.setTime !== lastSetTime) {
      this.updateTime(nextProps.setTime);
    }

    if (state !== PLAYER_STATE_LOADING) {
      if (state === PLAYER_STATE_PAUSED && nextProps.state === PLAYER_STATE_PLAYING) {
        this.playVideo();
      }

      if (state === PLAYER_STATE_PLAYING && nextProps.state === PLAYER_STATE_PAUSED) {
        this.pauseVideo();
      }
    }
  }

  playVideo() {
    this.setState({
      state: PLAYER_STATE_PLAYING
    });
  }

  pauseVideo() {
    this.setState({
      state: PLAYER_STATE_PAUSED
    });
  }

  handleOnReady(event) {
    this.setState({
      state: PLAYER_STATE_PAUSED
    });
  }

  updateTime(time) {
    this.setState({
      lastSetTime: time
    });
  }
}

export default AbstractPlayer;