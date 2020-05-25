import React from "react";
import { Card, CardBody, CardImg, Button, Badge } from "shards-react";
import "./Home.css";
import Step1 from "./Step1.png";
import Step2 from "./Step2.png";
import Step3 from "./Step3.png";
import Step4 from "./Step4.png";
import PoolTogether from "./pooltogether.png";

import GridLoader from "react-spinners/GridLoader";

import BuyModal from "./components/BuyModal";
import { getWeb3, getAutheremInstance, depositToPoolTogether } from "./services";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      accounts: null,
      authereum: null,
      isCreatingAccount: false,
      buyingPoolToken: false,
    };
    this.buyToggle = this.buyToggle.bind(this);
    this.createEthAddress = this.createEthAddress.bind(this);
  }

  async createEthAddress() {
    console.log("CLicked");

    let accounts;

    this.setState({ isCreatingAccount: true });
    accounts = await getWeb3()
    console.log('this.accounts', accounts)
    
    const authereum = await getAutheremInstance()
    console.log('got authereum')
    this.setState({
      accounts: accounts,
      authereum: authereum,
    });

    console.log('state', this.state)
  }

  buyToggle() {
    if (!this.state.accounts) {
      return;
    }

    this.setState({
      open: !this.state.open,
      buyingPoolToken: !this.state.buyingPoolToken,
    });
    console.log("Toggle", this.state.open);
  }

  render() {
    return (
      <div className="Background">
        <div className="Image">
          <center>
            <img className="Logo" src={PoolTogether} />
            <h2 className="TagLine">
              You could win $146 every week just by saving your money
            </h2>

            <div className="Space">
              <Button className="LearnButton" outline pill theme="info">
                Wanna Learn More
              </Button>
              <Button className="LearnButton1" outline pill theme="info">
                Already Know Enough
              </Button>
            </div>
          </center>
        </div>
        <div>
          <center>
            <Card className="Steps">
              <CardBody>
                <div className="Content">
                  <div className="StepNumber">
                    <br />
                    <br />
                    <h1 className="Number">1</h1>
                  </div>

                  <h4 className="StepName">Deposit some Dollars with Others</h4>
                  <p className="Para">
                    You have to deposit some Dollar to Pool Together. Meanwhile
                    others also do the same. All this is safely deposited to
                    Pool Together's Contract
                  </p>
                </div>
                <CardImg className="StepImage" src={Step1} />
              </CardBody>
            </Card>

            <Card className="Steps">
              <CardBody>
                <div className="Content2">
                  <div className="StepNumber">
                    <br />
                    <br />
                    <h1 className="Number">2</h1>
                  </div>
                  <h4 className="StepName">Sit Back And Relax</h4>
                  <p className="Para">
                    This is all you need to do now. From now on your entry to
                    the next and it's next prize is taken automatically by the
                    system while you can relax and focus on your work.
                  </p>
                </div>
                <CardImg className="StepImage2" src={Step2} />
              </CardBody>
            </Card>

            <Card className="Steps">
              <CardBody>
                <div className="Content3">
                  <div className="StepNumber">
                    <br />
                    <br />
                    <h1 className="Number">3</h1>
                  </div>
                  <h4 className="StepName">
                    Get the Prize Results delivered to you
                  </h4>
                  <p className="Para">
                    Every time there is a new draw, the prize result is
                    delivered right to your inbox or you can always visit the
                    Pool Together site to check the prize history.
                  </p>
                </div>
                <CardImg className="StepImage3" src={Step3} />
              </CardBody>
            </Card>

            <Card className="Steps">
              <CardBody>
                <div className="Content4">
                  <div className="StepNumber">
                    <br />
                    <br />
                    <h1 className="Number">4</h1>
                  </div>
                  <h4 className="StepName">Don't Worry About your Tickets</h4>
                  <p className="Para">
                    While the winner gets the reward, your tickets are never
                    lost. You can always redeem the initial amount of tokens you
                    deposited to the app. Without ever losing anything.
                  </p>
                </div>
                <CardImg className="StepImage4" src={Step4} />
              </CardBody>
            </Card>

            <div className="Space2">
              <Card className="Cards1">
                <CardBody>
                  <div>
                    <br />
                    {this.state.accounts ? (
                      <div>
                        <center>
                          <h4> Your Ethereum Address </h4>
                        </center>
                        <Badge outline pill theme="success">
                          {this.state.accounts}
                        </Badge>
                      </div>
                    ) : this.state.isCreatingAccount ? (
                      <div>
                        <center>
                          <h4> Creating Your Account </h4>
                        </center>
                        <GridLoader
                          size={10}
                          color={"#5f26c0"}
                          loading={this.state.isCreatingAccount}
                        />
                      </div>
                    ) : (
                      <div>
                        <h4>Create Your Ethereum Account</h4>
                        <Button
                          className="ModalButton"
                          outline
                          pill
                          theme="info"
                          onClick={this.createEthAddress}
                        >
                          Create Eth Account
                        </Button>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>

              <Button onClick={(e) => depositToPoolTogether(2)}>Buy Tokens</Button>

              <Card className="Cards">
                <CardBody>
                  <div>
                    <h4>Buy Some Pool Tokens</h4>
                    {this.state.accounts ? (
                      this.state.buyingPoolToken ? (
                        <GridLoader
                          size={10}
                          color={"#5f26c0"}
                          loading={this.state.buyingPoolToken}
                        />
                      ) : (
                        <div>
                          <Button
                            className="ModalButton"
                            outline
                            pill
                            theme="info"
                            onClick={this.buyToggle}
                          >
                            Buy Eth
                          </Button>
                        </div>
                      )
                    ) : (
                      <div>
                        <p>You Need to Login/Create a Ethereum Account First</p>
                        <Button
                          className="ModalButton"
                          outline
                          pill
                          theme="info"
                          disabled
                        >
                          Buy Eth
                        </Button>
                      </div>
                    )}
                    <BuyModal
                      show={this.state.open}
                      toggle={this.buyToggle}
                      accounts={this.state.accounts}
                      authereumInstance={this.state.authereum}
                    />
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="Div">
              <h2 className="StepName">Ready to Invest Some Money??</h2>
              <Button className="Join" outline pill theme="info">
                <a href="https://www.pooltogether.com/" className="Link2">
                  {" "}
                  Join Now
                </a>
              </Button>
            </div>
          </center>
        </div>
      </div>
    );
  }
}
