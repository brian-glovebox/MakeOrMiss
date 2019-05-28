import React from 'react';
import {ShotChart} from "./ShotChart"

import {
    Row , Col , Radio, Switch
} from 'antd';
import {CountSlider} from "./CountSlider"
import _ from  'lodash'

const RadioGroup = Radio.Group;

export  class DataViewContainer extends React.Component {

    state = {
        minCount: 2,
        displayToolTips: true,
        chartType: "hexbin"
    }

    onChange = (value) => {
        this.setState({
            inputValue: value,
            minCount: value
        });
    }

    onMinCountChange = (value) => {
        this.setState({
            minCount:value
        })
    }

    onDisplayToolTipsChange = (displayToolTips)=> {
        this.setState({
            displayToolTips
        })
    }


    onChartTypeChange = (e) => {
        this.setState({
            chartType : e.target.value
        });
    }
    debounce = (func, timeout) => {
        var timer;
        return (...args) => {
            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(() => {
                console.log('debounce');
                func.apply(null, args);
            }, timeout);
        }
    }

    render() {
        const { inputValue } = this.state;
        return (
            <div className= "data-view">
                {
                    this.state.chartType === "hexbin" ? (
                        <Row className = "count">
                            <Col span="24" offset = "4">
                                <CountSlider onMinCountChange = {this.debounce(this.onMinCountChange , 500)} value = {this.state.minCount}/>
                            </Col>
                        </Row>
                    ) : (<div className = "count"></div>)
                }

                <ShotChart
                    playerId = {this.props.playerId}
                    minCount={this.state.minCount}
                    displayToolTips={this.state.displayToolTips}
                    chartType= {this.state.chartType}
                    className = "shot-chart"
                />


                <Row className = "button">
                    <Col span="9" offset = "6">
                        <RadioGroup value={this.state.chartType} onChange={this.onChartTypeChange}>
                            <Radio value="hexbin">Hexbin</Radio>
                            <Radio value ="scatter">Scatter</Radio>
                        </RadioGroup>
                    </Col>
                    <Col span="3" >
                        <Switch
                            onChange={this.onDisplayToolTipsChange}
                            checkedChildren="On"
                            unCheckedChildren="Off"
                            defaultChecked
                        />
                    </Col>
                </Row>




            </div>
        );
    }
}