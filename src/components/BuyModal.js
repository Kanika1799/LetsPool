import React from "react";
import { Button, Modal, ModalBody, ModalHeader, FormInput } from "shards-react";
import { depositToPoolTogether } from "../services";

import "../Home.css";
class BuyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daiAmount: 0,
    };
    console.log("props", props);
    this.buyEth = this.buyEth.bind(this);
    this.handlebuyInput = this.handlebuyInput.bind(this);
  }

  async handlebuyInput(e) {
    this.setState({
      daiAmount: e.target.value,
    });
  }

  async buyEth() {
    const authereum = this.props.authereumInstance;
    console.log("authereum", authereum);
    this.props.toggle();
    console.log("this.state.amount", this.state.daiAmount);
    this.props.getBuyAmount(this.state.daiAmount)
    await authereum
      .addFunds({
        countryCode: "US",
        tokenSymbol: "DAI",
        sourceAmount: this.state.daiAmount,
      })
  }

  render() {
    return (
      <div>
        <Modal
          className="Modal"
          open={this.props.show}
          toggle={this.props.toggle}
        >
          <ModalHeader>Get PoolTogether Tokens</ModalHeader>
          <br />
          <p>One Ticket is Worth 1 Dollar</p>
          <p>You can Redeem Your Tokens Any Time</p>
          <ModalBody>
            <FormInput
              size="lg"
              placeholder="Enter Number of Tickets"
              onChange={this.handlebuyInput}
            />
            <Button
              className="ModalButton Join2"
              outline
              pill
              theme="info"
              onClick={this.buyEth}
            >
              Buy Eth
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default BuyModal;
