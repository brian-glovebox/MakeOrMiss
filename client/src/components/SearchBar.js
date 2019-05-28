import React from 'react';
import { AutoComplete  , Input , Icon } from 'antd';
import nba from 'nba';
import {PROFILE_PIC_URL_PREFIX} from "../constants";


const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        const players = nba.searchPlayers(value);

        this.setState({
            dataSource : players.map(({playerId , fullName}) => (
                <Option key={playerId} value = {fullName}>
                    <img className= "player-option-image"
                         src = {` ${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                         alt={`${fullName}`}
                    />
                    <span className= "player-option-name">{fullName}</span>

                </Option>
            ))
        });
    }

    onSelect = (value) => {
        this.props.loadPlayerInfo(value)
    }


    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className= "search-bar"
                dataSource={dataSource}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                size = "large"
                placeholder="Search NBA Player"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" />} />

            </AutoComplete>
        );
    }
}