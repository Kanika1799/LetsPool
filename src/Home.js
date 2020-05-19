import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "shards-react";
import "./Home.css";
import Step1 from "./Step1.png";
import Step2 from "./Step2.png";
import Step3 from "./Step3.png";
import Step4 from "./Step4.png";
import PoolTogether from "./pooltogether.png";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    const { open } = this.state;

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
                Learn How
              </Button>
            </div>
          </center>
        </div>
        <div>
          <center>
            <Card className="Steps">
              <CardBody>
                <div className="Content">
                  <h2 className="heading">Step 1. PoolTogether</h2>
                  <p className="Para">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>

                <CardImg className="StepImage" src={Step1} />
              </CardBody>
            </Card>

            <Card className="Steps">
              <CardBody>
                <div className="Content2">
                  <h2 className="heading">Step 2. Sit Back And Relax</h2>
                  <p className="Para">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
                <CardImg className="StepImage2" src={Step2} />
              </CardBody>
            </Card>

            <Card className="Steps">
              <CardBody>
                <div className="Content3">
                  <h2 className="heading">Step 3. Notifications</h2>
                  <p className="Para">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
                <CardImg className="StepImage3" src={Step3} />
              </CardBody>
            </Card>

            <Card className="Steps">
              <CardBody>
                <div className="Content4">
                  <h2 className="heading">Step 4. Winner</h2>
                  <p className="Para">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
                <CardImg className="StepImage4" src={Step4} />
              </CardBody>
            </Card>

            <div className="Space2">
              <Card className="Cards">
                <CardBody>
                  <div>
                    <Button
                      className="ModalButton"
                      outline
                      pill
                      theme="info"
                      onClick={this.toggle}
                    >
                      Create Eth Account
                    </Button>
                    <Modal open={open} toggle={this.toggle}>
                      <ModalHeader>Header</ModalHeader>
                      <ModalBody className="ModalBody">
                        👋 Hello there!
                      </ModalBody>
                    </Modal>
                  </div>
                </CardBody>
              </Card>

              <Card className="Cards1">
                <CardBody>
                  <div>
                    <Button
                      className="ModalButton"
                      outline
                      pill
                      theme="info"
                      onClick={this.toggle}
                    >
                      Buy Eth
                    </Button>
                    <Modal open={open} toggle={this.toggle}>
                      <ModalHeader>Header</ModalHeader>
                      <ModalBody className="ModalBody">
                        👋 Hello there!
                      </ModalBody>
                    </Modal>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="Div">
              <h2>Ready to Invest Some Money??</h2>
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
