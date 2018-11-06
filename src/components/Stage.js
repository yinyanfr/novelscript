import React, { Component } from 'react'
import Talkbox from "./Talkbox"

class Stage extends Component {

    state = {
        txt: "",
        end: true
    }

    tests = [
        "触れた心は輝いた　鮮やかな色になって 羽ばたくよ希望乗せて 無限に広がる空の下集まった 願い守り進めば まだ誰も知らない明日へと",
        "引き寄せられるように覗いた瞬間 光の糸は君包んだ",
        "細く千切れそうな絡まった運命 きっとまだ変われる",
        "間違えでも信じた道は新しい景色を 照らすだろう",
        "巡る時の中笑って　様々な想い持って 始めようまた一から 辿り着いた儚い奇跡壊れないように 手を伸ばし繋げば ほら君は側でいつまでも…",
        "まだ透明な私たちはどんな色にでも 染まることが出来るから夢叶えよう",
        "走って行く先に君はいた",
        "触れた心は輝いた　鮮やかな色になって 羽ばたくよ希望乗せて 無限に広がる空の下集まった 願い守り行けば 君と誓ったあの日の記憶 今超えて過去から まだ誰も知らない明日へと"
    ]

    getStyle = component => {
        switch (component) {
            case "Talkbox":
                return {
                    height: 200,
                    width: "inherit",
                    padding: 15
                }

            default:
                return {}
        }
    }

    onClickStage = e => {
        e.preventDefault()
        if(this.state.end && this.tests.length){
            this.setState(() => ({
                txt: this.tests.shift(),
                end: false
            }))
        }
        else {
            this.setState(() => ({end: true}))
        }
    }

    onFinish = e => {
        this.setState(() => ({end: true}))
    }

    render = () => (
        <div style={this.props.style} onClick={this.onClickStage}>
            <Talkbox 
                style={this.getStyle("Talkbox")}
                txt={this.state.txt}
                end={this.state.end} 
                onFinish={this.onFinish}
            />
        </div>
    )
}

export default Stage
