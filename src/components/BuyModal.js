import React from "react";
import { Button, Modal, ModalBody, ModalHeader, FormInput } from "shards-react";

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
    var widget = new window.Wyre({
      env: "test",
      operation: {
        type: "debitcard-hosted-dialog",
        dest: "ethereum:" + this.props.accounts,
        destCurrency: "DAI",
        sourceAmount: parseInt(this.state.daiAmount),
        paymentMethod: "debit-card",
      },
    });
    await widget.open();
  }

  render() {
    return (
      <div>
        <Modal open={this.props.show} toggle={this.props.toggle}>
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
              className="ModalButton"
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
